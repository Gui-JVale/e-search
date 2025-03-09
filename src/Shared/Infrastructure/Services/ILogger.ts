export interface ILogger {
  /**
   * Set the context for the logger
   * @param context - The context to set
   */
  setContext(context: string): void;

  /**
   * Log info level message
   * @param message - Message to log
   */
  log(message: string, ...meta: any[]): void;

  /**
   * Log info level message
   * @param message - Message to log
   */
  info(message: string, ...meta: any[]): void;

  /**
   * Log warning level message
   * @param message - Message to log
   */
  warn(message: string, ...meta: any[]): void;

  /**
   * Log debug level message
   * @param message - Message to log
   */
  debug(message: string, ...meta: any[]): void;

  /**
   * Log error level message
   * @param message - Message to log
   */
  error(message: string, ...meta: any[]): void;

  /**
   * Log fatal level message
   * @param message - Message to log
   */
  fatal(message: string, ...meta: any[]): void;
}
