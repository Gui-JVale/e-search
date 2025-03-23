import { Injectable } from "@nestjs/common";
import { Counter, Gauge, Histogram, Registry, Summary } from "prom-client";

@Injectable()
export class MetricsService {
  private readonly registry: Registry;
  private counters: Map<string, Counter> = new Map();
  private gauges: Map<string, Gauge> = new Map();
  private histograms: Map<string, Histogram> = new Map();
  private summaries: Map<string, Summary> = new Map();

  constructor() {
    this.registry = new Registry();
  }

  index() {
    return this.registry.metrics();
  }

  // Counter methods
  createCounter(
    name: string,
    help: string,
    labelNames: string[] = [],
  ): Counter {
    const counter = new Counter({
      name,
      help,
      labelNames,
      registers: [this.registry],
    });
    this.counters.set(name, counter);
    return counter;
  }

  getCounter(name: string): Counter {
    return this.counters.get(name)!;
  }

  incrementCounter(
    name: string,
    labels: Record<string, string> = {},
    value: number = 1,
  ): void {
    this.getCounter(name).inc(labels, value);
  }

  // Gauge methods
  createGauge(name: string, help: string, labelNames: string[] = []): Gauge {
    const gauge = new Gauge({
      name,
      help,
      labelNames,
      registers: [this.registry],
    });
    this.gauges.set(name, gauge);
    return gauge;
  }

  getGauge(name: string): Gauge {
    return this.gauges.get(name)!;
  }

  setGauge(
    name: string,
    value: number,
    labels: Record<string, string> = {},
  ): void {
    this.getGauge(name).set(labels, value);
  }

  // Histogram methods
  createHistogram(
    name: string,
    help: string,
    labelNames: string[] = [],
    buckets = [0.1, 5, 15, 50, 100, 500],
  ): Histogram {
    const histogram = new Histogram({
      name,
      help,
      labelNames,
      buckets,
      registers: [this.registry],
    });
    this.histograms.set(name, histogram);
    return histogram;
  }

  getHistogram(name: string): Histogram {
    return this.histograms.get(name)!;
  }

  observeHistogram(
    name: string,
    value: number,
    labels: Record<string, string> = {},
  ): void {
    this.getHistogram(name).observe(labels, value);
  }

  createSummary(
    name: string,
    help: string,
    labelNames: string[] = [],
    percentiles?: number[],
    maxAgeSeconds?: number,
    ageBuckets?: number,
  ): Summary {
    const summary = new Summary({
      name,
      help,
      labelNames,
      percentiles,
      maxAgeSeconds,
      ageBuckets,
      registers: [this.registry],
    });
    this.summaries.set(name, summary);
    return summary;
  }

  getSummary(name: string): Summary {
    return this.summaries.get(name)!;
  }

  observeSummary(
    name: string,
    value: number,
    labels: Record<string, string> = {},
  ): void {
    this.getSummary(name).observe(labels, value);
  }
}
