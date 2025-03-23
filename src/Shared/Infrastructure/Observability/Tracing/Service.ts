import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { NestInstrumentation } from "@opentelemetry/instrumentation-nestjs-core";
import { TypeormInstrumentation } from "opentelemetry-instrumentation-typeorm";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import {
  trace,
  SpanKind,
  SpanStatusCode,
  context,
  Span,
} from "@opentelemetry/api";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";

@Injectable()
export class TracingService implements OnModuleInit, OnModuleDestroy {
  private _tracer: any;

  constructor(private _configService: ConfigService) {}

  static initializeSdk() {
    const serviceName = process.env.SERVICE_NAME || "unknown-service";
    const serviceVersion = process.env.SERVICE_VERSION || "1.0.0";
    const otlpEndpoint =
      process.env.OTLP_ENDPOINT || "http://localhost:4318/v1/traces";

    console.log("Initializing tracing service:", serviceName);
    console.log("Service version:", serviceVersion);
    console.log("OTLP endpoint:", otlpEndpoint);

    const sdk = new opentelemetry.NodeSDK({
      resource: new Resource({
        [ATTR_SERVICE_NAME]: serviceName,
        [ATTR_SERVICE_VERSION]: serviceVersion,
      }),
      traceExporter: new OTLPTraceExporter({
        url: otlpEndpoint,
      }),
      instrumentations: [
        new HttpInstrumentation(), // Outgoing HTTP requests
        new ExpressInstrumentation(), // Express-specific instrumentation
        new NestInstrumentation(), // NestJS-specific instrumentation
        new TypeormInstrumentation(), // Database calls
        getNodeAutoInstrumentations(),
      ],
    });

    sdk.start();

    // Graceful shutdown
    process.on("SIGTERM", () => {
      sdk
        .shutdown()
        .then(() => console.log("Tracing terminated"))
        .catch((error) => console.log("Error terminating tracing", error))
        .finally(() => process.exit(0));
    });

    console.log(`Tracing initialized for service: ${serviceName}`);

    return sdk;
  }

  onModuleInit() {
    const serviceName = this._configService.get<string>(
      "SERVICE_NAME",
      "unknown-service",
    );

    this._tracer = trace.getTracer(serviceName);
  }

  onModuleDestroy() {}

  // Helper methods for manual instrumentation
  startSpan(name: string, options?: any) {
    return this._tracer.startSpan(name, {
      kind: SpanKind.INTERNAL,
      ...options,
    });
  }

  withSpan<T>(name: string, fn: (span: Span) => T, options?: any): T {
    const span = this.startSpan(name, options);

    return context.with(trace.setSpan(context.active(), span), () => {
      try {
        const result = fn(span);
        span.setStatus({ code: SpanStatusCode.OK });
        span.end();
        return result;
      } catch (error) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error instanceof Error ? error.message : String(error),
        });
        span.end();
        throw error;
      }
    });
  }

  async withAsyncSpan<T>(
    name: string,
    fn: (span: Span) => Promise<T>,
    options?: any,
  ): Promise<T> {
    const span = this.startSpan(name, options);

    return context.with(trace.setSpan(context.active(), span), async () => {
      try {
        const result = await fn(span);
        span.setStatus({ code: SpanStatusCode.OK });
        span.end();
        return result;
      } catch (error) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error instanceof Error ? error.message : String(error),
        });
        span.end();
        throw error;
      }
    });
  }

  getCurrentSpan(): Span {
    return trace.getSpan(context.active()) || this._tracer.startSpan("default");
  }

  addEvent(name: string, attributes?: Record<string, any>) {
    const currentSpan = this.getCurrentSpan();
    currentSpan.addEvent(name, attributes);
  }
}
