import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { CommonMetrics } from "../Metrics/CommonMetrics";
import { Guid } from "../../../Common";

@Injectable()
export class HttpMetricsMiddleware implements NestMiddleware {
  constructor(private readonly _metrics: CommonMetrics) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const requestId =
      (req.headers["x-request-id"] as string) || Guid.newGuid().toString();
    req.headers["x-request-id"] = requestId;

    // Add response tracking
    const originalEnd = res.end;
    const metrics = this._metrics;

    // @ts-ignore - Overriding end method
    res.end = function (...args: any[]) {
      const responseTime = Date.now() - start;
      const { method } = req;
      const route = req.route?.path || req.path;
      const statusCode = res.statusCode.toString();

      // Record metrics
      metrics.httpRequestDuration.observe(
        { method, route, status_code: statusCode },
        responseTime / 1000, // convert to seconds
      );

      metrics.httpRequestTotal.inc({
        method,
        route,
        status_code: statusCode,
      });

      if (res.statusCode >= 400) {
        metrics.httpRequestErrors.inc({
          method,
          route,
          status_code: statusCode,
          error: res.statusMessage,
        });
      }

      // @ts-ignore - Using spread args with original function
      return originalEnd.apply(this, args);
    };

    next();
  }
}
