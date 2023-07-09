import Key from "../Key";
import ProtobufReader from "../ProtobufReader";

export default class BaseType {
  buffer: ProtobufReader;
  key: Key;

  constructor(buffer: Buffer, key: Key) {
    this.buffer = new ProtobufReader(buffer);
    this.key = key;
  }
}
