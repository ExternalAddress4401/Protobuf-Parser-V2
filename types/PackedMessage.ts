import Key from "../Key";
import BaseType from "./BaseType";
import Group from "./Group";

export default class PackedMessage extends BaseType {
  constructor(buffer: Buffer, key: Key) {
    super(buffer, key);
  }
  process(proto?: any) {
    const groups = [];
    this.buffer.index = 0; //TODO - is this needed?
    while (this.buffer.hasNext()) {
      const group = new Group(this.buffer.readGroup(), this.key);
      groups.push(group.process(proto));
    }
    return groups;
  }
}
