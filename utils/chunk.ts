import { pad } from "./pad";

export function chunk(str: string | number, size: number) {
  if (typeof str === "number") {
    str = str.toString(2);
  }
  const chunks = [];
  while (str.length > size) {
    chunks.push(str.slice(-size));
    str = str.slice(0, -size);
  }
  chunks.push(pad(str, 7, "0"));
  return chunks;
}
