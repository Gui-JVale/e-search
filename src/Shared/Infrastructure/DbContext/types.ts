/* TODO: we should implement a wrapper around the typeorm repository to block the write methods
  to make the repository readonly and also transform typeorm entities to domain entities.
*/
// import { Repository, ObjectLiteral } from "typeorm";

// type WriteMethodsToBlock = 'save' | 'remove' | 'insert' | 'update' | 'delete' | 'clear' | 'softDelete' | 'recover';
// export type ReadOnlyRepository<T extends ObjectLiteral> = Omit<Repository<T>, WriteMethodsToBlock>;
