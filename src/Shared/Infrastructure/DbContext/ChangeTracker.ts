import { Entity } from "src/Shared/Domain/Entity";
import { EntityEntry } from "./EntityEntry";
import { EntityState } from "./EntityState";

export class ChangeTracker<T extends Entity> {
  private _trackedEntities = new Map<string, EntityEntry<any>>();

  track(entity: T): EntityEntry<T> {
    const key = this._createEntityKey(entity);

    if (!this._trackedEntities.has(key)) {
      const entry = new EntityEntry<T>(entity);
      this._trackedEntities.set(key, entry);
      return entry;
    }

    return this._trackedEntities.get(key) as EntityEntry<T>;
  }

  add(entity: T): EntityEntry<T> {
    const key = this._createEntityKey(entity);

    if (this._trackedEntities.has(key)) {
      throw new Error("Entity is already being tracked");
    }

    const entry = new EntityEntry<T>(entity);
    entry.state = EntityState.Added;
    this._trackedEntities.set(key, entry);
    return entry;
  }

  update(entity: T): EntityEntry<T> {
    const entry = this.entry(entity);
    entry.state = EntityState.Modified;
    return entry;
  }

  remove(entity: T): void {
    const entry = this.entry(entity);

    if (entry.state === EntityState.Detached) {
      entry.state = EntityState.Unchanged;
    }

    if (entry.state === EntityState.Added) {
      entry.state = EntityState.Detached;
    } else {
      entry.state = EntityState.Deleted;
    }
  }

  entry(entity: T): EntityEntry<T> {
    const key = this._createEntityKey(entity);
    const entry = this._trackedEntities.get(key);

    if (!entry) {
      throw new Error("Entity is not being tracked");
    }

    this.entry(entity).update(entity);

    return entry as EntityEntry<T>;
  }

  getTrackedEntities(): EntityEntry<any>[] {
    return Array.from(this._trackedEntities.values());
  }

  clearTracking(): void {
    this._trackedEntities.clear();
  }

  private _createEntityKey(entity: any): string {
    if (!entity.id) {
      throw new Error("Entity must have an id property");
    }
    return `${entity.constructor.name}-${entity.id}`;
  }
}
