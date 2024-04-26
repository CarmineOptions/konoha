import Long from "long";
import { v1alpha2 } from "./proto";

export const StreamDataRequest = {
  /**
   * Start building a `StreamData` request.
   */
  create: () => new StreamDataRequestBuilder(),
};

export class StreamDataRequestBuilder {
  private request: v1alpha2.IStreamDataRequest;

  constructor() {
    this.request = {};
  }

  /**
   * Set the new stream id.
   */
  withStreamId(streamId: number | Long) {
    this.request.streamId = streamId;
    return this;
  }

  /**
   * Set the number of items in each response batch.
   */
  withBatchSize(size: number | Long) {
    this.request.batchSize = size;
    return this;
  }

  /**
   * Set the cursor from where to resume streaming.
   */
  withStartingCursor(cursor: v1alpha2.ICursor) {
    this.request.startingCursor = cursor;
    return this;
  }

  /**
   * Set the request finality for data.
   */
  withFinality(finality: v1alpha2.DataFinality) {
    this.request.finality = finality;
    return this;
  }

  /**
   * Set the stream-specific filter.
   */
  withFilter(filter: Uint8Array) {
    this.request.filter = filter;
    return this;
  }

  /**
   * Build and return the request.
   */
  encode() {
    return this.request;
  }
}
