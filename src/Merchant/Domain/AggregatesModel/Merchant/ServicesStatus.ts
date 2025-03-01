import { ServiceStatus } from "./ServiceStatus";
import { ServiceType } from "./ServiceType";

interface IServicesStatusConfig {
  indexServiceStatus?: ServiceStatus;
  billingServiceStatus?: ServiceStatus;
  searchServiceStatus?: ServiceStatus;
  platformServiceStatus?: ServiceStatus;
}

export class ServicesStatus {
  public indexServiceStatus: ServiceStatus;
  public billingServiceStatus: ServiceStatus;
  public searchServiceStatus: ServiceStatus;
  public platformServiceStatus: ServiceStatus;

  constructor(config?: IServicesStatusConfig) {
    this.indexServiceStatus =
      config?.indexServiceStatus ?? ServiceStatus.Inactive;
    this.billingServiceStatus =
      config?.billingServiceStatus ?? ServiceStatus.Inactive;
    this.searchServiceStatus =
      config?.searchServiceStatus ?? ServiceStatus.Inactive;
    this.platformServiceStatus =
      config?.platformServiceStatus ?? ServiceStatus.Inactive;
  }

  public setServiceStatus(
    serviceType: ServiceType,
    status: ServiceStatus,
  ): void {
    switch (serviceType) {
      case ServiceType.Index:
        this.indexServiceStatus = status;
        break;
      case ServiceType.Billing:
        this.billingServiceStatus = status;
        break;
      case ServiceType.Search:
        this.searchServiceStatus = status;
        break;
      case ServiceType.Platform:
        this.platformServiceStatus = status;
        break;
      default:
        throw new Error(`Invalid service type: ${serviceType}`);
    }
  }
}
