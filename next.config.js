const withYaml = require("next-plugin-yaml");

module.exports = withYaml({
  basePath: process.env.CONTEXT === "deploy-preview" ? "" : "/docs",
});
