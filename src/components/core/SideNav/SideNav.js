import React, { useState } from "react";
import { string } from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";
import articles from "../../../configs/articles.json";
import { ArticleIcon, ChevronRight } from "../icons";
import { Search } from "../Search";
import CategorySidebar from "./CategorySidebar";
import HomeItem from "./HomeItem";

const Wrapper = styled.div`
  border: 1px solid #e2e2e4;
  height: ${({ isExpanded }) => (isExpanded ? "600px" : "50px")};
  position: fixed;
  transition: height 300ms;

  bottom: 0%;
  width: 100%;
  opacity: 1;
  z-index: 10;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: white;
  overflow: scroll;

  @media (min-width: 420px) {
    padding-top: 50px;
    box-shadow: none;
    position: fixed;
    height: 100%;
    width: 240px;
    transition: all 0s;
  }
`;

const LinkWrapper = styled.div`
  padding: 8px 16px;
  margin-right: 10px;
  font-weight: ${({ isActive }) => (isActive ? "600" : "500")};
  background-color: ${({ isActive }) => (isActive ? "#F6F6F7" : "")};
  display: flex;
  align-items: center;
  font-size: 14px;
  border-radius: 0px 8px 8px 0px;
  &:hover {
    font-weight: 600;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

const StyledLink = styled.a`
  color: #5e6c78;
  &:hover {
    color: #5e6c78;
    cursor: pointer;
    text-decoration: none;
    background-color: #f6f6f7;
  }
`;

const SearchWrapper = styled.div`
  display: none;
  @media (min-width: 420px) {
    display: block;
  }

  margin-top: 15px;
  padding: 10px;
  border-bottom: 1px solid #e2e2e4;
  margin-bottom: 10px;
`;

const MenuIntro = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  @media (min-width: 420px) {
    display: none;
  }
  padding: 10px;
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

const SideNav = ({ category, version, title }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [expand, setExpand] = useState(false);
  const isHomeDir = pathname !== "/";

  return (
    <Wrapper isExpanded={expand}>
      <MenuIntro onClick={() => setExpand(!expand)}>
        <ChevronRight style={!expand ? openIconStyle : closeIconStyle} />
        {title}
      </MenuIntro>
      {isHomeDir && <HomeItem />}
      <SearchWrapper>
        <Search />
      </SearchWrapper>

      {isHomeDir ? (
        articles
          .filter((article) => article.category === category)
          .filter((article) => article.apiVersion === version)
          .sort((a, b) => {
            return a.weight - b.weight;
          })
          .map((article) => {
            return (
              <Link href={article.link} key={article.link}>
                <StyledLink>
                  <LinkWrapper isActive={pathname + "/" === article.link}>
                    <IconWrapper>
                      <ArticleIcon fill="#ABABB1" />
                    </IconWrapper>
                    {article.title}
                  </LinkWrapper>
                </StyledLink>
              </Link>
            );
          })
      ) : (
        <CategorySidebar />
      )}
    </Wrapper>
  );
};

SideNav.propTypes = {
  category: string,
  version: string,
};

export default SideNav;
