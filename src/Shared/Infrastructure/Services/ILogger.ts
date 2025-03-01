export interface LogContext {
  [key: string]: any;
}

export interface ILogger {
  /**
   * Log debug level message
   * @param message - Message to log
   * @param context - Additional contextual information
   */
  debug(message: string, context?: LogContext): void;

  /**
   * Log info level message
   * @param message - Message to log
   * @param context - Additional contextual information
   */
  info(message: string, context?: LogContext): void;

  /**
   * Log warning level message
   * @param message - Message to log
   * @param context - Additional contextual information
   */
  warn(message: string, context?: LogContext): void;

  /**
   * Log error level message
   * @param message - Message to log
   * @param error - Error object
   * @param context - Additional contextual information
   */
  error(message: string, error?: Error, context?: LogContext): void;

  /**
   * Log fatal level message
   * @param message - Message to log
   * @param error - Error object
   * @param context - Additional contextual information
   */
  fatal(message: string, error?: Error, context?: LogContext): void;
}
