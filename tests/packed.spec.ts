import fs from "fs";
import ProtobufReader from "../ProtobufReader";
import { describe } from "mocha";
import { assert } from "chai";
import ProtobufWriter from "../ProtobufWriter";

const proto = JSON.parse(
  fs.readFileSync("./tests/protobufs/packed/proto.json").toString()
);

describe("packed", () => {
  it("should read a simple packed message", () => {
    const protobuf = fs.readFileSync("./tests/protobufs/packed/packed");
    const reader = new ProtobufReader(protobuf);
    const data = reader.process(proto);

    assert.deepEqual(data, { packed: [{ v1: 1, v2: 2 }] });
  });
  it("should read a multi group packed message", () => {
    const protobuf = fs.readFileSync("./tests/protobufs/packed/multi-group");
    const reader = new ProtobufReader(protobuf);
    const data = reader.process(proto);

    assert.deepEqual(data, {
      packed: [
        { v1: 1, v2: 2 },
        { v1: 3, v2: 4 },
      ],
    });
  });
  it("should write a simple packed message", () => {
    const expected = fs.readFileSync("./tests/protobufs/packed/packed");
    const data = { packed: [{ v1: 1, v2: 2 }] };

    assert.deepEqual(expected, new ProtobufWriter(data).build(proto));
  });
  it("should write a multi group packed message", () => {
    const expected = fs.readFileSync("./tests/protobufs/packed/multi-group");
    const data = {
      packed: [
        { v1: 1, v2: 2 },
        { v1: 3, v2: 4 },
      ],
    };

    assert.deepEqual(expected, new ProtobufWriter(data).build(proto));
  });
  /*it("should write a simple group", () => {
    const expected = fs.readFileSync("./tests/protobufs/group/group");
    const data = { group: { test: 1 } };

    assert.deepEqual(expected, new ProtobufWriter(data).build(proto));
  });
  it("should write a mixed group", () => {
    const expected = fs.readFileSync("./tests/protobufs/group/mixed-group");
    const data = { group: { test: 1, string: "hello" } };

    assert.deepEqual(expected, new ProtobufWriter(data).build(proto));
  });*/
});
