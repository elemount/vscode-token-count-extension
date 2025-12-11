# Example File

This extension is primarily designed as a **Language Model API tool** for AI assistants to programmatically count tokens in text.

## Primary Feature: Language Model Tool API

AI assistants can invoke the tool to count tokens:

**Tool Name:** `vscode-tiktoken-extension.countTokens`

**Example invocation:**
```json
{
  "text": "This is an example file to demonstrate the tiktoken extension."
}
```

**Response:** "The text contains 14 tokens."

### Use Cases for AI Assistants:
- Automatically check if text fits within token limits
- Optimize prompts based on token budgets
- Calculate API costs programmatically
- Manage context window sizes dynamically
- Enable token-aware text processing workflows

## Secondary Features: Visual Status Bar

When you open this file in VS Code with the extension installed, you will see the token count in the status bar.

### Status Bar Features

1. The status bar will show "token:X" where X is the number of tokens in this file
2. If you select some text, it will show "token:X selection:Y" where Y is the number of tokens in your selection
3. The extension uses the tiktoken library with the GPT-4 encoding

### Try it out!

Select this paragraph to see the selection token count update in real-time. The extension automatically updates whenever you change the selection or modify the document.

This extension is useful for:
- AI assistants managing token budgets (primary use)
- Understanding token usage for AI models
- Estimating costs for API calls
- Optimizing prompts and responses
- Staying within token limits

The Language Model Tool API integration is the core purpose of this extension.
