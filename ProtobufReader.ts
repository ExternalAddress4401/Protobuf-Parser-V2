import { clearBit } from "./BitTools";
import Key from "./Key";
import { padBinary } from "./Utilities";

export default class ProtobufReader {
  bytes: Buffer;
  index: number = 0;

  constructor(file: Buffer) {
    this.bytes = file;
    this.process();
  }
  process() {
    const parsed: Record<number, Buffer> = {};

    while (this.hasNext()) {
      const key = this.readKey();
      switch (key.wire) {
        case 0:
          parsed[key.field] = this.readVarintBuffer();
          break;
        case 1:
          break;
        case 2:
          const length = this.readVarint();
          parsed[key.field] = this.slice(length);
          break;
        case 5:
          break;
      }
    }
    console.log(parsed);
  }
  readVarintBuffer() {
    let length = 0;

    while (true) {
      const byte = this.readByte();
      length++;
      if (byte >> 7 !== 1) {
        break;
      }
    }

    this.index -= length;
    return this.slice(length);
  }
  readVarint() {
    const bytes = [];

    while (true) {
      const byte = this.readByte();
      bytes.push(padBinary(clearBit(byte, 7).toString(2), 7));
      if (byte >> 7 !== 1) {
        break;
      }
    }

    return parseInt(bytes.reverse().join(""), 2);
  }
  readKey() {
    return new Key(this.readVarint());
  }
  slice(length: number) {
    const buffer = this.bytes.subarray(this.index, this.index + length);
    this.index += length;
    return buffer;
  }
  readByte() {
    return this.bytes.readUInt8(this.index++);
  }
  hasNext() {
    return this.index < this.bytes.length;
  }
}
