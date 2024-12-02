import Logger from "./Logger.ts";

type SupportedPlatform = 'win32' | 'linux' | 'darwin';

type PlatformMap = {
  [key in SupportedPlatform]: string;
};

function decodeOutput(output: Uint8Array): string {
  return new TextDecoder().decode(output).trim();
}

export default async function copyToClipboard(
  password: string,
  platform: SupportedPlatform = Deno.build.os as SupportedPlatform
): Promise<void> {
  const platformMap: PlatformMap = {
    win32: 'clip',
    linux: 'xclip',
    darwin: 'pbcopy',
  } as const;

  const command = platformMap[platform];

  if (!command) {
    throw new Error('Unsupported platform for copying to clipboard');
  }

  const escapedPassword: string = password.replace(/(\$|")/g, '\\$&').replace(/%/g, '%%');

  const process = new Deno.Command('sh', {
    args: ['-c', `printf "${escapedPassword}" | ${command}`],
    stdin: 'null',
    stdout: 'piped',
    stderr: 'piped',
  });

  const { stderr, code } = await process.output();

  if (stderr.length > 0) {
    if (code === 127) {
      throw new Error(`Please install ${command} to copy to clipboard`);
    }

    throw new Error(`Failed to copy password to clipboard:' ${decodeOutput(stderr)}`);
  }

  Logger.instance().success('Password copied to clipboard');
}