// src/Shared/Infrastructure/Observability/Metrics/Module.ts
import { Module } from "@nestjs/common";
import { MetricsService } from "./Service";
import { CommonMetrics } from "./CommonMetrics";
import { MetricsController } from "./Controller";

@Module({
  imports: [],
  controllers: [MetricsController],
  providers: [MetricsService, CommonMetrics],
  exports: [MetricsService, CommonMetrics],
})
export class MetricsModule {}
