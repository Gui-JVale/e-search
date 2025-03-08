import { Module } from "@nestjs/common";
import { MerchantRepository } from "Infrastructure/Repositories";
import { MerchantController } from "./Controllers";

@Module({
  imports: [],
  controllers: [MerchantController],
  providers: [MerchantRepository],
})
export class Api {}
