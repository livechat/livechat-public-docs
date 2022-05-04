import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

export default function Index({ frontMatter, source }) {
  console.log("frontMatter", frontMatter);
  console.log("source", source);
  return (
    <>
      {/*<Page>test</Page>*/}
      test
    </>
  );
}

export const getStaticProps = async () => {
  const POSTS_PATH = path.join(process.cwd(), "src/data");

  const postFilePath = path.join(POSTS_PATH, `index.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
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
