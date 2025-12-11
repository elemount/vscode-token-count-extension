# Architecture

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
│  │          Create Status Bar Item                 │     │
│  │          (Right-aligned, priority 100)          │     │
│  └────────────────────────────────────────────────┘     │
│                                                           │
│  ┌────────────────────────────────────────────────┐     │
│  │         Register Event Listeners:               │     │
│  │   • onDidChangeActiveTextEditor                 │     │
│  │   • onDidChangeTextDocument                     │     │
│  │   • onDidChangeTextEditorSelection              │     │
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
│  │  1. Get tiktoken encoder (GPT-4)                │     │
│  │  2. Encode text to tokens                       │     │
│  │  3. Free encoder resources                      │     │
│  │  4. Return token count                          │     │
│  └────────────────────────────────────────────────┘     │
│                                                           │
│  ┌────────────────────────────────────────────────┐     │
│  │      Register Language Model Tool               │     │
│  │                                                  │     │
│  │  Name: vscode-tiktoken-extension.countTokens    │     │
│  │  Input: { text: string }                        │     │
│  │  Output: LanguageModelToolResult                │     │
│  └────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘

                           │
                           ▼
                           
          ┌────────────────────────────┐
          │     tiktoken Library       │
          │   (GPT-4 encoding model)   │
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

## Language Model Tool Integration

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
│   tiktoken Library          │
│   encoding_for_model('gpt-4')|
└────────┬────────────────────┘
         │
         │ Return token count
         ▼
┌─────────────────────────────┐
│ LanguageModelToolResult     │
│ "The text contains X tokens"│
└─────────────────────────────┘
```

## Data Flow

1. **User Action** → Editor/Document/Selection Change
2. **Event Trigger** → VS Code fires event
3. **Event Handler** → `updateTokenCount()` called
4. **Token Counting** → `countTokens()` uses tiktoken
5. **UI Update** → Status bar text updated
6. **Display** → User sees token count in status bar

## Components

| Component | Responsibility |
|-----------|---------------|
| `extension.ts` | Main extension logic, activation, event handling |
| `countTokens()` | Token counting using tiktoken |
| `updateTokenCount()` | Update status bar with current counts |
| `statusBarItem` | VS Code UI element for displaying counts |
| `LanguageModelTool` | API for AI assistants to count tokens |

## Dependencies

- `vscode`: VS Code API (v1.85.0+)
- `tiktoken`: Token counting library (v1.0.15+)
- `@types/vscode`: TypeScript type definitions
- `typescript`: TypeScript compiler

## Performance Considerations

- Encoder is created and freed for each count operation (prevents memory leaks)
- Updates are triggered by VS Code events (efficient)
- No polling or timers (minimal CPU usage)
- Status bar item is hidden when no editor is active (clean UI)
