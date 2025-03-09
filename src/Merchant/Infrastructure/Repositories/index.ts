import { Module } from "@nestjs/common";
import { MerchantRepository } from "./MerchantRepository";
import { DatabaseModule } from "../Database";

@Module({
  imports: [DatabaseModule],
  providers: [MerchantRepository],
  exports: [MerchantRepository],
})
export class RepositoriesModule {}
