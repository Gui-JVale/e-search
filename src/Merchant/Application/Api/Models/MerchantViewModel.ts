import { Merchant } from "DomainTemp";

export class MerchantViewModel {
  id: string;
  externalId: string;
  domain: string;
  platform: string;
  name: string;
  billingStatus: string;
  indexServiceStatus: string;
  searchServiceStatus: string;
  billingServiceStatus: string;
  platformServiceStatus: string;
  createdAt: string;
  updatedAt: string;

  constructor(merchant: Merchant) {
    this.id = merchant.guid.toString();
    this.externalId = merchant.externalId;
    this.domain = merchant.domain;
    this.platform = merchant.platform.toString();
    this.name = merchant.name;
    this.billingStatus = merchant.billingStatus.toString();
    this.indexServiceStatus =
      merchant.servicesStatus.indexServiceStatus.toString();
    this.searchServiceStatus =
      merchant.servicesStatus.searchServiceStatus.toString();
    this.billingServiceStatus =
      merchant.servicesStatus.billingServiceStatus.toString();
    this.platformServiceStatus =
      merchant.servicesStatus.platformServiceStatus.toString();
    this.createdAt = merchant.createdAt.toISOString();
    this.updatedAt = merchant.updatedAt.toISOString();
  }
}
