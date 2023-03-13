import { Configuration, OpenAIApi } from "openai";
import NextCors from "nextjs-cors";
import withBearerAuth from "api/withBearerAuth";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

async function handler(req, res) {
  await NextCors(req, res, {
    methods: "POST",
    origin: process.env.NEXT_PUBLIC_DEVELOPERS_URL,
    optionsSuccessStatus: 200,
  });

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const prompt = req.body.prompt;
  if (
    typeof prompt !== "string" ||
    prompt.length === 0 ||
    prompt.length > 1000
  ) {
    return res.status(400).json({ error: "Bad Request" });
  }

  const completion = await openai.createCompletion({
    model: req.body.model || "text-davinci-003",
    prompt: `Rephrase this for a second-grade student: ${prompt}`,
    max_tokens: 256,
    temperature: 0.7,
  });

  const result = completion.data.choices[0].text;
  if (result.length === 0) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  return res.status(200).json({ result });
}

export default withBearerAuth(handler);
