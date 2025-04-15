const QuickGPT = require('./dist/index').default;

(async () => {
    if (process.env.NODE_ENV === 'development') {
        const dotenv = await import('dotenv');
        dotenv.config();
    }
})().then(() => {
    const gpt = new QuickGPT();
    gpt.AskStreaming({ user_prompt: 'What is limit of a function?' }, (sp) => {
        console.log(sp);
    }).then(console.log);
});
