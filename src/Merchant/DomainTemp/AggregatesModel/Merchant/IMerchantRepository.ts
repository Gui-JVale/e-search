import { IRepository, Guid } from "@esearch/shared";
import { Merchant } from "./Merchant";

export interface IMerchantRepository extends IRepository<Merchant> {
  /**
   * Create a new merchant
   * @param merchant - The merchant to create
   * @returns The created merchant
   */
  create(merchant: Merchant): Merchant;

  /**
   * Update a merchant
   * @param merchant - The merchant to update
   */
  update(merchant: Merchant): void;

  /**
   * Get a merchant by its global ID
   * @param guid - The global ID of the merchant
   * @returns The merchant or undefined if it does not exist
   */
  getByGlobalIdAsync(guid: Guid): Promise<Merchant | undefined>;

  /**
   * Get a merchant by its external ID
   * @param externalId - The external ID of the merchant
   * @returns The merchant or undefined if it does not exist
   */
  getByExternalIdAsync(externalId: string): Promise<Merchant | undefined>;

  /**
   * Get all merchants
   * @returns All merchants
   */
  listAsync(): Promise<Merchant[]>;
}

// Symbol for dependency injection
export const IMerchantRepository = Symbol("IMerchantRepository");
