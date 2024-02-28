import { readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
  }

  const fileName = "/" + req.headers.referer.split("docs/")[1] + "/index.mdx";
  const articlesDirectory = path.join(process.cwd(), "src/pages/");

  const fileContents = readFileSync(articlesDirectory + fileName, "utf-8");
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  res.status(200).json({ data, content: mdxSource });
}
