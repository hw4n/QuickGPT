import QuickGPT from './index.js';

await (async () => {
    if (process.env.NODE_ENV === 'development') {
        const dotenv = await import('dotenv');
        dotenv.config();
    }
})();

const gpt = new QuickGPT();

console.log('------------');

// You can handle as promise too
await gpt.ELI5('limit of 1/x as x approaches infinity').then(console.log);
