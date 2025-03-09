import { Enumeration } from "@esearch/shared";

export class ServiceType extends Enumeration {
  public static readonly Index = new ServiceType(1, "Index");
  public static readonly Billing = new ServiceType(2, "Billing");
  public static readonly Search = new ServiceType(3, "Search");
  public static readonly Platform = new ServiceType(4, "Platform");

  private constructor(value: number, name: string) {
    super(value, name);
  }

  public static fromName(name: string): ServiceType {
    switch (name) {
      case "Index":
        return ServiceType.Index;
      case "Billing":
        return ServiceType.Billing;
      case "Search":
        return ServiceType.Search;
      case "Platform":
        return ServiceType.Platform;
      default:
        throw new Error(`Invalid service type: ${name}`);
    }
  }
}
