import React from "react";
import { string } from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";
import articles from "../../../configs/articles.json";
import { ArticleIcon } from "../icons";
import { Search } from "../Search";
import CategorySidebar from "./CategorySidebar";

const Wrapper = styled.div`
  width: 240px;
  height: 100%;
  border: 1px solid #e2e2e4;
  position: fixed;
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
`;

const IconWrapper = styled.div`
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
  padding: 10px;
  border-bottom: 1px solid #e2e2e4;
  margin-bottom: 10px;
`;

const SideNav = ({ category, version }) => {
  const router = useRouter();
  const pathname = router.pathname;

  if (pathname === "/") return <CategorySidebar />;

  return (
    <Wrapper>
      <SearchWrapper>
        <Search />
      </SearchWrapper>
      {articles
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
                    <ArticleIcon />
                  </IconWrapper>
                  {article.title}
                </LinkWrapper>
              </StyledLink>
            </Link>
          );
        })}
    </Wrapper>
  );
};

SideNav.propTypes = {
  category: string,
  version: string,
};

export default SideNav;
