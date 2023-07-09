import fs from "fs";
import ProtobufReader from "./ProtobufReader";

const file = fs.readFileSync("./protos/NewsFeed.bytes");

const reader = new ProtobufReader(file);
