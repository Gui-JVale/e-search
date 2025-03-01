export abstract class Enumeration {
  constructor(
    private readonly _value: number,
    private readonly _name: string,
  ) {}

  public get value(): number {
    return this._value;
  }

  public get name(): string {
    return this._name;
  }

  public toString(): string {
    return this._name;
  }

  public equals(other: any): boolean {
    if (!(other instanceof Enumeration)) {
      return false;
    }

    return this._value === other._value;
  }
}
