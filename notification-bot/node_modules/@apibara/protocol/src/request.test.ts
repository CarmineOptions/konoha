import { v1alpha2 } from "./proto";
import { TestFilter } from "./proto/testing";
import { StreamDataRequest } from "./request";

describe("RequestBuilder", () => {
  it("returns the final request", () => {
    const filter = new TestFilter();
    filter.num = 123;
    filter.text = "abcdef";

    const request = StreamDataRequest.create()
      .withBatchSize(10)
      .withFilter(TestFilter.encode(filter).finish())
      .withFinality(v1alpha2.DataFinality.DATA_STATUS_FINALIZED)
      .encode();

    expect(request.batchSize).toEqual(10);
    expect(request.filter).toBeInstanceOf(Buffer);
    expect(request.filter?.length).toEqual(10);

    // make ts happy
    if (!request.filter || typeof request.filter === "string") {
      throw new Error("undefined filter");
    }

    const back = TestFilter.decode(request.filter);
    expect(back.num.toString()).toEqual("123");
    expect(back.text).toEqual("abcdef");
  });
});
