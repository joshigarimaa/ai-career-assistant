const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeResume(text) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Analyze this resume and give:
        1. Strengths
        2. Weaknesses
        3. Suggestions

        Resume:
        ${text}`,
      },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = { analyzeResume };
