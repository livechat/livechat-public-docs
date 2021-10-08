const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");

const articlesDirectory = path.join(process.cwd(), "src/pages/");

const getDirectories = (src, callback) => glob(src + "/**/*", callback);

var articles = [];
var versionedPaths = [];

getDirectories(articlesDirectory, (err, res) => {
  const paths = res;
  paths
    .filter((item) => item.endsWith(".mdx"))
    .forEach((item) => {
      const link =
        "/" + item.replace(articlesDirectory, "").replace("index.mdx", "");

      const fileContents = fs.readFileSync(item, "utf8");
      const { data, content } = matter(fileContents);
      const title = data.title;
      const apiVersion = data.apiVersion;
      const category = data.category;
      const weight = data.weight;
      const headings = [];

      const regex = /^[\#]+ (.*)/gm;
      const matches = content.match(regex);

      if (typeof apiVersion === "string") {
        versionedPaths.push(link);
      }

      if (matches) {
        const occurrences = [];

        matches.forEach((match) => {
          if (match.startsWith("# ")) {
            let slug = match.replace("# ", "");
            slug = slug.toLowerCase();
            slug = slug.trim();
            slug = slug.replace(/\s/g, "-");
            slug = slug.replace(/[^a-zA-Z0-9-_]+/g, "");

            if (
              occurrences.some((o) => {
                return o["value"] === slug;
              })
            ) {
              occurrences.find((item) => item.value === slug).number += 1;
              slug =
                slug +
                "-" +
                occurrences
                  .find((item) => item.value === slug)
                  .number.toString();
            } else {
              occurrences.push({ value: slug, number: 0 });
            }

            headings.push({
              title: match.replace("# ", ""),
              link: link.substring(0, link.length - 1) + "#" + slug,
              slug,
              isSubheading: false,
            });
          } else if (match.startsWith("## ")) {
            let slug = match.replace("## ", "");
            slug = slug.toLowerCase();
            slug = slug.trim();
            slug = slug.replace(/\s/g, "-");
            slug = slug.replace(/[^a-zA-Z0-9-_]+/g, "");

            if (
              occurrences.some((o) => {
                return o["value"] === slug;
              })
            ) {
              occurrences.find((item) => item.value === slug).number += 1;
              slug =
                slug +
                "-" +
                occurrences
                  .find((item) => item.value === slug)
                  .number.toString();
            } else {
              occurrences.push({ value: slug, number: 0 });
            }

            headings.push({
              title: match.replace("## ", ""),
              link: link.substring(0, link.length - 1) + "#" + slug,
              slug,
              isSubheading: true,
            });
          }
        });
      }

      if (data.hidden != true) {
        articles.push({ title, link, apiVersion, category, weight, headings });
      }
    });
  const articlesJSON = JSON.stringify(articles, null, "\t");
  const pathsJSON = JSON.stringify(versionedPaths, null, "\t");

  fs.writeFile("./src/configs/articles.json", articlesJSON, (err) => {
    if (err) {
      throw err;
    }
  });

  fs.writeFile("./src/configs/versionedArticles.json", pathsJSON, (err) => {
    if (err) {
      throw err;
    }
  });
});
