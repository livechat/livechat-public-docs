import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { string } from "prop-types";
import Link from "next/link";
import styled from "@emotion/styled";
import articles from "../../../configs/articles.json";

const Header = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #424d57;
  border-bottom: 1px solid #e2e2e4;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Wrapper = styled.div`
  display: none;
  width: 270px;
  padding-left: 10px;
  margin: 195px 0px 50px 0px;
  overflow-y: scroll;
  height: calc(100vh - ${({ isVersioned }) => (isVersioned ? "130px" : "100px")});
  top: ${({ isVersioned }) => (isVersioned ? "130px" : "100px")};
  right: 20px;
  position: sticky;

  @media (min-width: 1270px) {
    display: block;
  }
`;

const StyledLink = styled.a`
  color: ${({ isActive }) => (isActive ? "#328DFF" : "#5e6c78")};
  transition: color 200ms;
  font-size: 14px;
  padding-left: ${({ nestingLevel }) => `${10 * nestingLevel}px`};
  font-weight: 500;

  &:hover {
    color: #328dff;
    cursor: pointer;
    text-decoration: none;
  }
`;

const LinkContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentSideNav = ({ version, slug }) => {
  const headings = articles.find((article) => article.link === `/${slug}/`)
    ?.headings;
  const router = useRouter();
  const pathname = router.asPath;

  const [activeHeading, setActiveHeading] = useState(pathname);

  useEffect(() => {
    const onScroll = () => {
      const map = Array.from(document.getElementsByClassName("reference"))
        .map(({ id, offsetTop, clientHeight }) => ({
          id,
          offsetTop,
          clientHeight,
        }))
        .filter((item) =>
          headings?.some((heading) => heading.slug === item.id)
        );

      const currentPosition =
        window.scrollY || document.documentElement.scrollTop;

      const elem = map
        .filter(
          ({ offsetTop, clientHeight }) =>
            offsetTop - clientHeight / 3 <=
            currentPosition + 100 + (version ? 20 : 0)
        )
        .slice(-1)[0];

      setActiveHeading(pathname + "#" + elem?.id);
    };

    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!headings || (Array.isArray(headings) && !headings.length)) {
    return null;
  }

  return (
    <Wrapper isVersioned={version}>
      <Header>On this page</Header>
      {headings.map((heading) => {
        return (
          <LinkContainer key={heading.slug}>
            <Link href={heading.link} passHref>
              <StyledLink
                isActive={heading.link === activeHeading}
                nestingLevel={heading.nestingLevel}
              >
                {heading.title}
              </StyledLink>
            </Link>
          </LinkContainer>
        );
      })}
    </Wrapper>
  );
};

ContentSideNav.propTypes = {
  version: string,
  slug: string,
};

export default ContentSideNav;
