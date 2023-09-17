import fs from "fs";
import { promises as fsp } from "fs";

export async function readProto(path: string) {
  return JSON.parse((await fsp.readFile(path)).toString());
}

export function readProtoSync(path: string) {
  return JSON.parse(fs.readFileSync(path).toString());
}
