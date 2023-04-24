import NextCors from "nextjs-cors";
import { Configuration, OpenAIApi } from "openai";
import { RateLimiterMemory } from "rate-limiter-flexible";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);
const limiter = new RateLimiterMemory({
  points: 1,
  duration: 1,
});

async function handler(req, res) {
  await NextCors(req, res, {
    methods: "POST",
    origin: [
      process.env.NEXT_PUBLIC_DEVELOPERS_URL,
      process.env.NEXT_PUBLIC_PLATFORM_URL,
    ],
    optionsSuccessStatus: 200,
  });

  try {
    await limiter.consume(req.socket.remoteAddress);
  } catch {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again." });
  }

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
    model: "text-davinci-003",
    prompt: `Rephrase this for a second-grade student: ${prompt}`,
    max_tokens: 256,
    temperature: 0.7,
  });

  const result = completion.data.choices[0].text;
  if (result.length === 0) {
    return res
      .status(500)
      .json({ error: "Internal Server Error. Please try again." });
  }

  return res.status(200).json({ result });
}

export default handler;
