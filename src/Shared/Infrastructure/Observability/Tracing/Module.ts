// src/Shared/Infrastructure/Observability/Tracing/Module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TracingService } from "./Service";

@Module({
  imports: [ConfigModule],
  providers: [TracingService],
  exports: [TracingService],
})
export class TracingModule {}
