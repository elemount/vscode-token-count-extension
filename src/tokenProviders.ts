import { encoding_for_model } from 'tiktoken';
import { countTokens as countClaudeTokens } from '@anthropic-ai/tokenizer';

export type TokenProvider = 'openai' | 'claude' | 'gemini' | 'other';

export interface ITokenCounter {
    countTokens(text: string): number;
}

class TiktokenTokenCounter implements ITokenCounter {
    countTokens(text: string): number {
        try {
            const encoder = encoding_for_model('gpt-4');
            const tokens = encoder.encode(text);
            encoder.free();
            return tokens.length;
        } catch (error) {
            console.error('Error counting tokens with tiktoken provider:', error);
            return 0;
        }
    }
}

class ClaudeTokenCounter implements ITokenCounter {
    countTokens(text: string): number {
        try {
            return countClaudeTokens(text);
        } catch (error) {
            console.error('Error counting tokens with Claude provider:', error);
            return 0;
        }
    }
}

export function getTokenCounter(provider: TokenProvider): ITokenCounter {
    switch (provider) {
        case 'openai':
        case 'gemini':
        case 'other':
            return new TiktokenTokenCounter();
        case 'claude':
            return new ClaudeTokenCounter();
        default:
            return new TiktokenTokenCounter();
    }
}
