import { clearBit } from "./BitTools";
import Key from "./Key";
import { padBinary } from "./Utilities";
import Group from "./types/Group";
import PackedMessage from "./types/PackedMessage";
import Unknown from "./types/Unknown";
import fs from "fs";

export default class ProtobufReader {
  bytes: Buffer;
  index: number = 0;

  constructor(file: Buffer) {
    this.bytes = file;
  }
  raw() {
    const parsed: Record<number, Unknown | Unknown[]> = {};

    while (this.hasNext()) {
      const key = this.readKey();
      switch (key.wire) {
        case 0:
          parsed[key.field] = new Unknown(this.readVarintBuffer(), key);
          break;
        case 1:
          this.index += 8; //TODO - fix this
          break;
        case 2:
          const length = this.readVarint();
          if (parsed[key.field] && !Array.isArray(parsed[key.field])) {
            parsed[key.field] = [parsed[key.field]] as Unknown[];
          }
          if (Array.isArray(parsed[key.field])) {
            (parsed[key.field] as Unknown[]).push(
              new Unknown(this.slice(length), key)
            );
          } else {
            parsed[key.field] = new Unknown(this.slice(length), key);
          }

          break;
        case 5:
          parsed[key.field] = new Unknown(this.readFloatBuffer(), key);
          break;
      }
    }

    return parsed;
  }
  process(proto: any = {}) {
    const parsed: Record<number | string, any> = {};
    const data = this.raw();

    for (const key in data) {
      if (proto && proto[key]) {
        if (Array.isArray(data[key])) {
          const records = data[key] as Unknown[];
          for (const record of records) {
            record.typeGuess = proto[key].type;
            record.name = proto[key].name;
          }
        } else if (proto[key].chunk) {
          const record = data[key] as Unknown;
          record.typeGuess = "group";
          record.name = proto[key].name;
        } else {
          const record = data[key] as Unknown;
          record.typeGuess = proto[key].type;
          record.name = proto[key].name;
        }
      }
    }

    for (const key in data) {
      if (Array.isArray(data[key])) {
        const records = [];
        const recordData = data[key] as Unknown[];
        for (const record of recordData) {
          records.push(this.parseRecord(record, proto[key]));
        }
        parsed[recordData[0].name] = records;
      } else if (proto[key]?.type === "enum") {
        const record = data[key] as Unknown;
        //is there an enum defined?
        const slice = proto.enums[parsed.type];
        if (!slice) {
          console.error(`Missing slice for enum ${parsed.type}`);
          parsed[record.name] = record;
        } else {
          try {
            parsed[record.name] = this.parseRecord(
              record,
              JSON.parse(
                fs
                  .readFileSync(
                    `./protos/slices/${proto.enums[parsed.type]}.json`
                  )
                  .toString()
              )
            );
          } catch (e) {
            console.log(e);
          }
        }
      } else if (proto[key]?.chunk) {
        const record = data[key] as Unknown;
        try {
          parsed[record.name] = this.parseRecord(
            record,
            JSON.parse(
              fs
                .readFileSync(`./protos/chunks/${proto[key].chunk}.json`)
                .toString()
            )
          );
        } catch (e) {
          console.log(e);
        }
      } else {
        const record = data[key] as Unknown;
        parsed[record.name] = this.parseRecord(record, proto[key]);
      }
    }

    return parsed;
  }
  parseRecord(data: Unknown, proto: any = {}) {
    try {
      switch (data.typeGuess) {
        case "boolean":
          return data.buffer.readVarint() === 1;
        case "varint":
          return data.buffer.readVarint();
        case "string":
          return data.buffer.bytes.toString();
        case "packed":
          const packed = new PackedMessage(data.buffer.bytes, data.key);
          return packed.process(proto.fields);
        case "group":
          const group = new Group(data.buffer.bytes, data.key);
          return group.process(proto.fields);
        case "enum":
          const e = new Group(data.buffer.bytes, data.key);
          return e.process(proto);
        case "float":
          return data.buffer.readFloat();
      }
    } catch (e) {
      return data;
    }
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
  readFloatBuffer() {
    return this.slice(4);
  }
  readFloat() {
    const float = this.bytes.readFloatLE(this.index);
    this.index += 4;
    return float;
  }
  readGroup() {
    return this.slice(this.readVarint());
  }
  readKey() {
    return new Key(this.readVarint());
  }
  slice(length: number) {
    if (this.index + length > this.bytes.length) {
      throw new Error("Length out of bounds.");
    }
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
