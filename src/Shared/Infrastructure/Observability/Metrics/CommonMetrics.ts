// src/Shared/Infrastructure/Observability/Metrics/CommonMetrics.ts
import { Injectable, OnModuleInit } from "@nestjs/common";
import { MetricsService } from "./Service";
import { Counter, Histogram } from "prom-client";

@Injectable()
export class CommonMetrics implements OnModuleInit {
  public httpRequestDuration: Histogram;
  public httpRequestTotal: Counter;
  public httpRequestErrors: Counter;

  constructor(private metricsService: MetricsService) {}

  onModuleInit() {
    // HTTP metrics
    this.httpRequestDuration = this.metricsService.createHistogram(
      "http_request_duration_seconds",
      "HTTP request duration in seconds",
      ["method", "route", "status_code"],
    );

    this.httpRequestTotal = this.metricsService.createCounter(
      "http_requests_total",
      "Total number of HTTP requests",
      ["method", "route", "status_code"],
    );

    this.httpRequestErrors = this.metricsService.createCounter(
      "http_request_errors_total",
      "Total number of HTTP request errors",
      ["method", "route", "status_code", "error"],
    );

    // Add database metrics, queue metrics, etc.
  }
}
