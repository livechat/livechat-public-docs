import React from "react";
import { useRouter } from "next/router";
import { string } from "prop-types";
import containers from "../../../configs/containers.json";
import articles from "../../../configs/articles.json";
import MenuItem from "./MenuItem";

const NestedMenu = ({ category, version = "3.3" }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const items = containers.filter(
    (container) => container.category === category
  )[0].items;

  return items.map((item) => {
    const subItems = articles.filter((article) =>
      article.link.startsWith(item.slug)
    );
    const isNotBasePath = item.slug !== "/" + category + "/";
    const isActivePath = pathname.startsWith(item.slug);
    const hasSubItems = subItems.length > 1;
    const displaySubNav = isNotBasePath && isActivePath && hasSubItems;

    return (
      <MenuItem
        title={item.title}
        link={item.slug}
        key={item.slug}
        pathname={pathname}
        iconFill="#ABABB1"
        isOpen={displaySubNav}
        items={subItems
          .filter((article) => article.category === category)
          .filter(
            (article) =>
              !("apiVersion" in article) || article.apiVersion === version
          )
          .sort((a, b) => {
            return a.weight - b.weight;
          })}
        isNotBasePath={isNotBasePath}
      />
    );
  });
};

NestedMenu.propTypes = {
  category: string,
  version: string,
};

export default NestedMenu;
