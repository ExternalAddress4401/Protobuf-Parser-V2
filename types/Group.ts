import Key from "../Key";
import BaseType from "./BaseType";

export default class Group extends BaseType {
  constructor(buffer: Buffer, key: Key) {
    super(buffer, key);
  }
  process(proto?: any) {
    return this.buffer.process(proto);
  }
}
