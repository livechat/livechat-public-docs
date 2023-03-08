import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (typeof req.body.prompt !== "string") {
    return res.status(400).json({ error: "Bad Request" });
  }

  const completion = await openai.createCompletion({
    model: req.body.model || "text-davinci-003",
    prompt: `Rephrase this for a second-grade student: ${req.body.prompt}`,
    max_tokens: 256,
    temperature: 0,
  });

  return res.status(200).json({ result: completion.data.choices[0].text });
}

export default handler;
