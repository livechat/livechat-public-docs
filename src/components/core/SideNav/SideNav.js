import React, { useState, Fragment } from "react";
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

const printItems = (items, toggleState, activeUrls, depth = 0) => (
  <Ul>
    {items.map(({ title, path, url, items: itemsInside, isSubcategory }) => {
      const isActiveItem =
        (activeUrls &&
          url === activeUrls[activeUrls.length - 1] &&
          !isSubcategory) ||
        "";

      const isActiveSection = activeUrls && url === activeUrls[depth];

      return (
        <Fragment key={`toc-${depth}-${url}`}>
          <MenuElement
            url={url || "#"}
            title={title}
            active={isActiveItem}
            onClick={toggleState(path)}
          />

          {itemsInside && (
            <CollapsableSection expanded={isActiveSection}>
              {printItems(itemsInside, toggleState, activeUrls, depth + 1)}
            </CollapsableSection>
          )}
        </Fragment>
      );
    })}
  </Ul>
);

const SideNav = ({ category, subcategory, currentSlug }) => {
  const [articles, getArticlePath] = useAllArticlesInCategory(
    category,
    currentSlug
  );

  const categories = useAllCategoriesMeta().map(item => ({
    ...item,
    url: `/${item.slug}/`,
    items: null
  }));

  const menuItems = category ? articles : categories;

  const initialPath = subcategory
    ? [`/${category}/${subcategory}/`, currentSlug]
    : [currentSlug];

  const [activePath, setActivePath] = useState(initialPath);
  const toggleState = path => () => setActivePath(path);

  const categoryMeta = useCategoryMeta(category);

  useScrollSpy(".heading", url => url && setActivePath(getArticlePath(url)));

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
        {printItems(menuItems, toggleState, activePath, undefined)}
      </MenuWrapper>
    </Nav>
  );
};

export default SideNav;
