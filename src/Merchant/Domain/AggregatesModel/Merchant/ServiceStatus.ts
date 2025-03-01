import { Enumeration } from "@esearch/shared";

export class ServiceStatus extends Enumeration {
  public static readonly Active = new ServiceStatus(1, "Active");
  public static readonly Inactive = new ServiceStatus(2, "Inactive");
  public static readonly Pending = new ServiceStatus(3, "Pending");
  public static readonly Error = new ServiceStatus(-1, "Error");

  private constructor(value: number, name: string) {
    super(value, name);
  }

  public static fromName(name: string): ServiceStatus {
    switch (name) {
      case "Active":
        return ServiceStatus.Active;
      case "Inactive":
        return ServiceStatus.Inactive;
      case "Pending":
        return ServiceStatus.Pending;
      case "Error":
        return ServiceStatus.Error;
      default:
        throw new Error(`Invalid service status: ${name}`);
    }
  }
}
