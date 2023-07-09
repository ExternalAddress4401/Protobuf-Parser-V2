export default class Key {
  wire: number;
  field: number;

  constructor(value: number) {
    this.wire = parseInt(value.toString(2).slice(-3), 2);
    this.field = parseInt(value.toString(2).slice(0, -3), 2);
    this.validate();
  }

  validate() {
    const wires = [0, 1, 2, 5];
    if (!wires.includes(this.wire)) {
      throw new Error(`Found wire ${this.wire} which is invalid.`);
    }
  }
}
