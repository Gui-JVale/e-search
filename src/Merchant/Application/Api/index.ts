import { Module } from "@nestjs/common";
import { Logger } from "@esearch/shared";

import { RepositoriesModule } from "Infrastructure/Repositories";

import { MerchantControllers } from "./Controllers";

@Module({
  controllers: [MerchantControllers],
  imports: [RepositoriesModule],
  providers: [Logger],
})
export class ApiModule {}
