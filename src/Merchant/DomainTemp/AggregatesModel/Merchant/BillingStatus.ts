import { Enumeration } from "@esearch/shared";

export class BillingStatus extends Enumeration {
  public static readonly Active = new BillingStatus(1, "Active");
  public static readonly Inactive = new BillingStatus(2, "Inactive");
  public static readonly Error = new BillingStatus(-1, "Error");

  private constructor(value: number, name: string) {
    super(value, name);
  }

  public static fromName(name: string): BillingStatus {
    switch (name) {
      case "Active":
        return BillingStatus.Active;
      case "Inactive":
        return BillingStatus.Inactive;
      case "Error":
        return BillingStatus.Error;
      default:
        throw new Error(`Invalid billing status: ${name}`);
    }
  }
}
