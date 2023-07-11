import Key from "../Key";
import BaseType from "./BaseType";

export default class Unknown extends BaseType {
  str: string;
  typeGuess:
    | "varint"
    | "boolean"
    | "string"
    | "string-repeat"
    | "float"
    | "group"
    | "enum"
    | "packed"
    | "?";
  name: string;

  constructor(buffer: Buffer, key: Key) {
    super(buffer, key);
    this.str = buffer.subarray(0, 20).toString();
    this.typeGuess = this.guessType();
    this.name = key.field.toString();
  }
  isString(str: string) {
    return /^[a-zA-Z0-9 !\?#,.\<\>\+\\\/="';&\n\-:\[\]•_@\(\)]+$/.test(str);
  }
  isRepeatingString() {
    while (this.buffer.hasNext()) {
      const str = this.buffer.readGroup().toString();
      if (!this.isString(str)) {
        return false;
      }
    }
    return true;
  }
  guessType() {
    switch (this.key.wire) {
      case 0:
        return "varint";
      case 2:
        //is it a string?
        if (this.isString(this.buffer.bytes.toString())) {
          return "string";
        }
        //is it a repeating string?
        try {
          if (this.isRepeatingString()) {
            return "string-repeat";
          }
        } catch (e) {}

        //is it repeating varints?

        //reset the mangled index
        this.buffer.index = 0;
        try {
          while (this.buffer.hasNext()) {
            this.buffer.readGroup();
          }
          return "packed";
        } catch (e) {
          return "group";
        }
      case 5:
        return "float";
    }

    return "?";
  }
}
