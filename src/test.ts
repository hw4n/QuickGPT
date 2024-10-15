import QuickGPT from './index.js';

await (async () => {
    if (process.env.NODE_ENV === 'development') {
        const dotenv = await import('dotenv');
        dotenv.config();
    }
})();

const gpt = new QuickGPT();
await gpt.ELI5('What is limit of a function?').then(console.log);
