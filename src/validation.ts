export type ValidationResult = {
  error: boolean;
  message?: string;
  passwordLength: number;
};

const MAX_LENGTH = 20;
const MIN_LENGTH = 6;
const DEFAULT_LENGTH = 12;

export default function validateInput(args: string[]): ValidationResult {
  const requestedLength = args.length ? parseInt(args[0], 10) : DEFAULT_LENGTH;

  if (Number.isNaN(requestedLength)) {
    return {
      error: true,
      message: 'Usage: np <password-length> # Arg must be a number, leave blank for default of 12',
      passwordLength: requestedLength,
    };
  }

  if (requestedLength < MIN_LENGTH) {
    return {
      error: true,
      message: 'Usage: np <password-length> # Arg must be more than six characters',
      passwordLength: requestedLength,
    };
  }

  if (requestedLength > MAX_LENGTH) {
    return {
      error: true,
      message: 'Usage: np <password-length> # Arg must be less than 24 characters',
      passwordLength: requestedLength,
    };
  }

  return {
    error: false,
    passwordLength: requestedLength,
  };
}