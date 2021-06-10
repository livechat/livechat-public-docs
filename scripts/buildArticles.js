const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");
const { v4: uuidv4 } = require("uuid");

const articlesDirectory = path.join(process.cwd(), "..", "src/pages/");

const getDirectories = (src, callback) => glob(src + "/**/*", callback);

getDirectories(articlesDirectory, (err, res) => {
  const paths = res
    .filter((item) => item.endsWith(".mdx"))
    .map((item) => item.replace(articlesDirectory, ""));

  const items = [];

  paths.forEach((filePath) => {
    const item = {};

    const fileContents = fs.readFileSync(articlesDirectory + filePath, "utf8");
    const { data, content } = matter(fileContents);

    const regex = /^[\#]+ (.*)/gm;
    const matches = content.match(regex);

    //TODO this requires refactoring
    const subItems = [];
    const occurrences = [];

    matches &&
      matches.forEach((match) => {
        if (match.startsWith("# ")) {
          const title = match.substring(2);
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

          subItems.push({ title: title, url: "#" + slug });
        } else if (match.startsWith("## ")) {
          const title = match.substring(3);
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

          if (subItems.length === 0) {
            subItems.push({ title: title, url: "#" + slug });
          } else {
            if (subItems[subItems.length - 1].items === undefined) {
              subItems[subItems.length - 1].items = [];
              subItems[subItems.length - 1].items.push({
                title: title,
                url: "#" + slug,
              });
            } else {
              subItems[subItems.length - 1].items.push({
                title: title,
                url: "#" + slug,
              });
            }
          }
        } else if (match.startsWith("### ")) {
          const title = match.substring(4);
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

          if (subItems.length === 0) {
            subItems.push({ title: title, url: "#" + slug });
          } else {
            if (subItems[subItems.length - 1].items === undefined) {
              subItems[subItems.length - 1].items = [];
              subItems[subItems.length - 1].items.push({
                title: title,
                url: "#" + slug,
              });
            } else {
              if (
                subItems[subItems.length - 1].items[
                  subItems[subItems.length - 1].items.length - 1
                ].items === undefined
              ) {
                subItems[subItems.length - 1].items[
                  subItems[subItems.length - 1].items.length - 1
                ].items = [];
                subItems[subItems.length - 1].items[
                  subItems[subItems.length - 1].items.length - 1
                ].items.push({ title: title, url: "#" + slug });
              } else {
                subItems[subItems.length - 1].items[
                  subItems[subItems.length - 1].items.length - 1
                ].items.push({ title: title, url: "#" + slug });
              }
            }
          }
        }
      });

    item["apiVersion"] = data["apiVersion"] || null;
    item["article"] = true;
    item["category"] = filePath.split("/")[0];
    if (item["category"].endsWith(".mdx")) {
      return;
    }
    item["id"] = uuidv4();
    if (subItems.length > 0) {
      item["items"] = subItems;
    } else {
      item["items"] = null;
    }
    item["subcategory"] =
      filePath.split("/").length > 1 && !filePath.split("/")[1].endsWith(".mdx")
        ? filePath.split("/")[1]
        : null;
    item["title"] = data["title"];
    item["url"] = "/" + filePath.replace("index.mdx", "");
    item["weight"] = data["weight"];

    if (data["hidden"] != true) {
      items.push(item);
    }
  });

  const articlesJSON = JSON.stringify(items, null, "\t");

  fs.writeFile("../src/configs/articles.json", articlesJSON, (err) => {
    if (err) {
      throw err;
    }
  });
});
