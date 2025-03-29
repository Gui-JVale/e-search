import { Injectable, Scope } from "@nestjs/common";
import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from "winston";

import { ILogger } from "./ILogger";

@Injectable({ scope: Scope.TRANSIENT })
export class Logger implements ILogger {
  private _context: string;
  private readonly _logger: WinstonLogger;

  constructor() {
    //@ts-ignore
    this.setup = true;
    this._context = "";
    this._logger = createLogger({
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.json(),
      ),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      ],
    });
  }

  setContext(context: string): void {
    this._context = context;
  }

  log(message: string, ...meta: any[]): void {
    this._logger.info(this._context, message, ...meta);
  }

  info(message: string, ...meta: any[]): void {
    //@ts-ignore
    this._logger.info(this._context, message, ...meta);
  }

  warn(message: string, ...meta: any[]): void {
    this._logger.warn(this._context, message, ...meta);
  }

  debug(message: string, ...meta: any[]): void {
    this._logger.debug(this._context, message, ...meta);
  }

  error(message: string, ...meta: any[]): void {
    this._logger.error(this._context, message, ...meta);
  }

  fatal(message: string, ...meta: any[]): void {
    this._logger.error(this._context, "FATAL", message, ...meta);
  }
}
