const withMdxEnhanced = require("next-mdx-enhanced");
const readingTime = require("reading-time");

module.exports = withMdxEnhanced({
  layoutPath: "src/components/Page",
  defaultLayout: true,
  fileExtensions: ["mdx"],
  remarkPlugins: [],
  rehypePlugins: [require("rehype-slug"), require("rehype-autolink-headings")],
  usesSrc: false,
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {
      return {
        timeToRead: readingTime(mdxContent),
      };
    },
    phase: "both",
  },
  reExportDataFetching: false,
})({
  target: "serverless",
});
