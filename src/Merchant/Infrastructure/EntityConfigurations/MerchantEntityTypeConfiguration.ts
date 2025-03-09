// src/Merchant/Infrastructure/Persistence/MerchantTypeORM.ts
import { Entity, PrimaryColumn, Column } from "typeorm";
import { Guid } from "@esearch/shared";
import {
  Merchant,
  IMerchantEntityConfig,
  BillingStatus,
  ServiceType,
  ServiceStatus,
} from "DomainTemp";

@Entity("merchants")
export class MerchantEntityTypeConfiguration {
  @PrimaryColumn({ type: "uuid" })
  guid: string;

  @Column()
  externalId: string;

  @Column()
  domain: string;

  @Column({ type: "varchar", length: 20 })
  platform: string;

  @Column()
  name: string;

  @Column({ type: "varchar", length: 20 })
  billingStatus: string;

  @Column({ type: "varchar", length: 20 })
  indexServiceStatusName: string;

  @Column({ type: "varchar", length: 20 })
  billingServiceStatusName: string;

  @Column({ type: "varchar", length: 20 })
  searchServiceStatusName: string;

  @Column({ type: "varchar", length: 20 })
  platformServiceStatusName: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;

  // Convert to domain entity
  toDomain(): Merchant {
    const config: IMerchantEntityConfig = {
      guid: Guid.parse(this.guid),
      externalId: this.externalId,
      domain: this.domain,
      platform: this.platform,
      name: this.name,
    };

    const merchant = new Merchant(config);

    merchant.setBillingStatus(BillingStatus.fromName(this.billingStatus));

    merchant.setServiceStatus(
      ServiceType.Index,
      ServiceStatus.fromName(this.indexServiceStatusName),
    );
    merchant.setServiceStatus(
      ServiceType.Billing,
      ServiceStatus.fromName(this.billingServiceStatusName),
    );
    merchant.setServiceStatus(
      ServiceType.Search,
      ServiceStatus.fromName(this.searchServiceStatusName),
    );
    merchant.setServiceStatus(
      ServiceType.Platform,
      ServiceStatus.fromName(this.platformServiceStatusName),
    );

    return merchant;
  }

  // Update from domain entity
  updateFromDomain(merchant: Merchant): void {
    this.guid = merchant.guid.toString();
    this.externalId = merchant.externalId;
    this.domain = merchant.domain;
    this.platform = merchant.platform.name;
    this.name = merchant.name;
    this.billingStatus = merchant.billingStatus.name;
    this.indexServiceStatusName =
      merchant.servicesStatus.indexServiceStatus.name;
    this.billingServiceStatusName =
      merchant.servicesStatus.billingServiceStatus.name;
    this.searchServiceStatusName =
      merchant.servicesStatus.searchServiceStatus.name;
    this.platformServiceStatusName =
      merchant.servicesStatus.platformServiceStatus.name;
    this.updatedAt = new Date();
  }

  // Static create method
  static fromDomain(merchant: Merchant): MerchantEntityTypeConfiguration {
    const orm = new MerchantEntityTypeConfiguration();
    orm.guid = merchant.guid.toString();
    orm.externalId = merchant.externalId;
    orm.domain = merchant.domain;
    orm.platform = merchant.platform.name;
    orm.name = merchant.name;
    orm.billingStatus = merchant.billingStatus.name;
    orm.indexServiceStatusName =
      merchant.servicesStatus.indexServiceStatus.name;
    orm.billingServiceStatusName =
      merchant.servicesStatus.billingServiceStatus.name;
    orm.searchServiceStatusName =
      merchant.servicesStatus.searchServiceStatus.name;
    orm.platformServiceStatusName =
      merchant.servicesStatus.platformServiceStatus.name;
    orm.createdAt = merchant.createdAt;
    orm.updatedAt = merchant.updatedAt;
    return orm;
  }
}
