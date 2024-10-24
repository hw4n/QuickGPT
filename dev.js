const QuickGPT = require('./dist/index').default;

(async () => {
    if (process.env.NODE_ENV === 'development') {
        const dotenv = await import('dotenv');
        dotenv.config();
    }
})().then(() => {
    const gpt = new QuickGPT();
    gpt.ELI5('What is limit of a function?').then(console.log);
});
