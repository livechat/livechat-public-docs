import React, { useState, useEffect } from "react";
import { string } from "prop-types";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import articles from "../../../configs/articles.json";

const Header = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #424d57;
  border-bottom: 1px solid #e2e2e4;
`;

const Wrapper = styled.div`
  @media (min-width: 768px) {
    display: block;
  }
  display: none;

  width: 270px;
  padding-left: 10px;
  margin: 211px 0px 0px 0px;
  overflow: scroll;
  height: 700px;
  top: ${({ isVersioned }) => (isVersioned ? "130px" : "100px")};
  right: 20px;
  position: sticky;
`;

const StyledLink = styled.a`
  color: ${({ isActive }) => (isActive ? "#328DFF" : "#5e6c78")};
  font-size: 14px;
  padding-left: ${({ isSubheading }) => (isSubheading ? "10px" : "0px")};
  font-weight: 500;
  &:hover {
    color: ${({ isActive }) => (isActive ? "#328DFF" : "#5e6c78")};
    cursor: pointer;
    text-decoration: none;
  }
`;

const RightSideNav = ({ version }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const headings = articles.find((article) => article.link === pathname + "/")
    ?.headings;
  const hash = typeof window !== "undefined" ? window.location.hash : "";

  const [activeHeading, setActiveHeading] = useState(pathname + hash);

  useEffect(() => {
    const onScroll = () => {
      const map = Array.from(document.getElementsByClassName("heading"))
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
            offsetTop - clientHeight / 3 <= currentPosition + 60
        )
        .slice(-1)[0];

      setActiveHeading(pathname + "#" + elem?.id);
    };

    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  if (!headings) {
    return null;
  }

  return (
    <Wrapper isVersioned={version}>
      <Header>On the page</Header>
      {headings?.map((heading) => {
        return (
          <div key={heading.slug}>
            <StyledLink
              href={"/docs" + heading.link}
              isActive={heading.link === activeHeading}
              isSubheading={heading.isSubheading}
            >
              {heading.title}
            </StyledLink>
          </div>
        );
      })}
    </Wrapper>
  );
};

RightSideNav.propTypes = {
  version: string,
};

export default RightSideNav;
