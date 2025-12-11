import * as vscode from 'vscode';
import { getTokenCounter, TokenProvider } from './tokenProviders';

let statusBarItem: vscode.StatusBarItem;
let currentProvider: TokenProvider = 'openai';

export function activate(context: vscode.ExtensionContext) {
    console.log('Tiktoken extension is now active');

    // Load configuration
    loadConfiguration();

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Listen for configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration('tokenCounter.defaultProvider')) {
                loadConfiguration();
                updateTokenCount();
            }
        })
    );

    // Update token count when active editor changes
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(() => {
            updateTokenCount();
        })
    );

    // Update token count when document changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(() => {
            updateTokenCount();
        })
    );

    // Update token count when selection changes
    context.subscriptions.push(
        vscode.window.onDidChangeTextEditorSelection(() => {
            updateTokenCount();
        })
    );

    // Register language model tool
    const tool: vscode.LanguageModelTool<{ text: string }> = {
        async invoke(options: vscode.LanguageModelToolInvocationOptions<{ text: string }>, _token: vscode.CancellationToken) {
            const text = options.input.text || '';
            const tokenCount = countTokens(text);
            return new vscode.LanguageModelToolResult([
                new vscode.LanguageModelTextPart(`The text contains ${tokenCount} tokens.`)
            ]);
        }
    };

    context.subscriptions.push(
        vscode.lm.registerTool('vscode-tiktoken-extension.countTokens', tool)
    );

    // Initial update
    updateTokenCount();
}

function loadConfiguration() {
    const config = vscode.workspace.getConfiguration('tokenCounter');
    currentProvider = config.get<TokenProvider>('defaultProvider', 'openai');
    console.log(`Using token provider: ${currentProvider}`);
}

function countTokens(text: string): number {
    const counter = getTokenCounter(currentProvider);
    return counter.countTokens(text);
}

function updateTokenCount() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        statusBarItem.hide();
        return;
    }

    const document = editor.document;
    const selection = editor.selection;

    // Count tokens for the entire document
    const documentText = document.getText();
    const documentTokenCount = countTokens(documentText);

    // Check if there's a text selection
    if (!selection.isEmpty) {
        const selectedText = document.getText(selection);
        const selectionTokenCount = countTokens(selectedText);
        statusBarItem.text = `token:${documentTokenCount} selection:${selectionTokenCount}`;
    } else {
        statusBarItem.text = `token:${documentTokenCount}`;
    }

    statusBarItem.show();
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}
