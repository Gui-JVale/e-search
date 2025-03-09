import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { DbContext, ILogger } from "@esearch/shared";
import { Merchant } from "DomainTemp/AggregatesModel/Merchant/Merchant";
import { MerchantEntityTypeConfiguration } from "../EntityConfigurations/MerchantEntityTypeConfiguration";

@Injectable()
export class MerchantContext extends DbContext<Merchant> {
  constructor(dataSource: DataSource, @Inject(ILogger) logger: ILogger) {
    super(dataSource, logger);
  }

  public merchants = this._dataSource.getRepository(
    MerchantEntityTypeConfiguration,
  );
}
