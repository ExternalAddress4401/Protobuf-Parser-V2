import fs from "fs";
import ProtobufReader from "./ProtobufReader";

const file = fs.readFileSync("./protos/SongConfig.bytes");

const reader = new ProtobufReader(file);

const raw = reader.unknownProcess();
console.log(raw);
