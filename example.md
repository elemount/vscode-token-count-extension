# Example File

This extension is primarily designed as a **Language Model API tool** for AI assistants to programmatically count tokens in text, with support for multiple token providers.

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
3. The extension supports multiple token providers: OpenAI (tiktoken), Claude, Gemini, and Other

## Configuring Token Providers

You can choose which token provider to use:

1. Open VS Code Settings (Ctrl/Cmd + ,)
2. Search for "Token Counter"
3. Select your preferred provider:
   - **OpenAI**: For GPT models (GPT-3.5, GPT-4, etc.)
   - **Claude**: For Anthropic Claude models
   - **Gemini**: For Google Gemini models (uses tiktoken fallback)
   - **Other**: For general use (uses tiktoken fallback)

The extension will automatically reload with the new provider.

### Try it out!

Select this paragraph to see the selection token count update in real-time. The extension automatically updates whenever you change the selection, modify the document, or change the provider configuration.

This extension is useful for:
- AI assistants managing token budgets (primary use)
- Understanding token usage for different AI models
- Estimating costs for API calls
- Optimizing prompts and responses
- Staying within token limits for specific models

The Language Model Tool API integration is the core purpose of this extension, and it uses your configured token provider for accurate counting across different AI model families.
