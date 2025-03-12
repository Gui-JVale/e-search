import { Module } from "@nestjs/common";
import { ILogger, Logger } from "@esearch/shared";
import { RepositoriesModule } from "Infrastructure/Repositories";
import { MerchantControllers } from "./Controllers";
import { HealthCheckModule } from "@esearch/shared";
@Module({
  controllers: [MerchantControllers],
  imports: [RepositoriesModule, HealthCheckModule],
  providers: [
    {
      provide: ILogger,
      useClass: Logger,
    },
  ],
})
export class ApiModule {}
