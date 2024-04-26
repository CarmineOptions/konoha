import {
  CallCredentials,
  ChannelCredentials,
  ClientDuplexStream,
  ClientOptions,
  Metadata,
  StatusObject,
} from "@grpc/grpc-js";
import { CallMetadataGenerator } from "@grpc/grpc-js/build/src/call-credentials";
import { v1alpha2 } from "./proto";
import { StreamDataRequest } from "./request";

export { ChannelCredentials, StatusObject } from "@grpc/grpc-js";

const StreamService = v1alpha2.protoDescriptor.apibara.node.v1alpha2.Stream;

// Server produces an heartbeat every 30 seconds, so we use 45 seconds as a timeout.
const MESSAGE_TIMEOUT_MS = 45_000;

// Increase the default message length to 128 MiB.
const DEFAULT_MESSAGE_LENGTH = 128 * 1_048_576; // 128 MiB

export type DataStream = ClientDuplexStream<
  v1alpha2.IStreamDataRequest,
  v1alpha2.IStreamDataResponse
>;

export type ConfigureArgs = {
  /**
   * Stream filter, encoded.
   */
  filter: Uint8Array;

  /**
   * How much data in a single message.
   */
  batchSize?: number;

  /**
   * Starting cursor. This cursor is stream-specific.
   */
  cursor?: v1alpha2.ICursor | null;

  /**
   * Data finality, e.g. finalized or accepted.
   */
  finality?: v1alpha2.DataFinality | null;
};

/**
 * Reconnect callback return value.
 */
export type OnReconnectResult = {
  /**
   * If `true`, reconnects to the stream.
   */
  reconnect: boolean;

  /**
   * Stream configuration used when reconnecting.
   *
   * By default, the client uses the last configuration passed to
   * `configure` and updates the `cursor` with the most recent one.
   */
  args?: ConfigureArgs;
};

/**
 * Reconnect callback.
 */
export type OnReconnect = (
  err: StatusObject,
  retryCount: number,
) => Promise<OnReconnectResult> | OnReconnectResult;

export type StreamClientArgs = {
  /**
   * The stream url.
   */
  url: string;

  /**
   * Override Grpc credentials.
   *
   * Use `ChannelCredentials.createInsecure()` to disable SSL.
   */
  credentials?: ChannelCredentials;

  /**
   * Grpc client options.
   */
  clientOptions?: ClientOptions;

  /**
   * Authorization bearer token, used to authenticate with the server.
   */
  token?: string;

  /**
   * Callback to control reconnection after receiving an error from the stream.
   *
   * By default uses `defaultOnReconnect`, which only reconnects on internal grpc errors.
   */
  onReconnect?: OnReconnect;

  /**
   * Maximum time to wait for a message before timing out, in milliseconds.
   *
   * Defaults to 45 seconds.
   */
  timeout?: number;
};

/**
 * A client to configure and stream data.
 */
export class StreamClient {
  private readonly inner: v1alpha2.StreamClient;

  private stream?: DataStream;
  private stream_id: number;
  private onReconnect: OnReconnect;
  private configuration?: ConfigureArgs;
  private timeout: number;

  /**
   * Create a new `StreamClient`.
   *
   * Notice that the stream is not connected until you start iterating over it.
   * The stream should be used as an _async iterator_.
   *
   * @example
   * ```ts
   * import { StreamClient } from '@apibara/protocol'
   *
   * const client = new StreamClient({ url })
   *
   * client.configure({ filter, cursor })
   *
   * for await (const message of client) {
   *   // use message
   * }
   * ```
   */
  constructor({
    url,
    credentials,
    clientOptions,
    token,
    onReconnect,
    timeout,
  }: StreamClientArgs) {
    const baseCredentials = credentials ?? ChannelCredentials.createSsl();

    // only secure credentials can be composed with metadata generators.
    const credentialsWithMetadata = baseCredentials._isSecure()
      ? baseCredentials.compose(
          CallCredentials.createFromMetadataGenerator(
            createMetadataGenerator(token),
          ),
        )
      : baseCredentials;

    this.inner = new StreamService(url, credentialsWithMetadata, {
      "grpc.keepalive_timeout_ms": 3_600_000,
      "grpc.max_receive_message_length": DEFAULT_MESSAGE_LENGTH,
      ...clientOptions,
    });
    this.stream_id = 0;
    this.onReconnect = onReconnect ?? defaultOnReconnect;
    this.timeout = timeout ?? MESSAGE_TIMEOUT_MS;
  }

