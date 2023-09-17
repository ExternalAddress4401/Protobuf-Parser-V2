import ProtobufReader from "../ProtobufReader";
import ProtobufWriter from "../ProtobufWriter";
import zlib from "zlib";

export default class Packet {
  header: Buffer = Buffer.alloc(0);
  body: Buffer = Buffer.alloc(0);

  setHeader(data: any, proto: any) {
    this.header = new ProtobufWriter(data).build(proto);
  }
  setBody(data: any, proto: any) {
    this.body = new ProtobufWriter(data).build(proto);
  }
  build() {
    const sizes = Buffer.alloc(8);
    sizes.writeInt32BE(this.header.length + this.body.length + 4, 0);
    sizes.writeInt32BE(this.header.length, 4);

    return Buffer.concat([sizes, this.header, this.body]);
  }
  read(data: Buffer) {
    //const packetSize = data.readInt32BE(0);
    const headerSize = data.readInt32BE(4);
    this.header = data.subarray(8, 8 + headerSize);
    this.body = data.subarray(8 + headerSize);

    return this;
  }
  toJson(headerProto: any, bodyProto: any): any {
    if (this.body[0] === 0x1f && this.body[1] === 0x8b) {
      this.body = zlib.gunzipSync(this.body);
    }
    return {
      header: new ProtobufReader(this.header).process(headerProto),
      body: new ProtobufReader(this.body).process(bodyProto),
    };
  }
  decompress() {
    if (this.body[0] === 0x1f && this.body[1] === 0x8b) {
      this.body = zlib.gunzipSync(this.body);
    }
  }
}
