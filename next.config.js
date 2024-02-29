const withPlugins = require("next-compose-plugins");
const withYaml = require("next-plugin-yaml");
const { default: dynamic } = require("next/dynamic");
const withMDX = require("@next/mdx");

const remarkMdxFrontmatter = dynamic(() => import("remark-mdx-frontmatter"), {
  ssr: false
});
const remarkFrontmatter = dynamic(() => import("remark-frontmatter"), {
  ssr: false
});
const remarkGfm = dynamic(() => import("remark-gfm"), {
  ssr: false
});

const nextConfig = {
  target: "serverless",
  basePath: process.env.CONTEXT === "deploy-preview" ? "" : "/docs",
  future: {
    webpack5: true,
    mdxRs: false
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    config.module.rules = config.module.rules.map(rootRule => {
      if (rootRule.oneOf) {
        rootRule.oneOf = rootRule.oneOf.map(rule => {
          if ((rule.loader ?? "").includes("babel-loader/lib/index.js")) {
            rule.use = [
              path.join(
                __dirname,
                "../library/loaders/remove-hashbag-loader.js"
              ),
              {
                loader: rule.loader,
                options: {
                  ...rule.options,
                  plugins: [
                    ...(rule.options.plugins ?? []),
                    "@babel/plugin-proposal-class-properties"
                  ]
                }
              }
            ];
            delete rule.loader;
            delete rule.options;
          }
          return rule;
        });
      }
      return rootRule;
    });

    return config;
  },
  compiler: {
    removeConsole: false
  }
};

module.exports = withPlugins(
  [
    [withYaml],
    [
      withMDX({
        extension: /\.mdx?$/,
        options: {
          remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
          rehypePlugins: [
            require("rehype-slug"),
            require("rehype-autolink-headings"),
            require("@mapbox/rehype-prism")
          ]
        }
      })
    ]
  ],
  nextConfig
);
