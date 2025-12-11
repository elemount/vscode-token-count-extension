# VS Code Token Counter Extension - Features

## 🎯 Core Features

### 1. Language Model Tool API (Primary Feature)

AI assistants can programmatically count tokens using the exposed tool. This is the primary purpose of the extension.

**Tool Name:**
```
vscode-tiktoken-extension.countTokens
```

**Input:**
```json
{
  "text": "Your text here"
}
```

**Output:**
```
The text contains 4 tokens.
```

**Purpose:**
- Enables AI assistants to determine token counts for prompts and responses
- Essential for managing token budgets in language model interactions
- Allows automated token-aware text processing
- Integrates seamlessly with VS Code's Language Model API
- Uses your configured token provider for accurate counting

### 2. Multiple Token Provider Support

Choose from different token counting providers based on the AI model you're working with.

**Available Providers:**
- **OpenAI (GPT)**: Uses tiktoken library for accurate GPT-4 tokenization
- **Claude (Anthropic)**: Uses official @anthropic-ai/tokenizer for Claude models
- **Gemini**: Falls back to tiktoken (provides reasonable estimation)
- **Other**: Falls back to tiktoken for general-purpose use

**Configuration:**
Set your preferred provider in VS Code settings:
```json
{
  "tokenCounter.defaultProvider": "openai"  // or "claude", "gemini", "other"
}
```

The extension automatically reloads when you change providers, no restart needed.

### 3. Real-time Token Counting in Status Bar

The extension displays the token count for the currently active file in the VS Code status bar as a convenience feature for developers.

**Display Format:**
```
token:195
```

**When it updates:**
- Opening a file
- Switching between files
- Editing the file content
- Saving the file
- Changing token provider configuration

### 4. Selection Token Counter

When you select text, the status bar shows both the document token count and the selection token count.

**Display Format:**
```
token:195 selection:14
```

**Example scenario:**
1. Open a file with 1000 tokens
2. Select a paragraph with 50 tokens
3. Status bar shows: `token:1000 selection:50`

## 🔧 Technical Specifications

### Tokenization Models
- **OpenAI Provider**: tiktoken v1.0.15 with GPT-4 encoding
- **Claude Provider**: @anthropic-ai/tokenizer v0.0.4 (official Anthropic library)
- **Gemini/Other**: tiktoken v1.0.15 with GPT-4 encoding (fallback)

### Accuracy
- **OpenAI/GPT**: Exact match with OpenAI's tokenization
- **Claude**: Exact match with Anthropic's tokenization
- **Gemini/Other**: Approximate (tiktoken provides good general estimation)

### Performance
- **Memory Usage**: Minimal (~6KB compiled)
- **CPU Impact**: Event-driven, no polling
- **Startup Time**: Fast (onStartupFinished)

### Compatibility
- **VS Code Version**: 1.85.0 or higher
- **Platforms**: All (Windows, macOS, Linux)
- **Languages**: All file types supported

## 📊 Example Token Counts

| Text | Tokens | Notes |
|------|--------|-------|
| "" | 0 | Empty string |
| "Hello, world!" | 4 | Simple greeting |
| "This is a test." | 5 | Short sentence |
| Single letter "a" | 1 | Single character |
| Numbers "12345" | 3 | Multi-digit number |
| Code: `function() {}` | 5 | JavaScript function |
| Emoji "😀" | 1-2 | Depends on encoding |

## 🎨 User Interface

### Status Bar Integration
```
┌─────────────────────────────────────────────────────────────────┐
│ VS Code Status Bar                                               │
├─────────────────────────────────────────────────────────────────┤
│ [Branch] [Errors] [Warnings] ... [token:195 selection:14] [Ln:5]│
└─────────────────────────────────────────────────────────────────┘
                                     ↑
                                     Our extension displays here
```

### States

#### State A: File Open, No Selection
```
Status: token:195
```

#### State B: File Open, Text Selected
```
Status: token:195 selection:14
```

#### State C: No Active Editor
```
Status: [hidden]
```

## 🔌 Language Model Tool Usage

### From Chat Participants

AI assistants can use the tool to help users understand token usage:

**User**: "How many tokens is this text?"
**Assistant**: *invokes tool* "The text contains 42 tokens."

### Programmatic Usage

```typescript
const result = await vscode.lm.invokeTool(
    'vscode-tiktoken-extension.countTokens',
    { text: 'Hello, world!' },
    undefined
);
// Result: "The text contains 4 tokens."
```

## 💡 Use Cases

### 1. API Cost Estimation
Know exactly how many tokens your prompts/responses will use before sending to OpenAI, Anthropic, or other providers.

### 2. Token Limit Management
Stay within model token limits (e.g., 8K, 32K, 128K).

### 3. Prompt Engineering
Optimize prompts by understanding their token cost across different providers.

### 4. Document Analysis
Quickly see the token size of documentation or code files.

### 5. Selection Optimization
Select and refine specific sections while monitoring token count.

### 6. AI Assistant Integration
Primary use case: Enable AI assistants to make token-aware decisions programmatically.

## 🚀 Quick Start

1. **Install**: Clone repo, run `npm install && npm run compile`
2. **Configure**: Set your preferred provider in VS Code settings
3. **Launch**: Press F5 in VS Code
4. **Use**: Open any file, see token count in status bar
5. **Select**: Highlight text to see selection count

## 📈 Benefits

- ✅ **Accurate**: Uses official tokenizers for OpenAI and Claude
- ✅ **Real-time**: Updates instantly on changes
- ✅ **Lightweight**: Minimal resource usage
- ✅ **Integrated**: Native VS Code status bar
- ✅ **Accessible**: Language Model Tool API for AI
- ✅ **Flexible**: Multiple provider support
- ✅ **Simple**: No complex configuration needed

## 🎓 Learning Resources

### Understanding Tokens
- Tokens are pieces of text (words, parts of words, punctuation)
- Different models use different tokenization schemes
- Token count affects API costs and model limits
- Providers have different tokenization strategies

### Why This Matters
- OpenAI and Anthropic charge per token, not per character
- Models have maximum token limits
- Efficient prompts use fewer tokens
- Understanding tokenization improves AI interactions
- Different providers may count differently

## 🔐 Security

- ✅ No external API calls (local processing only)
- ✅ No data collection or telemetry
- ✅ No network access required
- ✅ CodeQL scan: 0 vulnerabilities
- ✅ Dependency scan: No known vulnerabilities

## 📝 Support

For issues, questions, or feature requests:
- GitHub Issues: https://github.com/elemount/vscode-tiktoken-extension/issues
- Documentation: See README.md
- Examples: See example.md

---

**Made with ❤️ using tiktoken, @anthropic-ai/tokenizer, and VS Code Extension API**
