// import { Injectable } from '@nestjs/common';
// import { IMerchantRepository } from '../../domain/Repositories/IMerchantRepository';
// import { Merchant } from '../../domain/aggregates-model/merchant/merchant';
// import { MerchantContext } from '../MerchantContext';

// @Injectable()
// export class MerchantRepository implements IMerchantRepository {
//   constructor(private context: MerchantContext) {}

//   get UnitOfWork(): IUnitOfWork {
//     return this.context;
//   }

//   async Create(merchant: Merchant): Promise<Merchant> {
//     return this.context.Merchants.save(merchant);
//   }

//   async Update(merchant: Merchant): Promise<void> {
//     await this.context.Merchants.save(merchant);
//   }

//   // ... other repository methods
// }
