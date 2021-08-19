const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");
const { v4: uuidv4 } = require("uuid");

const articlesDirectory = path.join(process.cwd(), "src/pages/");

const getDirectories = (src, callback) => glob(src + "/**/*", callback);

const redocTitles = {
  "customer-accounts-api": {
    title: "Customer Accounts API",
    weight: 30,
  },
  "global-accounts-api": {
    title: "Global Accounts API",
    weight: 20,
  },
};

getDirectories(articlesDirectory, (err, res) => {
  const paths = res
    .filter((item) => item.endsWith(".mdx") || item.endsWith(".js"))
    .map((item) => item.replace(articlesDirectory, ""));

  const items = [];

  paths.forEach((filePath) => {
    const item = {};

    const fileContents = fs.readFileSync(articlesDirectory + filePath, "utf8");
    const { data, content } = matter(fileContents);

    const regex = /^[\#]+ (.*)/gm;
    const matches = content.match(regex);

    const occurrences = [];

    const subItems = [];

    const iterate = (array, title, depth, index, url) => {
      if (index > 2) {
        return array;
      }

      if (array && array.length === 0) {
        array.push({ title, items: [], url, depth });
        return array;
      }
      if (index === depth || array[array.length - 1].depth === depth) {
        array.push({ title, items: [], url, depth });
        return array;
      }
      iterate(array[array.length - 1].items, title, depth, index + 1, url);
    };

    matches &&
      matches.forEach((match) => {
        const reg = /([#]+[\s]{1})/gm;
        const filter = /([\`\*]{1})/gm;
        const title = match.replace(reg, "").replace(filter, "");
        const depth = match.indexOf(" ") - 1;

        let slug = title;
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
            occurrences.find((item) => item.value === slug).number.toString();
        } else {
          occurrences.push({ value: slug, number: 0 });
        }

        const url = "#" + slug;
        iterate(subItems, title, depth, 0, url);
      });

    item["apiVersion"] = data["apiVersion"] || null;
    item["article"] = true;
    item["category"] = filePath.split("/")[0];
    if (item["category"].endsWith(".mdx") || item["category"].endsWith(".js")) {
      return;
    }
    item["id"] = uuidv4();
    if (subItems.length > 0) {
      item["items"] = subItems;
    } else {
      item["items"] = null;
    }
    item["subcategory"] =
      filePath.split("/").length > 1 &&
      (!filePath.split("/")[1].endsWith(".mdx") ||
        !filePath.split("/")[1].endsWith(".js"))
        ? filePath.split("/")[1]
        : null;
    item["title"] = redocTitles[item["subcategory"]]
      ? redocTitles[item["subcategory"]].title
      : data["title"];
    item["url"] =
      "/" + filePath.replace("index.mdx", "").replace("index.js", "");
    item["weight"] = redocTitles[item["subcategory"]]
      ? redocTitles[item["subcategory"]].weight
      : data["weight"];

    if (data["hidden"] != true) {
      items.push(item);
    }
  });

  const articlesJSON = JSON.stringify(items, null, "\t");

  fs.writeFile("./src/configs/articles.json", articlesJSON, (err) => {
    if (err) {
      throw err;
    }
  });
});
