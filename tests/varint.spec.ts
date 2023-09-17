import fs from "fs";
import ProtobufReader from "../ProtobufReader";
import { describe } from "mocha";
import { assert } from "chai";
import ProtobufWriter from "../ProtobufWriter";
import { pad } from "../utils/pad";
import { chunk } from "../utils/chunk";

const proto = JSON.parse(
  fs.readFileSync("./tests/protobufs/varint/proto.json").toString()
);

describe("varint", () => {
  it("should read a single byte varint", () => {
    const protobuf = fs.readFileSync("./tests/protobufs/varint/single-byte");
    const reader = new ProtobufReader(protobuf);
    const data = reader.process(proto);

    assert.deepEqual(data, { test: 24 });
  });
  it("should read a multi byte varint", () => {
    const protobuf = fs.readFileSync("./tests/protobufs/varint/two-byte");
    const reader = new ProtobufReader(protobuf);
    const data = reader.process(proto);

    assert.deepEqual(data, { test: 150 });
  });
  it("should write a key", () => {
    const wire = 2;
    const field = 100;

    const buffer = new ProtobufWriter({}).writeKey(wire, field);
    assert(buffer[0] === 0xa2 && buffer[1] === 0x6);
  });
  it("should write a single byte varint", () => {
    const expected = fs.readFileSync("./tests/protobufs/varint/single-byte");
    const data = { test: 24 };
    const writer = new ProtobufWriter(data);

    const protobuf = writer.build(proto);
    assert.deepEqual(expected, protobuf);
  });
  it("should write a multi byte varint", () => {
    const expected = fs.readFileSync("./tests/protobufs/varint/two-byte");
    const data = { test: 150 };

    assert.deepEqual(expected, new ProtobufWriter(data).build(proto));
  });
});
