# Example File

This is an example file to demonstrate the token counter extension.

When you open this file in VS Code with the extension installed, you will see the token count in the status bar.

## Features

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

## Try it out!

Select this paragraph to see the selection token count update in real-time. The extension automatically updates whenever you change the selection, modify the document, or change the provider configuration.

This extension is useful for:
- Understanding token usage for different AI models
- Estimating costs for API calls
- Optimizing prompts and responses
- Staying within token limits for specific models

The Language Model Tool API integration allows AI assistants to count tokens programmatically using your configured provider.
