// import { Injectable } from '@nestjs/common';
// import { DataSource, QueryRunner } from 'typeorm';
// import { IUnitOfWork } from '../Domain/IUnitOfWork';
// import { MediatorService } from './Services/MediatorService';

// @Injectable()
// export abstract class DbContext implements IUnitOfWork {
//   private _queryRunner: QueryRunner | null = null;

//   constructor(
//     private readonly dataSource: DataSource,
//     private readonly mediator: MediatorService,
//   ) {}

//   private get queryRunner(): QueryRunner {
//     if (!this._queryRunner) {
//       throw new Error('Transaction not started');
//     }
//     return this._queryRunner;
//   }

//   async SaveEntitiesAsync(): Promise<boolean> {
//     // Dispatch Domain Events before saving
//     await this.DispatchDomainEvents();

//     await this.SaveChangesAsync();
//     return true;
//   }

//   async SaveChangesAsync(): Promise<void> {
//     await this.queryRunner.manager.save(
//       this.queryRunner.manager.getRepository(Entity).metadata.target,
//       this.queryRunner.manager.getRepository(Entity).create(),
//     );
//   }

//   async BeginTransactionAsync(): Promise<void> {
//     this._queryRunner = this.dataSource.createQueryRunner();
//     await this._queryRunner.connect();
//     await this._queryRunner.startTransaction();
//   }

//   async CommitTransactionAsync(): Promise<void> {
//     await this.queryRunner.commitTransaction();
//   }

//   async RollbackTransactionAsync(): Promise<void> {
//     await this.queryRunner.rollbackTransaction();
//   }

//   private async DispatchDomainEvents(): Promise<void> {
//     // Get all entities with domain events
//     const domainEntities = this.queryRunner.manager
//       .getRepository(Entity)
//       .metadata.relations.map((r) => r.entityMetadata.target)
//       .filter(
//         (entity) => 'DomainEvents' in entity && entity.DomainEvents.length > 0,
//       );

//     const domainEvents = domainEntities.flatMap(
//       (entity) => entity.DomainEvents,
//     );

//     // Clear events
//     domainEntities.forEach((entity) => entity.ClearDomainEvents());

//     // Publish events
//     for (const domainEvent of domainEvents) {
//       await this.mediator.publish(domainEvent);
//     }
//   }
// }
