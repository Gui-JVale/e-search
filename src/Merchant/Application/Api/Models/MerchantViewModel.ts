import { PlatformEnum } from "@esearch/shared";
import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { BillingStatus, Merchant, ServiceStatus } from "DomainTemp";

@ApiSchema({ name: "Merchant" })
export class MerchantViewModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  externalId: string;

  @ApiProperty()
  domain: string;

  @ApiProperty({ enum: [PlatformEnum.Shopify.toString()] })
  platform: string;

  @ApiProperty()
  name: string;

  @ApiProperty({
    enum: [
      BillingStatus.Active.toString(),
      BillingStatus.Inactive.toString(),
      BillingStatus.Error.toString(),
    ],
  })
  billingStatus: string;

  @ApiProperty({
    enum: [
      ServiceStatus.Active.toString(),
      ServiceStatus.Inactive.toString(),
      ServiceStatus.Error.toString(),
    ],
  })
  indexServiceStatus: string;

  @ApiProperty({
    enum: [
      ServiceStatus.Active.toString(),
      ServiceStatus.Inactive.toString(),
      ServiceStatus.Pending.toString(),
      ServiceStatus.Error.toString(),
    ],
  })
  searchServiceStatus: string;

  @ApiProperty({
    enum: [
      ServiceStatus.Active.toString(),
      ServiceStatus.Inactive.toString(),
      ServiceStatus.Pending.toString(),
      ServiceStatus.Error.toString(),
    ],
  })
  billingServiceStatus: string;

  @ApiProperty({
    enum: [
      ServiceStatus.Active.toString(),
      ServiceStatus.Inactive.toString(),
      ServiceStatus.Pending.toString(),
      ServiceStatus.Error.toString(),
    ],
  })
  platformServiceStatus: string;

  @ApiProperty({ type: Date })
  createdAt: string;

  @ApiProperty({ type: Date })
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
