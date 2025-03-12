import { Enumeration } from "../Domain/Enumeration";

export class PlatformEnum extends Enumeration {
  public static readonly Shopify = new PlatformEnum(1, "shopify");

  private constructor(value: number, name: string) {
    super(value, name);
  }

  public static fromName(name: string): PlatformEnum {
    switch (name) {
      case "shopify":
        return PlatformEnum.Shopify;
      default:
        throw new Error(`Invalid platform: ${name}`);
    }
  }
}
