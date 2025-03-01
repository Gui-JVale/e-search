import { IAggregateRoot, Entity, Guid, PlatformEnum } from "@esearch/shared";
import { BillingStatus } from "./BillingStatus";
import { ServicesStatus } from "./ServicesStatus";
import { ServiceType } from "./ServiceType";
import { ServiceStatus } from "./ServiceStatus";

export interface IMerchantEntityConfig {
  guid?: Guid;
  externalId: string;
  domain: string;
  platform: PlatformEnum;
  name: string;
}

export class Merchant extends Entity implements IAggregateRoot {
  private _externalId: string;
  private _guid: Guid;
  private _domain: string;
  private _platform: PlatformEnum;
  private _name: string;
  private _servicesStatus: ServicesStatus;
  private _billingStatus: BillingStatus;
  private _createdAt: Date;
  private _updatedAt: Date;

  public get externalId(): string {
    return this._externalId;
  }

  public get guid(): Guid {
    return this._guid;
  }

  public get domain(): string {
    return this._domain;
  }

  public get platform(): PlatformEnum {
    return this._platform;
  }

  public get name(): string {
    return this._name;
  }

  public get servicesStatus(): ServicesStatus {
    return this._servicesStatus;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get billingStatus(): BillingStatus {
    return this._billingStatus;
  }

  constructor(config: IMerchantEntityConfig) {
    super();
    this._guid = config.guid ?? Guid.newGuid();
    this._externalId = config.externalId;
    this._domain = config.domain;
    this._platform = config.platform;
    this._name = config.name;
    this._billingStatus = BillingStatus.Inactive;
    this._servicesStatus = new ServicesStatus();
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  public setName(name: string): void {
    this._name = name;
  }

  public setDomain(domain: string): void {
    this._domain = domain;
  }

  public setServicesStatus(servicesStatus: ServicesStatus): void {
    this._servicesStatus = servicesStatus;
  }

  public setServiceStatus(
    serviceType: ServiceType,
    status: ServiceStatus,
  ): void {
    this._servicesStatus.setServiceStatus(serviceType, status);
  }

  public setBillingStatus(billingStatus: BillingStatus): void {
    this._billingStatus = billingStatus;
  }
}
