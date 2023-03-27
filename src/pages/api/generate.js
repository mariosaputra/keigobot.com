import { Configuration, OpenAIApi } from "openai";
export default async function handler(req, res) {
  const { userInput } = req.body;

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);

  const prompt = `I want you to act as an Japanese teacher. I will speak to you in any language, and you will change it to Keigo form. Make it natural and keep the meaning same. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My sentence is {${userInput}}`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  res.status(200).json({ result: response.data.choices[0].message });
}
