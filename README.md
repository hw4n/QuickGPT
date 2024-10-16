# QuickGPT

**QuickGPT** is an incredibly easy-to-use wrapper for the OpenAI API. It's designed to simplify your interaction with OpenAI's powerful models, so you can focus on asking questions and getting answers without worrying about the complexity of the official API.

## Why QuickGPT?

QuickGPT is designed to make interacting with OpenAI's API incredibly easy while offering essential customization options. You can quickly set the most commonly used configurations, such as model, format, and maximum tokens, using `setModel()`, `setFormat()`, and `setMaxToken()`, ensuring a hassle-free experience without the need to configure every request manually.

It also features unique functions such as **JustAnswer**, **ELI5**, **TrueOrFalse**, and **YesOrNo**. These allow you to receive direct answers, concise explanations, straightforward true/false evaluations, or quick yes/no decisions, making them especially beneficial for programming and decision-making tasks.

In short, QuickGPT streamlines OpenAI API usage, giving you both power and simplicity, so you can focus on getting the answers you need.

## Installation

Install QuickGPT via npm:

```bash
npm install quickgpt
```

## Usage

To get started with QuickGPT, you'll need to either:

Set your OpenAI API key as an environment variable, or use a package like dotenv.

```bash
(unix/linux)
export OPENAI_API_KEY=your-api-key

(if you use .env)
OPENAI_API_KEY=your-api-key
```

Or pass the API key directly when initializing QuickGPT.

```js
import QuickGPT from 'quickgpt';

const gpt = new QuickGPT({ apiKey: 'your-api-key' });
```

## Basic Configuration

To get started with QuickGPT, you'll need to configure some basic settings. You can use the following methods to set up your preferences.

```typescript
setModel(model: string): void;
setFormat(format: boolean): void;
setMaxToken(token: number): void;
```

### Default Values:

-   **model**: `'gpt-4o'`
-   **format**: `false`
-   **maxToken**: `1000`

### Details:

-   **Model Options**: Choose one from `'gpt-4' | 'gpt-4o' | 'gpt-4o-mini'`
    -   This library includes only three options, as most users will likely choose one of these. Feel free to submit request if needed!
-   **Format**: Specify whether to use LaTeX, Markdown, or HTML.
-   **Max Tokens**: Represents the maximum number of tokens to use in the response.

## Example

```javascript
// Import the QuickGPT class
import QuickGPT from 'quickgpt';

// If you've already set the OPENAI_API_KEY as an environment variable:
const gpt = new QuickGPT();
// Alternatively, you can pass the API key directly:
const gpt = new QuickGPT({
    apiKey: process.env.OPENAI_API_KEY || 'your-api-key',
});

// Use any method of your choice to get a response
const response = await gpt.JustAnswer('limit of 1/x as x approaches infinity');
console.log(response);
// -> As x gets bigger and bigger, 1 divided by x gets smaller and smaller. So, the limit of 1/x as x approaches infinity is 0.

// You can handle as a promise too
await gpt.Explain('limit of 1/x as x approaches infinity').then(console.log);
// -> The limit of 1/x as x approaches infinity is 0. As the value of x becomes larger and larger, the value of 1/x becomes smaller and closer to 0. This is because you are dividing 1 by an increasingly large number, which reduces the overall value towards zero.

await gpt.ELI5('limit of 1/x as x approaches infinity').then(console.log);
// -> As x gets bigger and bigger, like when you count up to really large numbers, the fraction 1/x becomes a smaller and smaller piece because you're dividing 1 by a bigger number each time. It's like if you have one cookie and you share it with more and more friends, each friend gets a tinier and tinier piece. So, as x goes to infinity, 1/x gets closer and closer to 0. That's the limit!

// from now on, lets enable formats like latex, markdown, html
gpt.setFormat(true);

await gpt.JustAnswer('limit of 1/x as x approaches infinity').then(console.log);
// // -> As \( x \) gets really, really big, like infinity, \(\frac{1}{x}\) gets really, really small, like zero. So, the limit of \(\frac{1}{x}\) as \( x \) goes to infinity is 0.

// finally, if you want to directly use the official OpenAI API
const openai = gpt.openai;
```

## Easy Contribution

If you have ideas for new features, feel free to contribute! The project is designed so anyone can easily add functionality through merge requests.

### Developing the library

To make changes to the library, please follow these steps:

1. **Clone the Repository**  
   Start by cloning the repository to your local machine using the following command:

    ```bash
    git clone https://github.com/hw4n/quickgpt
    ```

2. **Install Dependencies**  
   Navigate to the cloned directory and ensure you have all the necessary dependencies and development dependencies installed by running the following command:

    ```bash
    npm install
    ```

3. **Development Build and Testing**  
   During development, you can use the following command to watch for changes and rebuild automatically:

    ```bash
     npm run start:dev
    ```

    This command will build the project and execute the `src/test.ts` file. After building, the corresponding JavaScript file `(build/test.js)` will be generated and executed. This is useful for testing the changes you've made to the library.
