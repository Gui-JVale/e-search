export interface IUnitOfWork {
  saveEntitiesAsync(): Promise<boolean>;
  saveChangesAsync(): Promise<boolean>;
}
