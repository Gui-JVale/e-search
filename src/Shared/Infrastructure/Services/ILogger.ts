export interface LogContext {
  [key: string]: any;
}

export interface ILogger {
  /**
   * Log debug level message
   * @param message - Message to log
   */
  debug(...message: string[]): void;

  /**
   * Log info level message
   * @param message - Message to log
   */
  info(...message: string[]): void;

  /**
   * Log warning level message
   * @param message - Message to log
   */
  warn(...message: string[]): void;

  /**
   * Log error level message
   * @param message - Message to log
   */
  error(...message: string[]): void;

  /**
   * Log fatal level message
   * @param message - Message to log
   */
  fatal(...message: string[]): void;
}
