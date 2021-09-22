import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import articles from "./XD.json";

import { useScrollSpy } from "../../../hooks";

const Header = styled.div`
  margin-top: 100px;
  font-size: 14px;
  font-weight: 700;
  color: #424d57;
  border-bottom: 1px solid #e2e2e4;
`;

const Wrapper = styled.div`
  width: 240px;
  height: 100%;
  position: fixed;
`;

const StyledLink = styled.a`
  color: ${({ isActive }) => (isActive ? "#328DFF" : "#5e6c78")};
  font-size: 14px;
  padding-left: ${({ isSubheading }) => (isSubheading ? "10px" : "0px")};
  font-weight: 500;
  &:hover {
    color: #5e6c78;
    cursor: pointer;
    text-decoration: none;
  }
`;

const RightSideBar = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const headings = articles.find((article) => article.link === pathname + "/")
    ?.headings;
  const hash = typeof window !== "undefined" ? window.location.hash : "";

  const [activeHeading, setActiveHeading] = useState(pathname + hash);

  useScrollSpy(
    ".heading",
    (slug) => {
      setActiveHeading(pathname + slug);
    },
    () => {}
  );

  return (
    <Wrapper>
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

export default RightSideBar;
