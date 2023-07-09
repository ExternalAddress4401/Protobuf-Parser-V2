import fs from "fs";
import ProtobufReader from "./ProtobufReader";

const file = fs.readFileSync("./cms/NewsFeed.bytes");

const reader = new ProtobufReader(file);

const proto = JSON.parse(fs.readFileSync("./protos/NewsFeed.json").toString());

const raw = reader.process();
console.log(raw);
