import React, { useState, Fragment, useContext } from "react";
import Link from "next/link";
import { PopperTooltip } from "@livechat/design-system";
import {
  Nav,
  NavHeader,
  MenuWrapper,
  Ul,
  CollapsableSection,
  MenuElement,
} from "../components";
import { Search } from "../Search";
import { HomeIcon, ChevronRight } from "../icons";
import {
  useAllArticlesInCategory,
  useCategoryMeta,
  useAllCategoriesMeta,
  useScrollSpy,
} from "../../../hooks";
import { VersionContext } from "../../../contexts";
import { getVersionColor, canUseWindow } from "../../../utils";

const printItems = (items, toggleState, activeUrls, depth = 0) => {
  const arrayOfSlugs = items.map((item) => item.url);
  return (
    <Ul>
      {items.map(({ title, path, url, items: itemsInside, isSubcategory }) => {
        const isActiveItem =
          (activeUrls &&
            url === activeUrls[activeUrls.length - 1] &&
            !isSubcategory) ||
          "";

        const isActiveSection =
          activeUrls &&
          activeUrls.includes(url) &&
          url.includes(activeUrls[depth]);

        /*
        const slug = canUseWindow ? window.location.pathname : "";
        const titleSlug = "#" + title.toLowerCase().replace(/ /g, "-");
        const isActive = titleSlug === activeUrls;

        const projectPath = path && path.length > 0 ? path[0] : "/";
        const isExpanded =
          slug + "/" === projectPath &&
          (isSubcategory !== true || arrayOfSlugs.includes(activeUrls));
*/
        let redirectUrl = url || "#";

        return (
          <Fragment key={`toc-${depth}-${url}`}>
            <MenuElement
              url={redirectUrl}
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
};

const SideNav = ({
  category,
  subcategory,
  currentSlug,
  expanded,
  setExpanded,
  headings,
}) => {
  const { items: versions, selected: selectedVersion } = useContext(
    VersionContext
  );
  const [articles, getArticlePath] = useAllArticlesInCategory(
    category,
    headings
  );

  const categories = useAllCategoriesMeta().map((item) => ({
    ...item,
    url: `/${item.slug}/`,
    items: null,
  }));

  const menuItems = category ? articles : categories;

  const initialPath = subcategory
    ? [`/${category}/${subcategory}/`, currentSlug]
    : [currentSlug];

  const [activePath, setActivePath] = useState(initialPath);
  const toggleState = (path) => () => setActivePath(path);

  const categoryMeta = useCategoryMeta(category);
  useScrollSpy(".heading", (url) => url && setActivePath(getArticlePath(url)));

  const navColor = getVersionColor(selectedVersion, versions);

  return (
    <Nav color={navColor} expanded={expanded} setExpanded={setExpanded}>
      <NavHeader>
        <Link href="/" style={{ color: "inherit" }}>
          <a style={{ color: "#8a9097", marginTop: "1px" }}>
            <PopperTooltip
              isVisible={true}
              placement={"bottom-start"}
              triggerActionType={"hover"}
              trigger={
                <span>
                  <HomeIcon
                    width={18}
                    style={{ display: "block", color: "#424D57" }}
                  />
                </span>
              }
              closeOnOutsideClick
              zIndex={20}
            >
              {"Home"}
            </PopperTooltip>
          </a>
        </Link>
        <ChevronRight width={14} style={{ marginTop: "2px" }} />
        <span style={{ marginBottom: "-3px" }}>
          {categoryMeta.title || "Home"}
        </span>
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
