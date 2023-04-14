import { Configuration, OpenAIApi } from "openai";
export default async function handler(req, res) {
  const { userInput } = req.body;

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);

  const prompt = `You are a professional japanese businessman. I want you to convert my sentence to Keigo form or Japanese business form. Just write the converted sentences. Don't write explanation or any other things. My sentece is : {${userInput}}`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  res.status(200).json({ result: response.data.choices[0].message });
}
