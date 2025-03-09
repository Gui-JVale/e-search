import { Injectable } from "@nestjs/common";
import { Guid, IUnitOfWork } from "@esearch/shared";
import { IMerchantRepository } from "../../DomainTemp/AggregatesModel/Merchant/IMerchantRepository";
import { Merchant } from "../../DomainTemp/AggregatesModel/Merchant/Merchant";
import { MerchantContext } from "../Database/MerchantContext";

@Injectable()
export class MerchantRepository implements IMerchantRepository {
  constructor(private _context: MerchantContext) {}

  get unitOfWork(): IUnitOfWork {
    return this._context;
  }

  create(merchant: Merchant): Merchant {
    this._context.add(merchant);
    return merchant;
  }

  update(merchant: Merchant): void {
    this._context.update(merchant);
  }

  delete(merchant: Merchant): void {
    this._context.delete(merchant);
  }

  getByGlobalIdAsync(guid: Guid): Promise<Merchant | undefined> {
    return this._context.merchants
      .findOne({ where: { guid: guid.toString() } })
      .then((merchant) => merchant?.toDomain());
  }

  getByExternalIdAsync(externalId: string): Promise<Merchant | undefined> {
    return this._context.merchants
      .findOne({ where: { externalId } })
      .then((merchant) => merchant?.toDomain());
  }

  listAsync(): Promise<Merchant[]> {
    return this._context.merchants
      .find()
      .then((merchants) => merchants?.map((merchant) => merchant?.toDomain()));
  }
}
