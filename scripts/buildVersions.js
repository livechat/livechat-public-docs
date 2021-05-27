const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");

const articlesDirectory = path.join(process.cwd(), "src/pages/");
const getDirectories = (src, callback) => glob(src + "/**/*", callback);

getDirectories(articlesDirectory, (err, res) => {
  const paths = res
    .filter((item) => item.endsWith(".mdx"))
    .map((item) => item.replace(articlesDirectory, ""));

  const articlesVersions = paths
    .filter((filePath) => {
      const fileContents = fs.readFileSync(
        articlesDirectory + filePath,
        "utf8"
      );
      const { data } = matter(fileContents);
      if (data.apiVersion) {
        return true;
      }

      return false;
    })
    .map((filePath) => {
      const fileContents = fs.readFileSync(
        articlesDirectory + filePath,
        "utf8"
      );
      const { data } = matter(fileContents);

      return {
        category: data.category,
        subcategory: data.subcategory,
        title: data.title,
        apiVersion: data.apiVersion,
      };
    })
    .reduce((prev, curr) => {
      const { title, apiVersion, subcategory, category } = curr;

      if (!prev[category]) {
        prev[category] = {};
      }
      if (!prev[category][subcategory]) {
        prev[category][subcategory] = {};
      }
      if (!prev[category][subcategory][title]) {
        prev[category][subcategory][title] = [apiVersion];
      } else {
        prev[category][subcategory][title].push(apiVersion);
      }

      return prev;
    }, {});

  const articlesVersionsJSON = JSON.stringify(articlesVersions, null, "\t");

  fs.writeFileSync("./src/configs/articlesVersions.json", articlesVersionsJSON);
});
