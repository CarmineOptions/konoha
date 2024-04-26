import Long from "long";
import { Cursor } from "./cursor";

describe("Cursor", () => {
  it("can be converted to and from javascript objects", () => {
    const cursorObject = {
      orderKey: "1234",
      uniqueKey:
        "0x05dd5e4f023a81a8daaf86b8bf3967b04276a89c81b840e8e55d658323854ad7",
    };

    const cursor = Cursor.fromObject(cursorObject);
    expect(cursor.orderKey).toEqual(Long.fromNumber(1234));
    expect(cursor.uniqueKey).toHaveLength(32);

    const back = Cursor.toObject(cursor);

    expect(back?.orderKey).toEqual(cursorObject.orderKey);
    expect(back?.uniqueKey).toEqual(cursorObject.uniqueKey);
  });
});
