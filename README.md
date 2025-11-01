# ts-p-g

Deno 2.0 based implementation of https://github.com/butcherrrr/password-generator

A secure password generator CLI tool that creates random passwords and copies them to your clipboard.

## Installation

Install globally using Deno to create a `pg` command you can use from anywhere:

```sh
deno task install
```

Or install manually:

```sh
deno install --allow-run --global --name pg main.ts
```

## Usage

After installation, generate passwords from anywhere in your terminal:

```sh
# Generate password with default length (12 characters)
pg

# Generate password with custom length
pg 16
pg 8

# Password length must be between 6-20 characters
```

The generated password will be automatically copied to your clipboard and displayed in the terminal.

## Development

```sh
# Run directly (without installing)
deno run --allow-run main.ts <password-length>

# Development mode with file watching
deno task dev

# Compile to standalone executable
deno task compile
```

## Requirements

- **Deno 2.0+**
- **Clipboard tool** (automatically available on most systems):
  - macOS: `pbcopy` (built-in)
  - Linux: `xclip` (install with `sudo apt install xclip`)
  - Windows: `clip` (built-in)

## Permissions

The tool requires `--allow-run` permission to execute clipboard commands for copying the generated password.

## Uninstall

```sh
deno uninstall pg
```
