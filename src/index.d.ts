import OpenAI, { ClientOptions } from 'openai';

declare module 'quickgpt' {
    export default class QuickGPT {
        public openai: OpenAI;
        private model: string;
        private format: boolean;

        constructor(clientOptions: ClientOptions);

        setModel(model: string): void;
        setFormat(format: boolean): void;
        setMaxToken(token: number): void;

        createSystemPrompt(mode: string): string;
        createCompletionBody(prompt: string): Object;
        requestGPT(prompt: string): Promise<string>;

        Ask(prompt: string): Promise<string>;
        JustAnswer(prompt: string): Promise<string>;

        ELI5(prompt: string): Promise<string>;
        Explain(prompt: string): Promise<string>;
        Summarize(prompt: string): Promise<string>;

        Evaluate(prompt: string): Promise<string>;

        TrueOrFalse(prompt: string): Promise<boolean>;
        YesOrNo(prompt: string): Promise<string>;
    }
}
