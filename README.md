# vscode-tiktoken-extension

A VS Code extension that displays token counts for the current file and text selection using multiple token counting providers.

## Features

1. **Status Bar Token Counter**: Shows the total token count for the current file in the VS Code status bar
   - Displays as `token:num` (e.g., `token:150`)
   
2. **Selection Token Counter**: When text is selected, shows an additional count for the selected text
   - Displays as `token:num selection:num` (e.g., `token:150 selection:25`)

3. **Multiple Token Provider Support**: Choose from different token counting providers
   - **OpenAI** (GPT models): Uses tiktoken for accurate GPT-4 tokenization
   - **Claude** (Anthropic): Uses official Anthropic tokenizer
   - **Gemini**: Falls back to tiktoken (Google's tokenization compatible estimation)
   - **Other**: Falls back to tiktoken for general use

4. **Language Model Tool API**: Exposes a tool for counting tokens that can be used by AI assistants
   - Tool name: `vscode-tiktoken-extension.countTokens`
   - Accepts a `text` parameter and returns the token count using the configured provider

## Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run compile` to compile the extension
4. Press F5 in VS Code to launch the extension in a new Extension Development Host window

## Configuration

You can configure which token counting provider to use by default:

1. Open VS Code Settings (Ctrl/Cmd + ,)
2. Search for "Token Counter"
3. Select your preferred provider from the dropdown:
   - **OpenAI (GPT)**: For OpenAI GPT models (GPT-3.5, GPT-4, etc.)
   - **Claude**: For Anthropic Claude models
   - **Gemini**: For Google Gemini models (uses tiktoken fallback)
   - **Other**: For other models (uses tiktoken fallback)

Or add this to your `settings.json`:

```json
{
  "tokenCounter.defaultProvider": "openai"
}
```

The extension will automatically reload and use the new provider when you change this setting.

## Usage

### Status Bar Token Counter

Simply open any file in VS Code, and the token count will automatically appear in the status bar on the right side.

### Selection Token Counter

Select any text in the editor, and the status bar will update to show both the total document token count and the selection token count.

### Language Model Tool

The extension registers a Language Model Tool that can be invoked by AI assistants to count tokens in arbitrary text. The tool is available at `vscode-tiktoken-extension.countTokens` and accepts a JSON input with a `text` field.

## Development

### Build

```bash
npm run compile
```

### Watch Mode

```bash
npm run watch
```

## Requirements

- VS Code version 1.85.0 or higher
- Node.js and npm

## License

See LICENSE file for details.

