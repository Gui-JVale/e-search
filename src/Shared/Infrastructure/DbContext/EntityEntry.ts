import { Entity } from "src/Shared/Domain/Entity";

import { EntityState } from "./EntityState";

export class EntityEntry<T extends Entity> {
  private _originalValues: Partial<T>;
  private _currentValues: T;
  private _state: EntityState;

  constructor(entity: T) {
    this._currentValues = entity;
    this._originalValues = { ...entity };
    this._state = EntityState.Unchanged;
  }

  get entity(): T {
    return this._currentValues;
  }

  get state(): EntityState {
    return this._state;
  }

  set state(value: EntityState) {
    this._state = value;
  }

  get originalValues(): Partial<T> {
    return this._originalValues;
  }

  update(entity: T): void {
    this._currentValues = entity;
    this.detectChanges();
  }

  detectChanges(): void {
    if (
      this._state === EntityState.Added ||
      this._state === EntityState.Deleted
    ) {
      return;
    }

    const hasChanges = Object.keys(this._originalValues).some((key) => {
      return (
        this._originalValues[key as keyof T] !==
        this._currentValues[key as keyof T]
      );
    });

    if (hasChanges) {
      this._state = EntityState.Modified;
    }
  }

  acceptChanges(): void {
    this._originalValues = { ...this._currentValues };
    this._state = EntityState.Unchanged;
  }

  rejectChanges(): void {
    Object.assign(this._currentValues, this._originalValues);
    this._state = EntityState.Unchanged;
  }
}
