// import { Injectable } from '@nestjs/common';
// import { InjectDataSource } from '@nestjs/typeorm';
// import { DataSource } from 'typeorm';
// import { DbContext } from '../../shared/Infrastructure/DbContext';
// import { MediatorService } from '../../shared/Infrastructure/Services/MediatorService';
// import { Merchant } from '../domain/aggregates-model/merchant/merchant';

// @Injectable()
// export class MerchantContext extends DbContext {
//   constructor(
//     @InjectDataSource() dataSource: DataSource,
//     mediator: MediatorService,
//   ) {
//     super(dataSource, mediator);
//   }

//   public Merchants = this.dataSource.getRepository(Merchant);
// }
