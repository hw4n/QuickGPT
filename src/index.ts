import OpenAI, { ClientOptions } from 'openai';

export default class QuickGPT {
    public openai: OpenAI;
    private model: string = 'gpt-4o';
    private format: boolean = false;
    private max_tokens: number = 1000;

    constructor(clientOptions?: ClientOptions) {
        if (
            process.env.OPENAI_API_KEY === undefined &&
            (clientOptions === undefined || clientOptions.apiKey === undefined)
        ) {
            throw new Error(
                '\x1b[31mAPI Key is required. Set OPENAI_API_KEY in your environment variables. Or pass it as an argument like the following: new QuickGPT({ apiKey: "your-api-key" })\x1b[0m',
            );
        }
        this.openai = new OpenAI(clientOptions);
    }

    setModel(model: 'gpt-4' | 'gpt-4o' | 'gpt-4o-mini'): void {
        this.model = model;
    }

    setFormat(format: boolean): void {
        this.format = format;
    }

    setMaxToken(token: number): void {
        this.max_tokens = token;
    }

    createSystemPrompt(mode: string): string {
        let systemPrompt = `You are designed to provide one-time responses. Always give a clear conclusion and avoid answering with questions.`;

        if (!this.format) {
            systemPrompt += `Do not use any formatting such as LaTeX, Markdown, or HTML. `;
        }

        // keep the string uncapitalized
        switch (mode) {
            case 'ask':
                systemPrompt += `Answer the user's question. `;
                break;
            case 'justanswer':
                systemPrompt += `Answer the user's prompt, without any additional explanation. `;
            case 'eli5':
                systemPrompt += `Explain Like I'm 5. `;
                break;
            case 'explain':
                systemPrompt += `Explain the user's prompt. `;
                break;
            case 'summarize':
                systemPrompt += `Summarize the user's prompt. `;
                break;
            case 'evaluate':
                systemPrompt += `Evaluate the user's prompt. `;
                break;
            case 'trueorfalse':
            case 'yesorno':
                systemPrompt += `Answer the user's prompt with True or False. No matter the prompt, always respond with a True or False answer. `;
                break;
        }

        systemPrompt += `Respond in the language of the user's prompt, or as specified by the user: `;

        return systemPrompt;
    }

    createCompletionBody(
        prompt: string,
        mode: string,
    ): OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming {
        return {
            model: this.model,
            max_tokens: this.max_tokens,
            messages: [
                {
                    role: 'system',
                    content: this.createSystemPrompt(mode),
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        };
    }

    async requestGPT(prompt: string, mode: string): Promise<string> {
        const completionBody = this.createCompletionBody(prompt, mode);
        try {
            const chatCompletion = await this.openai.chat.completions.create(
                completionBody,
            );
            if (!chatCompletion.choices[0].message.content) {
                throw new Error('No response from the model');
            }
            return chatCompletion.choices[0].message.content;
        } catch (error) {
            throw error;
        }
    }

    async Ask(prompt: string): Promise<string> {
        return this.requestGPT(prompt, 'ask');
    }

    async JustAnswer(prompt: string): Promise<string> {
        return this.requestGPT(prompt, 'justanswer');
    }

    async ELI5(prompt: string): Promise<string> {
        return this.requestGPT(prompt, 'eli5');
    }

    async Explain(prompt: string): Promise<string> {
        return this.requestGPT(prompt, 'explain');
    }

    async Summarize(prompt: string): Promise<string> {
        return this.requestGPT(prompt, 'summarize');
    }

    async Evaluate(prompt: string): Promise<string> {
        return this.requestGPT(prompt, 'evaluate');
    }

    async TrueOrFalse(prompt: string): Promise<boolean> {
        const response = await this.requestGPT(prompt, 'trueorfalse');
        return true ? response.toLowerCase().includes('true') : false;
    }

    async YesOrNo(prompt: string): Promise<string> {
        return (await this.TrueOrFalse(prompt)) ? 'Yes' : 'No';
    }
}
