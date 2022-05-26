import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import dynamic from "next/dynamic";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import glob from "fast-glob";
import PageLayout from "../components/Page";
import {
  Headings,
  CodeBlocks,
  Scopes,
  Errors,
  Placeholder,
} from "../components/extensions";
import RichMessagePreview from "../vendors/rich-message-preview.min.js";
const OpenChatLink = dynamic(() =>
  import("../components/extensions").then((mod) => mod.OpenChatLink)
);
const Redoc = dynamic(() => import("../components/extensions/Redoc"));

const components = {
  ...CodeBlocks,
  ...Headings,
  Scopes,
  Errors,
  Placeholder,
  OpenChatLink,
  Redoc,
  RichMessagePreview,
};

export default function Page({ frontMatter, source }) {
  return (
    <PageLayout frontMatter={frontMatter}>
      <MDXRemote {...source} components={components} />
    </PageLayout>
  );
}

export const getStaticProps = async ({ params: { slug } }) => {
  const postSlug = slug.join("/");

  const POSTS_PATH = path.join(
    process.cwd(),
    "src/content/" + postSlug + "/index.mdx"
  );
  const source = fs.readFileSync(POSTS_PATH);

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
      frontMatter: { ...data, slug: postSlug },
    },
  };
};

export const getStaticPaths = async () => {
  const getFilePaths = (source) => {
    const contentGlob = `${source}/**/*.mdx`;
    const files = glob.sync(contentGlob);

    if (!files.length) return [];

    return files;
  };

  const POSTS_PATH = path.join(process.cwd(), "src/content");
  const posts = getFilePaths(POSTS_PATH);

  const paths = posts
    .filter((_, index) => index !== 0)
    .map((slug) => ({
      params: {
        slug: slug
          .replace(POSTS_PATH, "")
          .substring(1)
          .replace("/index.mdx", "")
          .split("/"),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};
