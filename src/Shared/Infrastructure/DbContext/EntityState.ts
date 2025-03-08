export enum EntityState {
  Detached = 0,
  Unchanged = 1,
  Deleted = 2,
  Modified = 3,
  Added = 4
}

export interface TrackedEntity<T> {
  entity: T
  state: EntityState
  originalValues: Partial<T>
}