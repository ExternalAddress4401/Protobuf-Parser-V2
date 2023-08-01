import fs from "fs";
import ProtobufReader from "./ProtobufReader";

const file = fs.readFileSync("./cms/FontFallbackConfig.bytes");

const reader = new ProtobufReader(file);

const proto = JSON.parse(
  fs.readFileSync("./protos/FontFallbackConfig.json").toString()
);

const raw = reader.process(proto);
console.log(raw);