  /**
   * Async iterator over messages in the stream.
   */
  async *[Symbol.asyncIterator](): AsyncIterator<v1alpha2.IStreamDataResponse> {
    if (!this.configuration) {
      throw new Error("StreamClient must be configured");
    }

    // connect if not connected.
    if (!this.stream) {
      this.connect();
      this._configure(this.configuration);
    }

    while (true) {
      let retryCount = 1;
      let cursor = null;
      let clock;
      try {
        // this check is to make ts happy
        if (!this.stream) {
          throw new Error("Stream disconnected unexpectedly");
        }

        const streamIter = this.stream[Symbol.asyncIterator]();
        while (true) {
          const timeout = new Promise((_, reject) => {
            clock = setTimeout(() => {
              reject(new Error("Stream timed out"));
            }, this.timeout);
          });

          const message = <IteratorResult<v1alpha2.IStreamDataResponse>>(
            await Promise.race([streamIter.next(), timeout])
          );
          const messageTyped = message.value as v1alpha2.IStreamDataResponse;

          clearTimeout(clock);

          if (messageTyped.message === "heartbeat") {
            yield messageTyped;
          } else if (
            messageTyped.streamId?.toString() === this.stream_id.toString()
          ) {
            // only return messages if they are with the most recently configured stream
            // reset retry count on new message
            retryCount = 1;

            // keep cursor updated for use when reconnecting
            if (messageTyped.data) {
              cursor = messageTyped.data.cursor;
            } else if (messageTyped.invalidate) {
              cursor = messageTyped.invalidate.cursor;
            }

            yield messageTyped;
          }
        }
        // rome-ignore lint: any is needed for catch
      } catch (err: any) {
        clearTimeout(clock);

        const isGrpcError =
          Object.hasOwn(err, "code") &&
          Object.hasOwn(err, "details") &&
          Object.hasOwn(err, "metadata");

        // non-grpc error, so just bubble it up
        if (!isGrpcError) {
          throw err;
        }

        const { reconnect, args } = await Promise.resolve(
          this.onReconnect(err, retryCount),
        );
        retryCount += 1;
        if (!reconnect) {
          throw err;
        }

        this.connect();

        if (args) {
          this._configure(args);
        } else {
          // use same configuration specified by user, restarting from the
          // latest ingested batch.
          const configuration = {
            ...this.configuration,
            cursor: cursor ?? this.configuration.cursor,
          };
          this._configure(configuration);
        }
      }
    }
  }

  /**
   * Configure the stream to return the requested data.
   *
   * The stream can be reconfigured while streaming data, the client will
   * take care of returning only data for the new configuration even if there
   * are old messages in-flight.
   */
  configure(args: ConfigureArgs) {
    this.configuration = args;
    this._configure(args);
  }

  private _configure(args: ConfigureArgs) {
    const { filter, batchSize, cursor, finality } = args;
    this.stream_id++;

    // only send configuration if connected
    if (this.stream) {
      const builder = StreamDataRequest.create()
        .withStreamId(this.stream_id)
        .withFilter(filter);

      if (batchSize) {
        builder.withBatchSize(batchSize);
      }
      if (cursor) {
        builder.withStartingCursor(cursor);
      }
      if (finality) {
        builder.withFinality(finality);
      }

      const request = builder.encode();
      this.stream?.write(request);
    }
  }

  private connect() {
    this.stream = this.inner.streamData();
    return this;
  }
}

/**
 * A `onReconnect` callback that never reconnects.
 */
export function neverReconnect(
  _err: StatusObject,
  _retryCount: number,
): OnReconnectResult {
  return {
    reconnect: false,
  };
}

/**
 * A `onReconnect` callback that retries to reconnect up to 5 times.
 *
 * If the error is not an internal error, then it will not reconnect.
 * This callback awaits for `1s * retryCount` before returning.
 */
export async function defaultOnReconnect(
  err: StatusObject,
  retryCount: number,
): Promise<OnReconnectResult> {
  if (err.code !== 13) {
    return {
      reconnect: false,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, retryCount * 1000));
  return {
    reconnect: retryCount < 5,
  };
}

/*
 * Returns a generator that adds the given `token` to request metadata.
 */
function createMetadataGenerator(token?: string): CallMetadataGenerator {
  const metadata = new Metadata();
  if (token) {
    metadata.add("authorization", `bearer ${token}`);
  }

  return (_options, cb) => {
    cb(null, metadata);
  };
}
