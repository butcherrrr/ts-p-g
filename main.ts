import Logger from "./src/Logger.ts";
import validateInput, { ValidationResult } from './src/validation.ts';
import generatePassword from "./src/password-generator.ts";
import copyToClipboard from "./src/clipoard.ts";

Logger.init();

async function main(): Promise<void> {
  try {
    const { passwordLength, error, message }: ValidationResult = validateInput(Deno.args);

    if (error) {
     throw new Error(message);
    }

    const password: string = generatePassword(passwordLength);

    Logger.instance().password(password)

    await copyToClipboard(password);
  } catch (error) {
    if (error instanceof Error) {
      Logger.instance().error(error.message);
      Deno.exit(1);
    }
    console.error(error);
    Deno.exit(1);
  }
}

main();