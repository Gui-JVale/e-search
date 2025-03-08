import { IRepository, Guid } from "@esearch/shared";
import { Merchant } from "./Merchant";

export interface IMerchantRepository extends IRepository<Merchant> {
  create(merchant: Merchant): Merchant;

  update(merchant: Merchant): void;

  delete(merchant: Merchant): void;

  getByGlobalIdAsync(guid: Guid): Promise<Merchant | undefined>;

  getByExternalIdAsync(externalId: string): Promise<Merchant | undefined>;

  listAsync(): Promise<Merchant[]>;
}
