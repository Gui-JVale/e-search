// import { Injectable } from '@nestjs/common';
// import { MediatorService } from '../../../Shared/Infrastructure/Services/MediatorService';
// import { IMerchantRepository } from '../../Domain/Repositories/IMerchantRepository';
// import { CreateMerchantCommand } from '../Commands/CreateMerchantCommand';
// import { Merchant } from '../../Domain/Entities/Merchant';

// @Injectable()
// export class CreateMerchantCommandHandler {
//   constructor(
//     private readonly mediator: MediatorService,
//     private readonly repository: IMerchantRepository
//   ) {}

//   async execute(command: CreateMerchantCommand): Promise<void> {
//     const merchant = new Merchant(command.name, command.domain);
//     await this.repository.save(merchant);

//     // Publish all domain events
//     await Promise.all(
//       merchant.domainEvents.map(event => this.mediator.publish(event))
//     );

//     merchant.clearDomainEvents();
//   }
// }
