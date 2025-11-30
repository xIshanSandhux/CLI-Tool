# acli

An AI-powered coding assistant for explaining, reviewing, and improving your code — right from the terminal.

## Installation

```bash
npm install -g cli-tool
```

## Quick Start

First, initialize the CLI tool with your configuration:

```bash
acli init
```

This will prompt you to enter:
- **API Key**: Your OpenRouter API key
- **Provider**: AI provider (currently supports `openrouter`)
- **Model**: Model name (default: `x-ai/grok-4.1-fast`)
- **Cache**: Enable/disable caching (default: `false`)

## Commands

### `acli init`

Initialize the CLI tool and create a configuration file. If a config file already exists, you'll be prompted to update it.

```bash
acli init
```

### `acli explain`

Get AI-powered explanations for your code files.

```bash
acli explain -f <filePath>
# or
acli explain --file <filePath>
```

**Example:**
```bash
acli explain -f "src/index.ts"
acli explain --file "/components/Button.jsx"
```

### `acli review`

Get AI-powered code review and feedback for your code files.

```bash
acli review -f <filePath>
# or
acli review --file <filePath>
```

**Example:**
```bash
acli review -f "src/utils/helpers.ts"
acli review --file "/api/routes.js"
```

### `acli config`

View or update your current configuration.

**View current config:**
```bash
acli config --view
# or
acli config -v
```

**Update config:**
```bash
acli config --update
# or
acli config -u
```

## Configuration

Configuration is stored in your home directory under a `config` folder. The config file contains:
- `apiKey`: Your OpenRouter API key
- `provider`: AI provider (currently only `openrouter` is applicable)
- `model`: Model name to use for AI requests
- `cache`: Whether to enable caching

You can update your configuration at any time using `acli config --update`.

## Requirements

- Node.js (v14 or higher)
- OpenRouter API key ([Get one here](https://openrouter.ai/))

## License

ISC

## Issues & Support

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/xIshanSandhux/CLI-Tool/issues).

