import OpenAI, { ClientOptions } from 'openai';

export default class QuickGPT {
    /**
     * The OpenAI client instance.
     *
     * @type {OpenAI}
     * @public
     */
    public openai: OpenAI;
    /**
     * The model to use for the response.
     *
     * @type {string}
     * @default 'gpt-4o'
     * @public
     */
    public model: string = 'gpt-4o';
    /**
     * Whether the response should be formatted with latex, markdown, or html.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    public format: boolean = false;
    /**
     * The maximum token length for the response.
     *
     * @type {number}
     * @default 1000
     * @public
     */
    public max_tokens: number = 1000;

    /**
     * Creates an instance of QuickGPT.
     *
     * @param {ClientOptions} clientOptions
     * @throws {Error}
     * @constructor
     */
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

    /**
     * Sets the model to use for the response.
     *
     * @param {string} model 'gpt-4' | 'gpt-4o' | 'gpt-4o-mini'
     * @returns {void}
     * @public
     */
    setModel(model: 'gpt-4' | 'gpt-4o' | 'gpt-4o-mini'): void {
        this.model = model;
    }

    /**
     * Sets whether the response should be formatted with latex, markdown, or html.
     * @param format boolean
     * @returns {void}
     * @public
     */
    setFormat(format: boolean): void {
        this.format = format;
    }

    /**
     * Sets the maximum token length for the response.
     *
     * @param {number} token
     * @returns {void}
     * @public
     */
    setMaxToken(token: number): void {
        this.max_tokens = token;
    }

    /**
     * Creates a system prompt based on the mode and the private property 'format'.
     *
     * @param {string} mode
     * @returns {string}
     */
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

    /**
     * Creates a completion body for the OpenAI API.
     *
     * @param {string} prompt
     * @returns {ChatCompletionCreateParamsNonStreaming}
     */
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

    /**
     * Requests a completion from the OpenAI API.
     *
     * @param {string} prompt
     * @param {string} mode
     * @returns {Promise<string>}
     * @throws {Error}
     */
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

    /**
     * Ask a question and get a response.
     *
     * @param {string} prompt
     * @returns {Promise<string>}
     * @public
     */
    async Ask(prompt: string): Promise<string> {
        return this.requestGPT(prompt, 'ask');
    }

    /**
     * Ask a question and just get an answer without any additional explanation.
     *
     * @param {string} prompt
     * @returns {Promise<string>}
     * @public
     */
    async JustAnswer(prompt: string): Promise<string> {
        return this.requestGPT(prompt, 'justanswer');
    }

    /**
     * Explain Like I'm 5.
     *
     * @param {string} prompt
     * @returns {Promise<string>}
     * @public
     */
    async ELI5(prompt: string): Promise<string> {
        return this.requestGPT(prompt, 'eli5');
    }

    /**
     * Explain the user's prompt.
     *
     * @param {string} prompt
     * @returns {Promise<string>}
     * @public
     */
    async Explain(prompt: string): Promise<string> {
        return this.requestGPT(prompt, 'explain');
    }

    /**
     * Summarize the user's prompt.
     *
     * @param {string} prompt
     * @returns {Promise<string>}
     * @public
     */
    async Summarize(prompt: string): Promise<string> {
        return this.requestGPT(prompt, 'summarize');
    }

    /**
     * Evaluate the user's prompt.
     *
     * @param {string} prompt
     * @returns {Promise<string>}
     * @public
     */
    async Evaluate(prompt: string): Promise<string> {
        return this.requestGPT(prompt, 'evaluate');
    }

    /**
     * Answer the user's prompt with True or False.
     *
     * @param {string} prompt
     * @returns {Promise<boolean>}
     * @public
     */
    async TrueOrFalse(prompt: string): Promise<boolean> {
        const response = await this.requestGPT(prompt, 'trueorfalse');
        return true ? response.toLowerCase().includes('true') : false;
    }

    /**
     * Answer the user's prompt with Yes or No, utilizing the TrueOrFalse method.
     *
     * @param {string} prompt
     * @returns {Promise<string>}
     * @public
     */
    async YesOrNo(prompt: string): Promise<string> {
        return (await this.TrueOrFalse(prompt)) ? 'Yes' : 'No';
    }
}
