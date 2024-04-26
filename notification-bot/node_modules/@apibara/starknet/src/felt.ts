import Long from "long";
import { v1alpha2 } from "./proto";

const MAX_FELT = 2n ** 251n + 17n * 2n ** 192n;

export const FieldElement = {
  encode: v1alpha2.FieldElement.encode,
  decode: v1alpha2.FieldElement.decode,
  fromObject: v1alpha2.FieldElement.fromObject,
  toObject: v1alpha2.FieldElement.toObject,

  /**
   * Converts from the wire representation to a bigint.
   */
  toBigInt(message: v1alpha2.IFieldElement): bigint {
    const hiHi = hexEncodedU64(message.hiHi);
    const hiLo = hexEncodedU64(message.hiLo);
    const loHi = hexEncodedU64(message.loHi);
    const loLo = hexEncodedU64(message.loLo);
    return BigInt(`0x${loLo}${loHi}${hiLo}${hiHi}`);
  },

  /**
   * Returns the wire representation of the given bigint.
   */
  fromBigInt(number: string | number | bigint): v1alpha2.IFieldElement {
    if (number < 0 || number > MAX_FELT) {
      throw new Error("FieldElement outside of range");
    }

    const bn = BigInt(number);
    // bit-shifting of a big int doesn't make much sense.
    // convert to hex and from there breakup in pieces
    const hex = bn.toString(16).padStart(64, "0");
    const s = hex.length;
    const hiHi = Long.fromString(hex.slice(s - 16, s), true, 16);
    const hiLo = Long.fromString(hex.slice(s - 32, s - 16), true, 16);
    const loHi = Long.fromString(hex.slice(s - 48, s - 32), true, 16);
    const loLo = Long.fromString(hex.slice(s - 64, s - 48), true, 16);

    return {
      hiHi,
      hiLo,
      loHi,
      loLo,
    };
  },

  /**
   * Returns the hex value of the field element.
   */
  toHex(message: v1alpha2.IFieldElement): string {
    const num = this.toBigInt(message);
    return `0x${num.toString(16).padStart(64, "0")}`;
  },
};

function hexEncodedU64(n: Long | number | null | undefined): string {
  const s = n?.toString(16) ?? "";
  return s.padStart(16, "0");
}
