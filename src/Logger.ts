type Writer = typeof Deno.stdout;
type LogLevel = 'info' | 'error' | 'success' | 'password';

export default class Logger {
  private outputStream: Writer;
  private static logger: Logger;

  static init(output: Writer = Deno.stdout): void {
    if (!this.logger) {
      this.logger = new Logger(output);
    }

    this.logger = new Logger(output);
  }

  static instance(): Logger {
    if (!this.logger) {
      throw new Error('Logger not initialized');
    }

    return this.logger;
  }

  constructor(output: Writer) {
    this.outputStream = output;
  }

  encode(message: string): Uint8Array {
    return new TextEncoder().encode(message);
  }

  format(message: string, level: LogLevel): string {
    const formattedMessage = {
      info: message,
      error: `\x1b[31m\u2718 Error: ${message}\n`,
      success: `\x1b[32m\u2714 ${message}`,
      password: `\x1b[34mPassword:\n\n${message}\n`,
    }[level]

    return `${formattedMessage}\n`;
  }

  write(message: string, type: LogLevel): void {
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