import { Module } from "@nestjs/common";
import { IMerchantRepository } from "DomainTemp";

import { MerchantRepository } from "./MerchantRepository";
import { DatabaseModule } from "../Database";

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: IMerchantRepository,
      useClass: MerchantRepository,
    },
  ],
  exports: [
    {
      provide: IMerchantRepository,
      useClass: MerchantRepository,
    },
  ],
})
export class RepositoriesModule {}
