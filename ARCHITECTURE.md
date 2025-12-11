# Architecture

## Extension Overview

This extension is primarily designed as a **Language Model API tool** for AI assistants to programmatically count tokens. The status bar features serve as a secondary convenience for human developers.

## Extension Flow

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

## Status Bar Integration (Secondary Feature)

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

## Status Bar Display States (Secondary Feature)

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

### Primary: Language Model Tool Invocation
1. **AI Assistant** → Invokes tool with text parameter
2. **Tool Handler** → Receives invocation request
3. **Token Counting** → `countTokens()` uses tiktoken
4. **Response** → Returns LanguageModelToolResult
5. **AI Assistant** → Receives token count for processing

### Secondary: Status Bar Updates
1. **User Action** → Editor/Document/Selection Change
2. **Event Trigger** → VS Code fires event
3. **Event Handler** → `updateTokenCount()` called
4. **Token Counting** → `countTokens()` uses tiktoken
5. **UI Update** → Status bar text updated
6. **Display** → User sees token count in status bar

## Components

| Component | Responsibility | Priority |
|-----------|---------------|----------|
| `LanguageModelTool` | API for AI assistants to count tokens | **Primary** |
| `countTokens()` | Token counting using tiktoken | **Core** |
| `extension.ts` | Main extension logic, activation, event handling | Core |
| `updateTokenCount()` | Update status bar with current counts | Secondary |
| `statusBarItem` | VS Code UI element for displaying counts | Secondary |

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
