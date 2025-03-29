import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MerchantRecord } from "../Records/MerchantRecord";
import { MerchantContext } from "./MerchantContext";
import { Logger, ILogger } from "@esearch/shared";

@Module({
  imports: [TypeOrmModule.forFeature([MerchantRecord])],
  providers: [MerchantContext, { provide: ILogger, useClass: Logger }],
  exports: [MerchantContext],
})
export class DatabaseModule {}
