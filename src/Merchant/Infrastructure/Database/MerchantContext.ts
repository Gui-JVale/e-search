import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { DbContext, ILogger } from "@esearch/shared";
import { Merchant } from "DomainTemp/AggregatesModel/Merchant/Merchant";
import { MerchantRecord } from "../Records/MerchantRecord";


@Injectable()
export class MerchantContext extends DbContext<Merchant> {
  constructor(dataSource: DataSource, @Inject(ILogger) logger: ILogger) {
    super(dataSource, logger);
  }

  // TODO: implement wrapper, it's dangerous to expose the repository directly, clients
  // can bypass the domain layer and modify the database directly.
  public merchants = this._dataSource.getRepository(MerchantRecord);

  public toDomain(record: MerchantRecord): Merchant {
    return record.toDomain();
  }

  public toPersistence(entity: Merchant): MerchantRecord {
    return MerchantRecord.fromDomain(entity);
  }
}
