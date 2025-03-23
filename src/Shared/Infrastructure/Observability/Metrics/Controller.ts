// src/Shared/Infrastructure/Observability/Metrics/MetricsController.ts
import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { MetricsService } from "./Service";

@ApiTags("Metrics")
@Controller("metrics")
export class MetricsController {
  constructor(private _metricsService: MetricsService) {}

  @Get()
  @ApiOperation({ summary: "Get metrics" })
  getMetrics() {
    return this._metricsService.index();
  }
}
