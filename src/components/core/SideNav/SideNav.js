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
  useAllCategoriesMeta
} from "../../../hooks";
import { getId, getText } from "../../extensions/Headings";
import { Link } from "gatsby";
import { PopperTooltip } from "@livechat/design-system";

export const generateItemsTree = (items, depth = 0) => {
  return items.map(item => {
    const url = item.article ? item.url : `#${getId(item.title)}`;
    const title = getText(item.title);
    const newItem = { ...item, url, title };

    if (item.items) {
      return {
        ...newItem,
        items: generateItemsTree(item.items, depth + 1)
      };
    }
    return newItem;
  });
};

const printItems = (items, toggleState, activeUrls, depth = 0) => (
  <Ul>
    {items.map(({ title, url, items: itemsInside, isSubcategory }) => {
      const activeItem =
        url === activeUrls[activeUrls.length - 1] && !isSubcategory;
      const activeSection = url === activeUrls[depth];
      return (
        <Fragment key={`toc-${depth}-${url}`}>
          <MenuElement
            url={url}
            title={title}
            active={activeItem}
            onClick={toggleState(url, depth)}
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
    url: `/docs/${item.slug}/`
  }));

  const menuItems = category ? articles : categories;

  const initialState = subcategory
    ? [`/docs/${category}/${subcategory}/`, currentSlug]
    : [currentSlug];
  const [activeUrls, setActiveUrls] = useState(initialState);

  const toggleState = (slug, depth) => () => {
    let newArr = activeUrls.slice(0, depth);
    newArr[depth] = slug;
    return setActiveUrls(newArr);
  };

  const categoryMeta = useCategoryMeta(category);

  return (
    <Nav color={categoryMeta.color}>
      <NavHeader>
        <Link to={"/docs/"} style={{ color: "inherit" }}>
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
        {printItems(menuItems, toggleState, activeUrls)}
      </MenuWrapper>
    </Nav>
  );
};

export default SideNav;
