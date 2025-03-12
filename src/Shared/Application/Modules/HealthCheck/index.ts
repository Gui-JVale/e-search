import { Module } from "@nestjs/common";
import { HealthCheckControllers } from "./Controllers";

@Module({
  controllers: [HealthCheckControllers],
})
export class HealthCheckModule {}
