import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Page from "../components/Page";
import {
  Headings,
  CodeBlocks,
  Scopes,
  Errors,
  Placeholder,
} from "../components/extensions";

const components = {
  ...CodeBlocks,
  ...Headings,
  Scopes,
  Errors,
  Placeholder,
};

export default function Index({ frontMatter, source }) {
  return (
    <>
      <Page frontMatter={frontMatter}>
        <MDXRemote {...source} components={components} />
      </Page>
    </>
  );
}

export const getStaticProps = async () => {
  const POSTS_PATH = path.join(process.cwd(), "src/content");

  const postFilePath = path.join(POSTS_PATH, `index.mdx`);

  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        require("rehype-slug"),
        require("rehype-autolink-headings"),
        require("@mapbox/rehype-prism"),
      ],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};
