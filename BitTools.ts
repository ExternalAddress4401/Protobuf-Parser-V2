export function getBit(number: number, bitPosition: number) {
  return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}

export function setBit(number: number, bitPosition: number) {
  return number | (1 << bitPosition);
}

export function clearBit(number: number, bitPosition: number) {
  const mask = ~(1 << bitPosition);
  return number & mask;
}
