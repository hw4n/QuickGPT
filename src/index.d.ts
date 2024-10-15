import OpenAI, { ClientOptions } from 'openai';
import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/index.mjs';

declare module 'quickgpt' {
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
         * @private
         */
        private model: string;
        /**
         * Whether the response should be formatted with latex, markdown, or html.
         *
         * @type {boolean}
         * @default false
         * @private
         */
        private format: boolean;
        /**
         * The maximum token length for the response.
         *
         * @type {number}
         * @default 1000
         * @private
         */
        private max_tokens: number;

        /**
         * Creates an instance of QuickGPT.
         *
         * @param {ClientOptions} clientOptions
         * @throws {Error}
         * @constructor
         */
        constructor(clientOptions: ClientOptions);

        /**
         * Sets the model to use for the response.
         *
         * @param {string} model 'gpt-4' | 'gpt-4o' | 'gpt-4o-mini'
         * @returns {void}
         * @public
         */
        setModel(model: string): void;

        /**
         * Sets whether the response should be formatted with latex, markdown, or html.
         * @param format boolean
         * @returns {void}
         * @public
         */
        setFormat(format: boolean): void;

        /**
         * Sets the maximum token length for the response.
         *
         * @param {number} token
         * @returns {void}
         * @public
         */
        setMaxToken(token: number): void;

        /**
         * Creates a system prompt based on the mode and the private property 'format'.
         *
         * @param {string} mode
         * @returns {string}
         */
        createSystemPrompt(mode: string): string;
        /**
         * Creates a completion body for the OpenAI API.
         *
         * @param {string} prompt
         * @returns {ChatCompletionCreateParamsNonStreaming}
         */
        createCompletionBody(prompt: string): Object;
        /**
         * Requests a completion from the OpenAI API.
         *
         * @param {string} prompt
         * @param {string} mode
         * @returns {Promise<string>}
         * @throws {Error}
         */
        requestGPT(prompt: string, mode: string): Promise<string>;

        /**
         * Ask a question and get a response.
         *
         * @param {string} prompt
         * @returns {Promise<string>}
         * @public
         */
        Ask(prompt: string): Promise<string>;
        /**
         * Ask a question and just get an answer without any additional explanation.
         *
         * @param {string} prompt
         * @returns {Promise<string>}
         * @public
         */
        JustAnswer(prompt: string): Promise<string>;

        /**
         * Explain Like I'm 5.
         *
         * @param {string} prompt
         * @returns {Promise<string>}
         * @public
         */
        ELI5(prompt: string): Promise<string>;
        /**
         * Explain the user's prompt.
         *
         * @param {string} prompt
         * @returns {Promise<string>}
         * @public
         */
        Explain(prompt: string): Promise<string>;
        /**
         * Summarize the user's prompt.
         *
         * @param {string} prompt
         * @returns {Promise<string>}
         * @public
         */
        Summarize(prompt: string): Promise<string>;

        /**
         * Evaluate the user's prompt.
         *
         * @param {string} prompt
         * @returns {Promise<string>}
         * @public
         */
        Evaluate(prompt: string): Promise<string>;

        /**
         * Answer the user's prompt with True or False.
         *
         * @param {string} prompt
         * @returns {Promise<boolean>}
         * @public
         */
        TrueOrFalse(prompt: string): Promise<boolean>;
        /**
         * Answer the user's prompt with Yes or No, utilizing the TrueOrFalse method.
         *
         * @param {string} prompt
         * @returns {Promise<string>}
         * @public
         */
        YesOrNo(prompt: string): Promise<string>;
    }
}
