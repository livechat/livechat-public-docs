const path = require("path");
// const basePath = "";

const { createFilePath } = require("gatsby-source-filesystem");

// gatsby-node.js
exports.onCreateWebpackConfig = ({ actions, getConfig, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "content"),
        "node_modules",
      ],
      // react requires a single instance, this allows npm linking packages depending on react (by forcing local copy of react packages)
      alias: {
        react: require.resolve("react"),
        "react-dom": require.resolve("react-dom"),
      },
    },
  });

  // Workaround for redoc https://github.com/gatsbyjs/gatsby/issues/17136#issuecomment-568036690
  const config = getConfig();

  const coreJs2config = config.resolve.alias["core-js"];
  delete config.resolve.alias["core-js"];
  config.resolve.alias[`core-js/modules`] = `${coreJs2config}/modules`;
  try {
    config.resolve.alias[`core-js/es`] = path.dirname(
      require.resolve("core-js/es")
    );
  } catch (err) {}
  actions.replaceWebpackConfig(config);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: "slug",
      node,
      value,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              slug
            }
            parent {
              ... on File {
                modifiedTime(formatString: "MM/DD/YYYY")
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const pages = result.data.allMdx.edges;

  pages.forEach(({ node }, index) => {
    createPage({
      // prefer custom slug over generated
      path: node.frontmatter.slug || node.fields.slug,
      component: path.resolve(`./src/templates/page.js`),
      context: { id: node.id, modifiedTime: node.parent.modifiedTime },
    });
  });
};
