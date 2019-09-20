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
import styled from "@emotion/styled";

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

const StyledButton = styled.button`
  background: none;
  border: 0;
  outline: 0;
`;

const Search = () => (
  <div class="searchbox">
    <input
      type="text"
      id="search"
      class="searchbox__input"
      placeholder="Search the docs..."
    />
    <StyledButton>
      <svg
        fill="#000000"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </StyledButton>
  </div>
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
      <NavHeader>
        <Search />
      </NavHeader>
      <MenuWrapper>
        {printItems(menuItems, toggleState, activePath, undefined)}
      </MenuWrapper>
    </Nav>
  );
};

export default SideNav;
