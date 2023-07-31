import fs from "fs";
import ProtobufReader from "./ProtobufReader";

const file = fs.readFileSync("./cms/NotificationsConfig.bytes");

const reader = new ProtobufReader(file);

const proto = JSON.parse(
  fs.readFileSync("./protos/NotificationsConfig.json").toString()
);

const raw = reader.process(proto);
console.log(raw);
