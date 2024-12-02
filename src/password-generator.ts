type CharacterName = 'Number' | 'Special' | 'Letter';

const CHARACTER_TYPES: Record<CharacterName, string> = {
  Letter: 'abcdefghijklmnopqrstuvwxyz',
  Number: '1234567890',
  Special: '!"#€%&£$',
} as const;

function getRandomCharacter(typeSet: string, toUpper: boolean) : string {
  const character = typeSet[Math.floor(Math.random() * typeSet.length)]
  return toUpper ? character.toUpperCase() : character;
}

export default function generatePassword(passwordLength: number): string {
  let password: string = '';

  while (password.length < passwordLength) {
    for (const [key, value]  of Object.entries(CHARACTER_TYPES)) {
      if (password.length >= passwordLength) {
        break;
      }

      const toUpper: boolean = key === "letter" && Math.random() < 0.5;

      password += getRandomCharacter(value, toUpper);
    }
  }

  return password;
}