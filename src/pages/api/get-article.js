import { readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";

const remarkMdxFrontmatter = dynamic(() => import("remark-mdx-frontmatter"), {
  ssr: false
});
const remarkFrontmatter = dynamic(() => import("remark-frontmatter"), {
  ssr: false
});
const remarkGfm = dynamic(() => import("remark-gfm"), {
  ssr: false
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
  }

  const fileName = "/" + req.headers.referer.split("docs/")[1] + "/index.mdx";
  const articlesDirectory = path.join(process.cwd(), "src/pages/");

  const fileContents = readFileSync(articlesDirectory + fileName, "utf-8");
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        require("rehype-slug"),
        require("rehype-autolink-headings"),
        require("@mapbox/rehype-prism")
      ]
    }
  });

  res.status(200).json({ data, content: mdxSource });
}
