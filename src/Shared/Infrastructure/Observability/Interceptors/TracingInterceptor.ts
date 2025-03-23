// src/Shared/Infrastructure/Observability/Interceptors/TracingInterceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable, from, lastValueFrom } from "rxjs";
import { tap } from "rxjs/operators";
import { SpanStatusCode } from "@opentelemetry/api";

import { TracingService } from "../Tracing/Service";

@Injectable()
export class TracingInterceptor implements NestInterceptor {
  constructor(private _tracingService: TracingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    const className = context.getClass().name;
    const spanName = `${className}.${handler.name}`;

    return from(
      this._tracingService.withAsyncSpan(spanName, async (span) => {
        try {
          const result = await lastValueFrom(
            next.handle().pipe(
              tap({
                error: (error) => {
                  span.setStatus({ code: SpanStatusCode.ERROR });
                  span.setAttribute("error.message", error.message);
                },
              }),
            ),
          );

          return result;
        } catch (error) {
          span.setStatus({ code: SpanStatusCode.ERROR });
          span.setAttribute(
            "error.message",
            error instanceof Error ? error.message : String(error),
          );
          throw error;
        }
      }),
    );
  }
}
