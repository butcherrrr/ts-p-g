const encoder = new TextEncoder();

function write(message: string, output = Deno.stdout) {
  output.write(encoder.encode(message));
}

export function logError(message: string) {
  write(`\x1b[31m✘ Error: ${message}\n\x1b[0m`);
}

export function logSuccess(message: string) {
  write(`\x1b[32m✓ ${message}\x1b[0m\n`);
}

export function logPassword(password: string) {
  write(`\x1b[34mPassword:\n\n${password}\n\x1b[0m\n`);
}