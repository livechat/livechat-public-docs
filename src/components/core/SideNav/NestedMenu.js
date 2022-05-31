import React from "react";
import { useRouter } from "next/router";
import { string } from "prop-types";
import containers from "../../../configs/containers.json";
import articles from "../../../configs/articles.json";
import MenuItem from "./MenuItem";
import { VERSIONS_GROUPS } from "../../../constant";

const NestedMenu = ({
  category,
  version = VERSIONS_GROUPS.DEFAULT.STABLE_VERSION,
}) => {
  const router = useRouter();
  const pathname = router.asPath;
  const items = containers.filter(
    (container) => container.category === category
  )[0].items;

  return items.map((item) => {
    const subItems = articles.filter((article) =>
      article.link.startsWith(item.slug)
    );

    return (
      <MenuItem
        title={item.title}
        link={item.slug}
        key={item.slug}
        pathname={pathname}
        iconFill="#ABABB1"
        items={subItems
          .filter((article) => article.category === category)
          .filter(
            (article) =>
              !("apiVersion" in article) || article.apiVersion === version
          )
          .sort((a, b) => {
            return a.weight - b.weight;
          })}
        category={category}
      />
    );
  });
};

NestedMenu.propTypes = {
  category: string,
  version: string,
};

export default NestedMenu;
