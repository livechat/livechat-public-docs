const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");

const articlesDirectory = path.join(process.cwd(), "src/pages/");

const getDirectories = (src, callback) => glob(src + "/**/*", callback);

var articles = [];

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

      const transformSlug = (match, prefix) => {
        let slug = match.replace(prefix, "");
        slug = slug.toLowerCase();
        slug = slug.trim();
        slug = slug.replace(/\s/g, "-");
        slug = slug.replace(/[^a-zA-Z0-9-_]+/g, "");

        return slug;
      };

      const checkOccurrences = (slug, occurrences) => {
        let helperSlug = slug;
        let helperOccurrences = occurrences;

        if (
          helperOccurrences.some((o) => {
            return o["value"] === helperSlug;
          })
        ) {
          helperOccurrences.find(
            (item) => item.value === helperSlug
          ).number += 1;
          helperSlug =
            helperSlug +
            "-" +
            helperOccurrences
              .find((item) => item.value === helperSlug)
              .number.toString();
        } else {
          helperOccurrences.push({ value: helperSlug, number: 0 });
        }

        return [helperSlug, helperOccurrences];
      };

      const pushHeading = (match, slug, prefix, nestingLevel) => {
        headings.push({
          title: match.replace(prefix, "").replace(/\*/g, ""),
          link: link.substring(0, link.length - 1) + "#" + slug,
          slug,
          nestingLevel,
        });
      };

      if (matches) {
        let occurrences = [];
        const prefixes = ["# ", "## ", "### "];

        matches.forEach((match) => {
          let currentPrefix;

          if (
            prefixes.some((prefix) => {
              currentPrefix = prefix;
              return match.startsWith(prefix);
            })
          ) {
            let slug = transformSlug(match, currentPrefix);
            [slug, occurrences] = checkOccurrences(slug, occurrences);
            console.log("currentPrefix", currentPrefix);
            pushHeading(
              match,
              slug,
              currentPrefix,
              (currentPrefix.match(/#/g) || []).length - 1
            );
          }
        });
      }

      if (data.hidden != true) {
        articles.push({ title, link, apiVersion, category, weight, headings });
      }
    });
  const articlesJSON = JSON.stringify(articles, null, "\t");

  fs.writeFile("./src/configs/articles.json", articlesJSON, (err) => {
    if (err) {
      throw err;
    }
  });
});
