import { Module } from "@nestjs/common";
import { ILogger, Logger } from "@esearch/shared";
import { RepositoriesModule } from "Infrastructure/Repositories";
import { MerchantControllers } from "./Controllers";

@Module({
  controllers: [MerchantControllers],
  imports: [RepositoriesModule],
  providers: [
    {
      provide: ILogger,
      useClass: Logger,
    },
  ],
})
export class ApiModule {}
