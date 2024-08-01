import "server-only";

export class BitField {
  value: number;

  constructor(value = 0) {
    this.value = value;
  }

  add(bit: number) {
    this.value |= bit;
  }

  remove(bit: number) {
    this.value &= ~bit;
  }

  has(bit: number) {
    return (this.value & bit) === bit;
  }

  clear() {
    this.value = 0;
  }

  getValue() {
    return this.value;
  }

  setValue(value: number) {
    this.value = value;
  }
}
