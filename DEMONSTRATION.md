# VS Code Tiktoken Extension - Demonstration

## Overview

This demonstration shows how the VS Code Tiktoken Extension works.

## Features Demonstrated

### 1. Status Bar Token Counter

When you open any file in VS Code with this extension installed, you will see a token count displayed in the status bar (bottom-right corner).

**Example:**
```
token:195
```

This shows that the current file contains 195 tokens (using GPT-4 tiktoken encoding).

### 2. Selection Token Counter

When you select text, the status bar updates to show both:
- The total document token count
- The selected text token count

**Example:**
```
token:195 selection:14
```

This shows:
- Total document: 195 tokens
- Current selection: 14 tokens

### 3. Language Model Tool API

The extension exposes a Language Model Tool that AI assistants can invoke:

**Tool Name:** `vscode-tiktoken-extension.countTokens`

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "description": "The text to count tokens for"
    }
  },
  "required": ["text"]
}
```

**Example Usage:**
An AI assistant can invoke this tool to count tokens in any text:

```json
{
  "text": "Hello, world! How many tokens is this?"
}
```

**Response:**
```
The text contains 10 tokens.
```

## Installation & Testing

1. Clone the repository
2. Run `npm install`
3. Run `npm run compile`
4. Press F5 in VS Code to launch the Extension Development Host
5. Open any file to see the token count
6. Select text to see the selection count

## Technical Details

- Uses `tiktoken` library with GPT-4 encoding model
- Automatically updates on:
  - Active editor changes
  - Document text changes
  - Selection changes
- Properly disposes resources on deactivation
- Follows VS Code extension best practices

## Token Counting Examples

| Text | Token Count |
|------|-------------|
| "Hello, world!" | 4 |
| "This is a test." | 5 |
| Empty string | 0 |

The extension uses the same tokenization as GPT-4, making it accurate for estimating API usage and costs.
