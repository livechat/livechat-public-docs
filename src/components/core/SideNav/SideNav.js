import React, { useState, Fragment, useEffect } from "react";
import {
  Nav,
  NavHeader,
  MenuWrapper,
  Ul,
  CollapsableSection,
  MenuElement
} from "../components";
import { HomeIcon, ChevronRight } from "../icons";
import {
  useAllArticlesInCategory,
  useCategoryMeta,
  useAllCategoriesMeta,
  useScrollSpy
} from "../../../hooks";
import { Link } from "gatsby";
import { PopperTooltip } from "@livechat/design-system";

const findActiveItem = (items, url) => {
  if (items.length) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.url === url) {
        console.log("hooray!", item.path);
        return item.path;
      }
      if (item.items && item.items.length) {
        return findActiveItem(item.items, url);
      }
    }
  }
};

const printItems = (items, toggleState, activeUrls, depth = 0) => (
  <Ul>
    {items.map(({ title, path, url, items: itemsInside, isSubcategory }) => {
      const activeItem =
        url === activeUrls[activeUrls.length - 1] && !isSubcategory;

      const activeSection = url === activeUrls[depth];

      return (
        <Fragment key={`toc-${depth}-${url}`}>
          <MenuElement
            url={url || "#"}
            title={title}
            active={activeItem}
            onClick={toggleState(url)}
          />

          {itemsInside && (
            <CollapsableSection expanded={activeSection}>
              {printItems(itemsInside, toggleState, activeUrls, depth + 1)}
            </CollapsableSection>
          )}
        </Fragment>
      );
    })}
  </Ul>
);

const SideNav = ({ category, subcategory, currentSlug }) => {
  const articles = useAllArticlesInCategory(category);
  const categories = useAllCategoriesMeta().map(item => ({
    ...item,
    url: `/${item.slug}/`
  }));

  const menuItems = category ? articles : categories;

  const initialState = subcategory
    ? [`/${category}/${subcategory}/`, currentSlug]
    : [currentSlug];
  const [activeUrls, setActiveUrls] = useState(initialState);

  const toggleState = path => () => {
    console.log("find", menuItems, path, findActiveItem(menuItems, path));
    setActiveUrls(findActiveItem(menuItems, path) || []);
  };

  const categoryMeta = useCategoryMeta(category);

  const elo = useScrollSpy(".heading", url => {
    // setActiveUrls(findActiveItem(menuItems, { url: url }).path);
  });

  useEffect(() => {
    console.log("activeUrls", activeUrls);
  }, [activeUrls]);

  console.log({ menuItems });

  return (
    <Nav color={categoryMeta.color}>
      <NavHeader>
        <Link to={"/"} style={{ color: "inherit" }}>
          <PopperTooltip
            isVisible={true}
            placement={"bottom-start"}
            triggerActionType={"hover"}
            trigger={
              <span>
                <HomeIcon width={18} style={{ display: "block" }} />
              </span>
            }
            closeOnOutsideClick
            zIndex={2}
          >
            {"Home"}
          </PopperTooltip>
        </Link>
        <ChevronRight width={14} />
        {categoryMeta.title || "Home"}
      </NavHeader>
      <MenuWrapper>
        {printItems(menuItems, toggleState, activeUrls, undefined)}
      </MenuWrapper>
    </Nav>
  );
};

export default SideNav;
