const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");

const articlesDirectory = path.join(process.cwd(), "..", "src/pages/");

fs.readFile("../src/configs/categories.json", (err, data) => {
  if (err) throw err;
  const categories = JSON.parse(data);

  const getDirectories = (src, callback) => glob(src + "/**/*", callback);

  const articles = [];

  categories.forEach((element) => {
    const articleGroupedByCategory = [];
    const category = element["slug"];

    const article = {};
    article["category"] = element["slug"];
    article["article"] = true;
    article["url"] = "/" + element["slug"] + "/";
    article["path"] = [article["url"]];
    article["items"] = [];

    if (
      fs.existsSync(
        articlesDirectory + article["url"].substring(1) + "index.mdx"
      )
    ) {
      const fileContents = fs.readFileSync(
        articlesDirectory + article["url"].substring(1) + "index.mdx",
        "utf8"
      );
      const { data, content } = matter(fileContents);

      article["title"] = data["title"];
    } else {
      article["title"] = element["slug"];
    }

    articleGroupedByCategory.push(article);

    element.items.forEach((item) => {
      const article = {};
      article["title"] = item["title"];
      article["category"] = item["slug"];
      article["article"] = true;
      article["url"] = "/" + category + "/" + item["slug"] + "/";
      article["path"] = [article["url"]];
      article["items"] = [];

      articleGroupedByCategory.push(article);
    });

    articles.push(articleGroupedByCategory);
  });

  getDirectories(articlesDirectory, (err, res) => {
    const paths = res
      .filter((item) => item.endsWith(".mdx"))
      .map((item) => item.replace(articlesDirectory, ""));

    const pathsObjects = paths.map((item) => {
      return { category: "/" + item.split("/", 2).join("/") + "/", path: item };
    });

    //Add articles to related sections
    articles.forEach((articleGroup) => {
      articleGroup.forEach((article) => {
        if (articleGroup.length === 1) {
          const subArticlesInGroup = pathsObjects.filter((item) =>
            item.category.startsWith(article.url)
          );
          const subArticlesCategory = subArticlesInGroup.filter((item) =>
            item.path.match(
              article.url.substring(1) + "([A-Za-z0-9-]+)/index.mdx"
            )
          );
          subArticlesCategory.forEach((item) => {
            const articleObj = {};
            const fileContents = fs.readFileSync(
              articlesDirectory + item.path,
              "utf8"
            );
            const { data, content } = matter(fileContents);
            articleObj["url"] = "/" + item.path.replace("index.mdx", "");
            articleObj["path"] = [item["url"]];
            articleObj["article"] = true;
            articleObj["weight"] = data["weight"];
            articleObj["category"] = data["category"];
            articleObj["title"] = data["title"];
            articleObj["items"] = [];

            articles
              .find((item) => item[0].url === article.url)
              .push(articleObj);
          });
        } else {
          const subArticles = pathsObjects.filter(
            (item) => item.category === article.url
          );

          subArticles.forEach((subArticle) => {
            const item = {};

            const fileContents = fs.readFileSync(
              articlesDirectory + subArticle.path,
              "utf8"
            );
            const { data, content } = matter(fileContents);
            item["url"] = "/" + subArticle.path.replace("index.mdx", "");
            item["path"] = [item["url"]];
            item["article"] = true;
            item["weight"] = data["weight"];
            item["category"] = data["category"];
            item["title"] = data["title"];
            item["items"] = [];

            article.items.push(item);
          });

          article.items
            .sort(({ title: titleA }, { title: titleB }) =>
              titleA.localeCompare(titleB)
            )
            .sort(
              ({ weight: weightA }, { weight: weightB }) => weightA - weightB
            );
        }
      });
    });

    const articlesJSON = JSON.stringify(articles);

    fs.writeFile("../src/configs/articles.json", articlesJSON, (err) => {
      if (err) {
        throw err;
      }
    });
  });
});
