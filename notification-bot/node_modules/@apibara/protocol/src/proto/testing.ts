import { Field, Message } from "protobufjs/light";

export class TestFilter extends Message<TestFilter> {
  @Field.d(1, "uint64")
  // @ts-ignore
  public num: number;

  @Field.d(2, "string")
  // @ts-ignore
  public text: string;
}
