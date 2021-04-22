import articles from "../configs/articles.json";
import { canUseWindow } from "../utils";

const generatePathsMap = (items = [], acc = {}) => {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    acc = { ...acc, [item.url]: item.path };
    if (item.items && item.url) {
      acc = {
        ...generatePathsMap(item.items, acc),
      };
    }
  }
  return acc;
};

export default (category, headings) => {
  //Find the currently displayed category
  const path = canUseWindow ? window.location.pathname + "/" : "";
  const articlesGroupedByCategory = articles.find(
    (item) => item[0].category === category
  );

  const formattedHeadings = [];

  headings &&
    headings.forEach((heading) => {
      //build heading object
      const headingObj = {};
      headingObj["title"] = heading
        .substring(heading.indexOf(" "))
        .substring(1);
      headingObj["url"] =
        "#" + headingObj["title"].replace("/ /g", "-").toLowerCase();
      headingObj["path"] = [path, headingObj["url"]];
      headingObj["items"] = undefined;

      if (heading.startsWith("# ")) {
        formattedHeadings.push(headingObj);
      } else if (heading.startsWith("## ")) {
        if (
          formattedHeadings[formattedHeadings.length - 1] &&
          formattedHeadings[formattedHeadings.length - 1].items === undefined
        ) {
          formattedHeadings[formattedHeadings.length - 1].items = [];
          formattedHeadings[formattedHeadings.length - 1].items.push(
            headingObj
          );
        } else if (formattedHeadings[formattedHeadings.length - 1]) {
          formattedHeadings[formattedHeadings.length - 1].items.push(
            headingObj
          );
        }
      } else if (heading.startsWith("### ")) {
        //TODO
      }
    });

  //add headings to related base item
  articlesGroupedByCategory &&
    articlesGroupedByCategory.forEach((article) => {
      if (article.url === path && article.items.length === 0) {
        article.items = formattedHeadings;
      } else {
        article.items.forEach((subArticle) => {
          if (subArticle.url === path) {
            subArticle.items = formattedHeadings;
          }
        });
      }
    });

  const pathsMap = generatePathsMap(articlesGroupedByCategory);
  const getArticlePath = (url) => pathsMap[url];
  return [articlesGroupedByCategory, getArticlePath];
};
