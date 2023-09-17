import { chunk } from "./utils/chunk";
import { pad } from "./utils/pad";

export default class ProtobufWriter {
  data: any;
  buffer: Buffer = Buffer.alloc(0);

  constructor(data: any) {
    this.data = data;
  }
  build(proto: any, previousField?: string) {
    if (Array.isArray(this.data)) {
      let groups = Buffer.alloc(0);
      for (const entry of this.data) {
        const data = new ProtobufWriter(entry).build(proto);
        groups = Buffer.concat([
          groups,
          this.writeKey(2, parseInt(previousField!)),
          this.writeVarint(data.length),
          data,
        ]);
      }
      this.buffer = Buffer.concat([this.buffer, groups]);
    } else {
      for (const key in proto) {
        const field = proto[key];

        this.buffer = Buffer.concat([
          this.buffer,
          this.handleType(key, field, proto) as Buffer,
        ]);
      }
    }
    return this.buffer;
  }
  writeKey(wire: number, field: number) {
    let v: any = field.toString(2);
    v += pad(wire.toString(2), 3, "0");
    v = chunk(v, 7);
    for (var i = 0; i < v.length - 1; i++) {
      v[i] = "1" + v[i];
    }
    v[v.length - 1] = "0" + v[v.length - 1];

    const joined = v.map((el: any) =>
      pad(parseInt(el, 2).toString(16), 2, "0")
    );

    return Buffer.from(joined.join(""), "hex");
  }
  writeVarint(varint: number) {
    let binary: any = varint.toString(2);
    binary = chunk(binary, 7);
    for (var i = 0; i < binary.length - 1; i++) {
      binary[i] = "1" + binary[i];
    }

    return Buffer.from(binary.map((el: any) => parseInt(el, 2)));
  }
  handleType(key: string, field: any, proto: any) {
    if (!this.data.hasOwnProperty(field.name)) {
      return Buffer.alloc(0);
    }
    switch (field.type) {
      case "varint": {
        //write key
        const buffer = this.writeKey(0, parseInt(key));

        //write value
        let c = chunk(this.data[field.name], 7);
        for (var i = 0; i < c.length - 1; i++) {
          c[i] = "1" + c[i];
        }
        c[c.length - 1] = "0" + c[c.length - 1];
        c = c.map((el) => pad(parseInt(el, 2).toString(16), 2, "0"));

        //return all
        return Buffer.concat([buffer, Buffer.from(c.join(""), "hex")]);
      }

      case "string": {
        const str = this.data[field.name];
        //write key
        let buffer = this.writeKey(2, parseInt(key));

        return Buffer.concat([
          buffer,
          this.writeVarint(str.length),
          Buffer.from(str),
        ]);
      }
      case "group":
        const data: any = new ProtobufWriter(this.data[field.name]).build(
          proto[key].fields,
          key
        );

        if (Array.isArray(this.data[field.name])) {
          return data;
        } else {
          return Buffer.concat([
            this.writeKey(2, parseInt(key)),
            this.writeVarint(data.length),
            data,
          ]);
        }
      case "packed":
        let buffer = Buffer.alloc(0);
        for (const group of this.data[field.name]) {
          const data: any = new ProtobufWriter(group).build(proto[key].fields);

          buffer = Buffer.concat([buffer, this.writeVarint(data.length), data]);
        }

        return Buffer.concat([
          this.writeKey(2, parseInt(key)),
          this.writeVarint(buffer.length),
          buffer,
        ]);

      case "boolean":
        return;
      case "float":
        return;
      case "enum":
        return;
    }
  }
}
