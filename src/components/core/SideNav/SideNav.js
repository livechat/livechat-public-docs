import React, { useState } from "react";
import { string } from "prop-types";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import articles from "../../../configs/articles.json";
import containers from "../../../configs/containers.json";
import { ChevronRight } from "../icons";
import { Search } from "../Search";
import CategoryMenu from "./CategoryMenu";
import HomeItem from "./HomeItem";
import MenuItem from "./MenuItem";
import NestedMenu from "./NestedMenu";

const Wrapper = styled.div`
  border: 1px solid #e2e2e4;
  height: ${({ isExpanded }) => (isExpanded ? "500px" : "50px")};
  position: fixed;
  transition: height 300ms;

  bottom: 0%;
  width: 100%;
  opacity: 1;
  z-index: 10;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: white;
  overflow: scroll;

  @media (min-width: 768px) {
    overflow: visible;
    padding-top: 60px;
    box-shadow: none;
    position: fixed;
    height: 100%;
    width: 260px;
    transition: all 0s;
  }
`;

const SearchWrapper = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
    margin-bottom: 5px;
  }

  padding: 8.5px 20px;
`;

const MenuIntro = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  @media (min-width: 768px) {
    display: none;
  }
  padding: 10px 14px;
  cursor: pointer;
`;

const openIconStyle = {
  transform: "rotate(270deg)",
  transition: "transform 300ms",
};
const closeIconStyle = {
  transform: "rotate(90deg)",
  transition: "transform 300ms",
};

const SideNav = ({ category, version = "3.3", title }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [expand, setExpand] = useState(false);
  const isHomeDir = pathname === "/";
  const isNestedDir =
    !isHomeDir &&
    containers.find((container) => container.category === category)?.items
      ?.length > 0;

  return (
    <Wrapper isExpanded={expand}>
      <MenuIntro onClick={() => setExpand(!expand)}>
        <ChevronRight style={!expand ? openIconStyle : closeIconStyle} />
        {title}
      </MenuIntro>
      {!isHomeDir && <HomeItem />}
      <SearchWrapper>
        <Search />
      </SearchWrapper>

      {isHomeDir ? (
        <CategoryMenu />
      ) : isNestedDir ? (
        <NestedMenu category={category} version={version} />
      ) : (
        articles
          .filter((article) => article.category === category)
          .filter(
            (article) =>
              !("apiVersion" in article) || article.apiVersion === version
          )
          .sort((a, b) => {
            return a.weight - b.weight;
          })
          .map((article) => (
            <MenuItem
              link={article.link}
              key={article.link}
              title={article.title}
              pathname={pathname}
              iconFill="#424D57"
            />
          ))
      )}
    </Wrapper>
  );
};

SideNav.propTypes = {
  category: string,
  version: string,
};

export default SideNav;
