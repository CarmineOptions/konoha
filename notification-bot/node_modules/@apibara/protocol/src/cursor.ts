import Long from "long";
import { ICursor } from "./proto/v1alpha2";

export const Cursor = {
  /**
   * Creates a new cursor with only the `orderKey` set.
   *
   * Notice that this cursor does not uniquely identify a message in the stream
   * and may result in missing information.
   */
  createWithOrderKey: (order: string | number | Long): ICursor => {
    return {
      orderKey: Long.fromValue(order),
      uniqueKey: new Uint8Array(),
    };
  },

  /**
   * Creates a new cursor with both order and unique keys.
   *
   * This cursor uniquely identifies a message in the stream, even if it has
   * been invalidated.
   */
  create: (order: string | number | Long, unique: Uint8Array): ICursor => {
    return {
      orderKey: Long.fromValue(order),
      uniqueKey: unique,
    };
  },

  /**
   * Creates a new cursor from a plain Javascript object.
   */
  fromObject({ orderKey, uniqueKey }: ReturnType<typeof _toObject>): ICursor {
    return {
      orderKey: Long.fromString(orderKey),
      uniqueKey: Buffer.from(uniqueKey.slice(2), "hex"),
    };
  },

  /**
   * Returns the cursor string representation.
   */
  toString: (cursor?: ICursor | null): string | undefined => {
    if (!cursor) return;
    const { orderKey, uniqueKey } = _toObject(cursor);
    return `${orderKey}/${uniqueKey}`;
  },

  /**
   * Returns the cursor as plain Javascript object.
   */
  toObject: (
    cursor?: ICursor | null,
  ): ReturnType<typeof _toObject> | undefined => {
    if (!cursor) return;
    return _toObject(cursor);
  },
};

function _toObject(cursor: ICursor): { orderKey: string; uniqueKey: string } {
  const hash = Buffer.from(cursor.uniqueKey).toString("hex");
  return {
    orderKey: cursor.orderKey.toString(),
    uniqueKey: `0x${hash}`,
  };
}
