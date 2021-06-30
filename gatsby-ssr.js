const React = require("react");
const { renderToString } = require("react-dom/server");
const fs = require("fs");

/**
 * Use generated redoc content and inject it to the body for SEO and docsearch purposes
 */
exports.replaceRenderer = async ({
  pathname,
  bodyComponent,
  replaceBodyHTMLString,
}) => {
  const tmpDir = "./tmp";

  if (fs.existsSync(tmpDir)) {
    if (pathname === "/authorization/livechat-accounts-api/") {
      const content = fs.readFileSync(
        `${tmpDir}/redoc-livechat-accounts-api.html`
      );

      let bodyHTML = renderToString(bodyComponent);
      bodyHTML = bodyHTML.replace("%%REDOC_SSR%%", content);
      replaceBodyHTMLString(bodyHTML);
    }
    else if (pathname === "/authorization/customer-accounts-api/") {
      const content = fs.readFileSync(
        `${tmpDir}/redoc-customer-accounts-api.html`
      );

      let bodyHTML = renderToString(bodyComponent);
      bodyHTML = bodyHTML.replace("%%REDOC_SSR%%", content);
      replaceBodyHTMLString(bodyHTML);
    }
  }
};
