import { DataSource, EntityManager } from "typeorm";
import { Entity, IUnitOfWork } from "../../Domain";

import { ChangeTracker } from "./ChangeTracker";
import { EntityState } from "./EntityState";
import { TrackedEntity } from "./EntityState";
import { ILogger } from "../Services/ILogger";
// import { EventDispatcher } from "./EventDispatcher";

/**
 * Base class for all database contexts
 * @template T - The type of entity managed by the context
 */
export abstract class DbContext<T extends Entity> implements IUnitOfWork {
  protected readonly _dataSource: DataSource;
  // private readonly _eventDispatcher: EventDispatcher;
  protected readonly _changeTracker: ChangeTracker<T>;
  private readonly _logger: ILogger;
  private _entityManager?: EntityManager;

  constructor(dataSource: DataSource, logger: ILogger) {
    this._dataSource = dataSource;
    this._logger = logger;
    // this._eventDispatcher = eventDispatcher;
    this._changeTracker = new ChangeTracker<T>();
  }

  /**
   * Save all entities in the change tracker
   * @returns Promise<boolean>
   */
  saveEntitiesAsync(): Promise<boolean> {
    return this.saveChangesAsync();
  }

  /**
   * Save all changes to the database
   * @returns Promise<boolean>
   */
  async saveChangesAsync(): Promise<boolean> {
    try {
      const manager = await this.getEntityManager();

      await manager.transaction(async (transactionalManager) => {
        const trackedEntities = this._changeTracker.getTrackedEntities();

        // Save all changes in order (Delete -> Modified -> Added)
        await this._saveDeletedEntities(trackedEntities, transactionalManager);
        await this._saveModifiedEntities(trackedEntities, transactionalManager);
        await this._saveNewEntities(trackedEntities, transactionalManager);

        // Dispatch domain events
        // await this.dispatchDomainEvents(trackedEntities);

        // Clear tracking after successful save
        this._changeTracker.clearTracking();
      });
      return true;
    } catch (error) {
      this._logger.error("Failed to save changes to database");
      throw error;
    }
  }

  /**
   * Add an entity to the change tracker
   * @param entity - The entity to add
   * @returns The entity
   */
  add(entity: T): T {
    this._changeTracker.add(entity);
    return entity;
  }

  /**
   * Update an entity in the change tracker
   * @param entity - The entity to update
   * @returns The entity
   */
  update(entity: T): T {
    this._changeTracker.entry(entity).state = EntityState.Modified;
    return entity;
  }

  /**
   * Delete an entity from the change tracker
   * @param entity - The entity to delete
   */
  delete(entity: T): void {
    this._changeTracker.remove(entity);
  }

  /**
   * Get the entity manager
   * @returns The entity manager
   */
  protected async getEntityManager(): Promise<EntityManager> {
    if (!this._entityManager) {
      if (!this._dataSource.isInitialized) {
        await this._dataSource.initialize();
      }
      this._entityManager = this._dataSource.manager;
    }
    return this._entityManager;
  }

  private async _saveDeletedEntities(
    trackedEntities: TrackedEntity<any>[],
    manager: EntityManager,
  ): Promise<void> {
    const deletedEntities = trackedEntities.filter(
      (e) => e.state === EntityState.Deleted,
    );
    for (const { entity } of deletedEntities) {
      await manager.remove(entity);
    }
  }

  private async _saveModifiedEntities(
    trackedEntities: TrackedEntity<any>[],
    manager: EntityManager,
  ): Promise<void> {
    const modifiedEntities = trackedEntities.filter(
      (e) => e.state === EntityState.Modified,
    );
    for (const { entity } of modifiedEntities) {
      await manager.save(entity);
    }
  }

  private async _saveNewEntities(
    trackedEntities: TrackedEntity<any>[],
    manager: EntityManager,
  ): Promise<void> {
    const newEntities = trackedEntities.filter(
      (e) => e.state === EntityState.Added,
    );
    for (const { entity } of newEntities) {
      await manager.save(entity);
    }
  }

  // private async dispatchDomainEvents(
  //   trackedEntities: TrackedEntity<any>[],
  // ): Promise<void> {
  //   const domainEvents: DomainEvent[] = [];

  //   for (const { entity } of trackedEntities) {
  //     if ("domainEvents" in entity) {
  //       domainEvents.push(...entity.domainEvents);
  //       entity.clearDomainEvents();
  //     }
  //   }

  //   for (const event of domainEvents) {
  //     await this._eventDispatcher.dispatch(event);
  //   }
  // }
}
