import React from "react";
import { string } from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";
import articles from "../../../configs/articles.json";
import { ArticleIcon } from "../icons";

const Wrapper = styled.div`
  padding-top: 10px;
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
  border-radius: 0px 25px 25px 0px;
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

const SideNav = ({ category, version }) => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <Wrapper>
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
