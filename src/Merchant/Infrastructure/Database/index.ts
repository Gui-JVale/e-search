import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MerchantEntityTypeConfiguration } from "../EntityConfigurations/MerchantEntityTypeConfiguration";
import { MerchantContext } from "./MerchantContext";
import { Logger, ILogger } from "@esearch/shared";

@Module({
  imports: [TypeOrmModule.forFeature([MerchantEntityTypeConfiguration])],
  providers: [MerchantContext, { provide: ILogger, useClass: Logger }],
  exports: [MerchantContext],
})
export class DatabaseModule {}
