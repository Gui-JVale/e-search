import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { DbContext, ILogger } from "@esearch/shared";
import { Merchant } from "Domain/AggregatesModel/Merchant/Merchant";
import { MerchantEntityTypeConfiguration } from "./EntityConfigurations/MerchantEntityTypeConfiguration";

@Injectable()
export class MerchantContext extends DbContext<Merchant> {
  constructor(@InjectDataSource() dataSource: DataSource, logger: ILogger) {
    super(dataSource, logger);
  }

  public merchants = this._dataSource.getRepository(
    MerchantEntityTypeConfiguration,
  );
}
