const withPlugins = require("next-compose-plugins");
const withMdxEnhanced = require("next-mdx-enhanced");
const withYaml = require("next-plugin-yaml");
const readingTime = require("reading-time");

const nextConfig = {
  target: "serverless",
  trailingSlash: true,
};

module.exports = withPlugins(
  [
    [
      withMdxEnhanced({
        layoutPath: "src/components/Page",
        defaultLayout: true,
        fileExtensions: ["mdx"],
        remarkPlugins: [
          [
            require("remark-prism"),
            {
              classPrefix: "language-",
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          ],
        ],
        rehypePlugins: [
          require("rehype-slug"),
          require("rehype-autolink-headings"),
        ],
        usesSrc: false,
        extendFrontMatter: {
          process: (mdxContent, frontMatter) => {
            const time = readingTime(mdxContent);
            if (time.minutes < 0.5) {
              time.minutes = 1;
            }
            return {
              timeToRead: time,
            };
          },
          phase: "both",
        },
        reExportDataFetching: false,
      }),
    ],
    [withYaml],
  ],
  nextConfig
);
