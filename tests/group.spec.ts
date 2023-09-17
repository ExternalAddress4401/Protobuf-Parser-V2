import fs from "fs";
import ProtobufReader from "../ProtobufReader";
import { describe } from "mocha";
import { assert } from "chai";
import ProtobufWriter from "../ProtobufWriter";

const proto = JSON.parse(
  fs.readFileSync("./tests/protobufs/group/proto.json").toString()
);

describe("group", () => {
  it("should read a simple group", () => {
    const protobuf = fs.readFileSync("./tests/protobufs/group/group");
    const reader = new ProtobufReader(protobuf);
    const data = reader.process(proto);

    assert.deepEqual(data, { group: { test: 1 } });
  });
  it("should read a mixed group", () => {
    const protobuf = fs.readFileSync("./tests/protobufs/group/mixed-group");
    const reader = new ProtobufReader(protobuf);
    const data = reader.process(proto);

    assert.deepEqual(data, { group: { test: 1, string: "hello" } });
  });
  it("should write a simple group", () => {
    const expected = fs.readFileSync("./tests/protobufs/group/group");
    const data = { group: { test: 1 } };

    assert.deepEqual(expected, new ProtobufWriter(data).build(proto));
  });
  it("should write a mixed group", () => {
    const expected = fs.readFileSync("./tests/protobufs/group/mixed-group");
    const data = { group: { test: 1, string: "hello" } };

    assert.deepEqual(expected, new ProtobufWriter(data).build(proto));
  });
  it("should write repeating groups", () => {
    const expected = fs.readFileSync("./tests/protobufs/group/mixed-group");
    const data = {
      group: [
        { test: 1, string: "hello" },
        { test: 2, string: "nope" },
      ],
    };

    console.log(data);
  });
});
