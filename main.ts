import { logError, logPassword } from "./src/Logger.ts";
import validateInput from './src/validation.ts';
import generatePassword from "./src/password-generator.ts";
import copyToClipboard from "./src/clipoard.ts";

async function main(): Promise<void> {
  try {
    const { passwordLength, error, message } = validateInput(Deno.args);

    if (error) {
     throw new Error(message);
    }

    const password = generatePassword(passwordLength);

    logPassword(password);

    await copyToClipboard(password);
  } catch (error) {
    if (error instanceof Error) {
      logError(error.message);
      Deno.exit(1);
    }
    console.error(error);
    Deno.exit(1);
  }
}

main();
