import fs from "fs";
import ProtobufReader from "./ProtobufReader";

const file = fs.readFileSync("./cms/ScalingConfig.bytes");

const reader = new ProtobufReader(file);

const proto = JSON.parse(
  fs.readFileSync("./protos/ScalingConfig.json").toString()
);

const raw = reader.process(proto);
console.log(raw);
