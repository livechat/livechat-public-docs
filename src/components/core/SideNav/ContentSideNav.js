import React, { useState, useEffect } from "react";
import { string } from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";
import articles from "../../../configs/articles.json";

const Header = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #424d57;
  border-bottom: 1px solid #e2e2e4;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: none;
  width: 270px;
  padding-left: 10px;
  margin: 211px 0px 0px 0px;
  overflow-y: scroll;
  height: calc(100vh - 70px);
  top: ${({ isVersioned }) => (isVersioned ? "130px" : "100px")};
  right: 20px;
  position: sticky;

  @media (min-width: 768px) {
    display: block;
  }
`;

const StyledLink = styled.a`
  color: ${({ isActive }) => (isActive ? "#328DFF" : "#5e6c78")};
  transition: color 200ms;
  font-size: 14px;
  padding-left: ${({ isSubheading }) => (isSubheading ? "10px" : "0px")};
  font-weight: 500;
  &:hover {
    color: #328dff;
    cursor: pointer;
    text-decoration: none;
  }
`;

const ContentSideNav = ({ version }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const headings = articles.find((article) => article.link === pathname + "/")
    ?.headings;
  const hash = typeof window !== "undefined" ? window.location.hash : "";

  const [activeHeading, setActiveHeading] = useState(pathname + hash);

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
  }, []);

  if (!headings || (Array.isArray(headings) && !headings.length)) {
    return null;
  }

  return (
    <Wrapper isVersioned={version}>
      <Header>On this page</Header>
      {headings.map((heading) => {
        return (
          <div key={heading.slug}>
            <Link href={heading.link} passHref>
              <StyledLink
                isActive={heading.link === activeHeading}
                isSubheading={heading.isSubheading}
              >
                {heading.title}
              </StyledLink>
            </Link>
          </div>
        );
      })}
    </Wrapper>
  );
};

ContentSideNav.propTypes = {
  version: string,
};

export default ContentSideNav;
