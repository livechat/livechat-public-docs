const withYaml = require("next-plugin-yaml");

module.exports = withYaml({
  basePath: "",
  trailingSlash: true,
});
