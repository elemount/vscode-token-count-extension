# Architecture

## Extension Overview

This extension is primarily designed as a **Language Model API tool** for AI assistants to programmatically count tokens, with support for multiple token providers (OpenAI, Claude, Gemini, and others). The status bar features serve as a secondary convenience for human developers.

## Language Model Tool Integration (Primary Feature)

```
┌──────────────────┐
│  AI Assistant    │
│  (e.g., Copilot) │
└────────┬─────────┘
         │
         │ Invoke Tool
         │ { text: "..." }
         ▼
┌─────────────────────────────┐
│ vscode-tiktoken-extension   │
│      .countTokens           │
└────────┬────────────────────┘
         │
         │ countTokens(text)
         ▼
┌─────────────────────────────┐
│  Token Provider Factory     │
│  getTokenCounter(provider)  │
└────────┬────────────────────┘
         │
         ├──────┬──────┬──────┐
         │      │      │      │
         ▼      ▼      ▼      ▼
    OpenAI  Claude Gemini Other
   (tiktoken) (@anthropic) (fallback)
         │      │      │      │
         └──────┴──────┴──────┘
         │
         │ Return token count
         ▼
┌─────────────────────────────┐
│ LanguageModelToolResult     │
│ "The text contains X tokens"│
└─────────────────────────────┘
```

## Status Bar Integration (Secondary Feature)

## Extension Flow

```
┌─────────────────────────────────────────────────────────┐
│                    VS Code Extension                     │
│                                                           │
│  ┌────────────────────────────────────────────────┐     │
│  │           activation (onStartupFinished)        │     │
│  └──────────────────┬──────────────────────────────┘     │
│                     │                                     │
│                     ▼                                     │
│  ┌────────────────────────────────────────────────┐     │
│  │          Load Configuration                     │     │
│  │          (tokenCounter.defaultProvider)         │     │
│  └──────────────────┬──────────────────────────────┘     │
│                     │                                     │
│                     ▼                                     │
│  ┌────────────────────────────────────────────────┐     │
│  │          Create Status Bar Item                 │     │
│  │          (Right-aligned, priority 100)          │     │
│  └────────────────────────────────────────────────┘     │
│                                                           │
│  ┌────────────────────────────────────────────────┐     │
│  │         Register Event Listeners:               │     │
│  │   • onDidChangeActiveTextEditor                 │     │
│  │   • onDidChangeTextDocument                     │     │
│  │   • onDidChangeTextEditorSelection              │     │
│  │   • onDidChangeConfiguration                    │     │
│  └──────────────────┬──────────────────────────────┘     │
│                     │                                     │
│                     ▼                                     │
│  ┌────────────────────────────────────────────────┐     │
│  │         updateTokenCount() Function             │     │
│  │                                                  │     │
│  │  1. Get active editor                           │     │
│  │  2. Get document text                           │     │
│  │  3. Count document tokens                       │     │
│  │  4. Check if selection exists                   │     │
│  │  5. If yes, count selection tokens              │     │
│  │  6. Update status bar text                      │     │
│  └──────────────────┬──────────────────────────────┘     │
│                     │                                     │
│                     ▼                                     │
│  ┌────────────────────────────────────────────────┐     │
│  │         countTokens(text) Function              │     │
│  │                                                  │     │
│  │  1. Get token counter for current provider      │     │
│  │  2. Delegate to provider implementation         │     │
│  │  3. Return token count                          │     │
│  └──────────────────┬──────────────────────────────┘     │
│                     │                                     │
│                     ▼                                     │
│  ┌────────────────────────────────────────────────┐     │
│  │      Token Provider Abstraction Layer           │     │
│  │                                                  │     │
│  │  • TiktokenTokenCounter (tiktoken, GPT-4)       │     │
│  │    - Used for OpenAI, Gemini, Other providers   │     │
│  │  • ClaudeTokenCounter (@anthropic-ai/tokenizer) │     │
│  │    - Used for Claude provider                   │     │
│  └────────────────────────────────────────────────┘     │
│                                                           │
│  ┌────────────────────────────────────────────────┐     │
│  │      Register Language Model Tool               │     │
│  │                                                  │     │
│  │  Name: vscode-tiktoken-extension.countTokens    │     │
│  │  Input: { text: string }                        │     │
│  │  Output: LanguageModelToolResult                │     │
│  │  Uses configured provider                       │     │
│  └────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘

                           │
                           ▼
                           
          ┌────────────────────────────┐
          │   Token Provider Libraries │
          │   • tiktoken               │
          │   • @anthropic-ai/tokenizer│
          └────────────────────────────┘
```

## Status Bar Display States

### State 1: No Selection
```
Status Bar: [... other items ...] [token:195]
```

### State 2: With Selection
```
Status Bar: [... other items ...] [token:195 selection:14]
```

### State 3: No Active Editor
```
Status Bar: [... other items ...] [status bar item hidden]
```

## Data Flow

1. **User Action** → Editor/Document/Selection Change or Configuration Change
2. **Event Trigger** → VS Code fires event
3. **Event Handler** → `updateTokenCount()` or `loadConfiguration()` called
4. **Token Counting** → `countTokens()` delegates to selected provider
5. **UI Update** → Status bar text updated
6. **Display** → User sees token count in status bar

## Components

| Component | Responsibility |
|-----------|---------------|
| `extension.ts` | Main extension logic, activation, event handling |
| `tokenProviders.ts` | Token provider abstraction and implementations |
| `loadConfiguration()` | Load and update provider configuration |
| `countTokens()` | Token counting using configured provider |
| `getTokenCounter()` | Factory function to get provider instance |
| `TiktokenTokenCounter` | Shared token counter for OpenAI/Gemini/Other using tiktoken |
| `ClaudeTokenCounter` | Claude token counter using @anthropic-ai/tokenizer |
| `updateTokenCount()` | Update status bar with current counts |
| `statusBarItem` | VS Code UI element for displaying counts |
| `LanguageModelTool` | API for AI assistants to count tokens |

## Dependencies

- `vscode`: VS Code API (v1.85.0+)
- `tiktoken`: OpenAI token counting library (v1.0.15+)
- `@anthropic-ai/tokenizer`: Claude token counting library (v0.0.4+)
- `@types/vscode`: TypeScript type definitions
- `typescript`: TypeScript compiler

## Performance Considerations

- Encoder is created and freed for each count operation (prevents memory leaks)
- Updates are triggered by VS Code events (efficient)
- No polling or timers (minimal CPU usage)
- Status bar item is hidden when no editor is active (clean UI)
- Configuration changes applied immediately without restart
