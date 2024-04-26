import Long from "long";
import { FieldElement } from "./felt";
import type { v1alpha2 } from "./proto";

export const StarkNetCursor = {
  /**
   * Creates a cursor pointing at the canonical block at the given height.
   */
  createWithBlockNumber: (number: string | number | Long) => {
    return {
      orderKey: Long.fromValue(number),
      uniqueKey: new Uint8Array(),
    };
  },

  /**
   * Creates a cursor pointing at the block with the given height and hash.
   */
  createWithBlockNumberAndHash: (
    number: string | number | Long,
    hash: v1alpha2.IFieldElement,
  ) => {
    const uniqueKey = Buffer.from(
      FieldElement.toHex(hash).replace("0x", ""),
      "hex",
    );
    return {
      orderKey: Long.fromValue(number),
      uniqueKey,
    };
  },
};
