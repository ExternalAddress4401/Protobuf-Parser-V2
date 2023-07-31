import fs from "fs";
import ProtobufReader from "./ProtobufReader";

const file = fs.readFileSync("./cms/LiveOpsEventConfig.bytes");

const reader = new ProtobufReader(file);

const proto = JSON.parse(
  fs.readFileSync("./protos/LiveOpsEventConfig.json").toString()
);

const raw = reader.process(proto);

const thing = raw.LiveOpsEvents.find(
  (el: any) => el.idLabel === "Beat Chaser - Beat Pop"
);
console.log(thing.slice);
