# vscode-tiktoken-extension

A VS Code extension that provides a Language Model API tool for counting tokens in text using the tiktoken library. Primarily designed for AI assistants and language models to programmatically determine token counts.

## Features

1. **Language Model Tool API**: Exposes a tool for counting tokens that can be used by AI assistants
   - Tool name: `vscode-tiktoken-extension.countTokens`
   - Accepts a `text` parameter and returns the token count
   - Primary feature for integration with AI assistants like GitHub Copilot

2. **Status Bar Token Counter**: Shows the total token count for the current file in the VS Code status bar
   - Displays as `token:num` (e.g., `token:150`)
   - Convenience feature for developers
   
3. **Selection Token Counter**: When text is selected, shows an additional count for the selected text
   - Displays as `token:num selection:num` (e.g., `token:150 selection:25`)
   - Helps with quick visual reference

## Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run compile` to compile the extension
4. Press F5 in VS Code to launch the extension in a new Extension Development Host window

## Usage

### Language Model Tool (Primary Use)

The extension registers a Language Model Tool that can be invoked by AI assistants to count tokens in arbitrary text. The tool is available at `vscode-tiktoken-extension.countTokens` and accepts a JSON input with a `text` field.

**Tool Name:** `vscode-tiktoken-extension.countTokens`

**Input Schema:**
```json
{
  "text": "Your text here"
}
```

**Output:** A message indicating the token count, e.g., "The text contains 42 tokens."

This is the primary interface for AI assistants to programmatically determine token counts for prompts, responses, and other text processing tasks.

### Status Bar Token Counter

Simply open any file in VS Code, and the token count will automatically appear in the status bar on the right side as a convenience feature.

### Selection Token Counter

Select any text in the editor, and the status bar will update to show both the total document token count and the selection token count.

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

