import fs from "fs";
import ProtobufReader from "./ProtobufReader";

const file = fs.readFileSync("./cms/LiveOpsBundleConfig.bytes");

const reader = new ProtobufReader(file);

const proto = JSON.parse(
  fs.readFileSync("./protos/LiveOpsBundleConfig.json").toString()
);

console.log(proto);

const raw = reader.process(proto);
console.log(raw);
