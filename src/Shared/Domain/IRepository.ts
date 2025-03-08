import { IUnitOfWork } from "./IUnitOfWork";
import { IAggregateRoot } from "./IAggregateRoot";

export interface IRepository<T extends IAggregateRoot> {
  unitOfWork: IUnitOfWork;
}
