// src/Shared/Infrastructure/Observability/Module.ts
import { Module, DynamicModule, Global } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TracingService } from "./Tracing/Service";
import { MetricsModule } from "./Metrics";
import { TracingModule } from "./Tracing";

@Global()
@Module({})
export class ObservabilityModule {
  static forRoot(): DynamicModule {
    return {
      module: ObservabilityModule,
      imports: [ConfigModule, MetricsModule, TracingModule],
      exports: [MetricsModule, TracingModule],
    };
  }

  static initializeSdk() {
    TracingService.initializeSdk();
  }
}
