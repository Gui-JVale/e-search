import { v4 as uuidv4, validate, parse as uuidParse } from "uuid";

export class Guid {
  private readonly value: string;

  constructor(value?: string) {
    if (value) {
      if (!Guid.isValid(value)) {
        throw new Error("Invalid GUID format");
      }
      this.value = value.toLowerCase();
    } else {
      this.value = uuidv4();
    }
  }

  public static empty(): Guid {
    return new Guid("00000000-0000-0000-0000-000000000000");
  }

  public static newGuid(): Guid {
    return new Guid(uuidv4());
  }

  public static parse(input: string): Guid {
    return new Guid(input);
  }

  public static tryParse(input: string): Guid | null {
    try {
      return Guid.parse(input);
    } catch {
      return null;
    }
  }

  public static isValid(str: string): boolean {
    return validate(str);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: Guid | string | null | undefined): boolean {
    if (!other) return false;
    const otherGuid = other instanceof Guid ? other : new Guid(other);
    return this.value === otherGuid.value;
  }

  public toJSON(): string {
    return this.value;
  }
}
