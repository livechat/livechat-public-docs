const React = require("react");
const { renderToString } = require("react-dom/server");
const redoc = require("redoc");
const styledComponents = require("styled-components");
const fs = require("fs");
const configs = require("../src/configs/redoc/configs");

async function generateRedocHtml(name) {
  const tmpDir = "./tmp";
  console.log(`Generating ${tmpDir}/redoc-${name}.html ...`);
  console.log(`Path directory ${process.cwd()}`);
  console.log(`Process context ${process.env.CONTEXT}`);
  console.log("TEST");

  const response = await redoc.loadAndBundleSpec(
    `.${
      process.env.CONTEXT ? "/repo" : "/livechat-public-docs"
    }/src/configs/redoc/${name}/spec.yml`
  );

  const store = await redoc.createStore(response, undefined, configs[name]);
  const sheet = new styledComponents.ServerStyleSheet();
  const html = renderToString(
    sheet.collectStyles(React.createElement(redoc.Redoc, { store }))
  );
  const css = sheet.getStyleTags();

  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  fs.writeFile(`${tmpDir}/redoc-${name}.html`, `${css} ${html}`, function(err) {
    if (err) return console.log(err);
    console.log(`Generated ${tmpDir}/redoc-${name}.html successfully!`);
  });
}

async function runAll() {
  await generateRedocHtml("global-accounts-api");
  await generateRedocHtml("customer-accounts-api");
}

runAll();
