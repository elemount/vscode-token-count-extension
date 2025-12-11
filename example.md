# Example File

This is an example file to demonstrate the tiktoken extension.

When you open this file in VS Code with the extension installed, you will see the token count in the status bar.

## Features

1. The status bar will show "token:X" where X is the number of tokens in this file
2. If you select some text, it will show "token:X selection:Y" where Y is the number of tokens in your selection
3. The extension uses the tiktoken library with the GPT-4 encoding

## Try it out!

Select this paragraph to see the selection token count update in real-time. The extension automatically updates whenever you change the selection or modify the document.

This extension is useful for:
- Understanding token usage for AI models
- Estimating costs for API calls
- Optimizing prompts and responses
- Staying within token limits

The Language Model Tool API integration allows AI assistants to count tokens programmatically.
