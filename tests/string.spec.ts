import fs from "fs";
import ProtobufReader from "../ProtobufReader";
import { describe } from "mocha";
import { assert } from "chai";
import ProtobufWriter from "../ProtobufWriter";

const protobuf = fs.readFileSync("./tests/protobufs/string/string");
const proto = JSON.parse(
  fs.readFileSync("./tests/protobufs/string/proto.json").toString()
);

describe("string", () => {
  it("should read a string", () => {
    const reader = new ProtobufReader(protobuf);
    const data = reader.process(proto);

    assert.deepEqual(data, { test: "hello" });
  });
  it("should write a string", () => {
    const data = { test: "hello" };
    const expected = fs.readFileSync("./tests/protobufs/string/string");

    assert.deepEqual(expected, new ProtobufWriter(data).build(proto));
  });
});
