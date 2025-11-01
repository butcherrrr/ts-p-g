type LogLevel = 'info' | 'error' | 'success' | 'password';

export default class Logger {
  private static logger: Logger;

  static init(output = Deno.stdout): void {
    this.logger = new Logger(output);
  }

  static instance(): Logger {
    if (!this.logger) {
      throw new Error('Logger not initialized');
    }

    return this.logger;
  }

  constructor(private outputStream: typeof Deno.stdout) {}

  private encode(message: string) {
    return new TextEncoder().encode(message);
  }

  private format(message: string, level: LogLevel) {
    const formatMap = {
      info: message,
      error: `\x1b[31m\u2718 Error: ${message}\n`,
      success: `\x1b[32m\u2714 ${message}`,
      password: `\x1b[34mPassword:\n\n${message}\n`,
    } satisfies Record<LogLevel, string>;

    return `${formatMap[level]}\n`;
  }

  private write(message: string, type: LogLevel): void {
    const formattedMessage = this.format(message, type);
    const encodedMessage = this.encode(formattedMessage);
    this.outputStream.write(encodedMessage);
  }

  password(message: string): void {
    this.write(message, 'password');
  }

  error(message: string): void {
    this.write(message, 'error');
  }

  success(message: string): void {
    this.write(message, 'success');
  }
}