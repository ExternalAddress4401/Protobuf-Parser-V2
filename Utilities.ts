export function padBinary(string: string, length: number) {
  let str = string;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}
