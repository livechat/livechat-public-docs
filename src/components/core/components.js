import React, { useState } from "react";
import posed from "react-pose";
import styled from "@emotion/styled";
import { HashtagIcon, ArticleIcon, ChevronRight } from "./icons";
import { Link } from "gatsby";
import useLocalStorage from "../../hooks/useLocalStorage";

const COLLAPSED = "COLLAPSED";
const EXPANDED = "EXPANDED";

export const Box = posed.div({
  COLLAPSED: {
    height: 0,
    opacity: 0,
    transition: { duration: 150 }
  },
  EXPANDED: {
    height: "auto",
    opacity: 1,
    transition: { duration: 150 }
  }
});

export const CollapsableSection = ({ expanded, children }) => (
  <Box
    pose={expanded ? EXPANDED : COLLAPSED}
    initialPose={COLLAPSED}
    withParent={false} // don't ever remove this
    style={{
      overflow: "hidden"
    }}
  >
    {children}
  </Box>
);

const NavWrapper = styled.aside`
  --page-theme-color: ${({ color }) => color};
  transition: margin 0.3s ease-out;
  top: 60px;
  background-color: #f1f6f8;
  border-right: 1px solid #e8e8e8;

  position: fixed;
  z-index: 999;
  width: 250px;
  margin-left: ${({ expanded = true }) => (expanded ? "0px" : "-230px")};

  @media (min-width: 768px) {
    position: sticky;
    top: 60px;
    width: 250px;
    margin-left: ${({ expanded = true }) => (expanded ? "0px" : "-230px")};
  }
`;

const NavSwitch = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  position: absolute;
  right: -15px;
  top: 15px;
  background-color: white;
  border: 1px solid #e8e8e8;
  border-radius: 30px;
  color: inherit;
  transition: transform 0.3s ease-out;
  transform: ${({ expanded = true }) => (expanded ? "rotate(180deg)" : "")};
`;

export const Nav = ({ children, ...rest }) => {
  const [expanded, setExpanded] = useLocalStorage("navMenuExpanded", true);
  return (
    <NavWrapper expanded={expanded} {...rest}>
      <NavSwitch
        href="#toggle-nav"
        expanded={expanded}
        onClick={e => {
          e.preventDefault();
          setExpanded(!expanded);
        }}
      >
        <ChevronRight />
      </NavSwitch>
      {children}
    </NavWrapper>
  );
};

export const NavHeader = styled.div`
  padding: 20px 28px 10px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  color: #424d5799;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  svg {
    margin-right: 2px;
  }
`;

export const PageTitle = styled.h1`
  margin 0;
`;

export const PageHeaderWrapper = styled.div`
  margin: 3em 0 1em;
  padding: 2em 0 1em;
`;

export const PageDetails = styled.p`
  font-size: 14px;
  color: gray;
`;
export const PageHeader = ({ title, timeToRead, modifiedTime }) => (
  <PageHeaderWrapper>
    <PageTitle>{title}</PageTitle>
    <PageDetails>
      {timeToRead} minutes reading time &bull; last modified {modifiedTime}
    </PageDetails>
  </PageHeaderWrapper>
);

export const Content = styled.article`
  display: grid;
  grid-gap: 0 30px;

  grid-template-columns: minmax(0, 800px) minmax(0, 1fr);

  & * {
    grid-column-start: 1;
    grid-column-end: 2;
  }

  & section {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr) 0;
  }
`;

export const MainWrapper = styled.div`
  padding: 60px 30px 0 0;
  display: flex;

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
  }
`;

export const LeftColumn = styled.div`
  position: relative;
  margin-right: 50px;
`;
export const MiddleColumn = styled.div`
  max-width: 100%;
`;

export const MenuWrapper = styled.div`
  height: calc(100vh - 120px);
  overflow-y: scroll;
  padding: 20px;
`;

export const Ul = styled.ul`
  list-style: none;
  margin: 0;

  & ul {
    margin: 0 0 0 10px;
    & > li > a {
      font-size: 14px;
    }
  }
`;

export const Li = styled.li`
  padding: 0;
  margin: 0;
`;

export const MenuLink = styled(Link)`
  font-size: 15px;
  line-height: 1.3em;
  padding: 0.6em 12px;
  display: block;
  text-decoration: none;
  border-radius: 6px;
  font-weight: ${({ active }) => (active ? "600" : "normal")};
  transition: color 60ms ease-out, background-color 60ms ease-out;
  color: ${({ active }) =>
    active ? "rgb(var(--page-theme-color));" : "#424D57"};
  background-color: ${({ active }) =>
    active ? "rgba(var(--page-theme-color), 0.07);" : ""};
  &:hover {
    text-decoration: none;
    color: rgb(var(--page-theme-color));
  }
`;

export const MenuAnchorLink = styled.a`
  font-size: 15px;
  line-height: 1.3em;
  padding: 0.6em 12px;
  display: block;
  text-decoration: none;
  border-radius: 6px;
  font-weight: ${({ active }) => (active ? "600" : "normal")};
  transition: color 60ms ease-out, background-color 60ms ease-out;
  color: ${({ active }) =>
    active ? "rgb(var(--page-theme-color));" : "#424D57"};
  background-color: ${({ active }) =>
    active ? "rgba(var(--page-theme-color), 0.07);" : ""};
  &:hover {
    text-decoration: none;
    color: rgb(var(--page-theme-color));
  }
`;

export const MenuElement = ({ url, title, onClick, active }) => (
  <Li onClick={onClick}>
    {/^#.*/.test(url) ? (
      <MenuAnchorLink href={url} active={active}>
        <HashtagIcon
          style={{ marginRight: "4px", marginTop: "1px", opacity: 0.6 }}
        />
        <span>{title}</span>
      </MenuAnchorLink>
    ) : (
      // an ugly fix beneath (active ? 1 : 0)
      <MenuLink to={url} active={active ? 1 : 0}>
        <ArticleIcon
          style={{ marginRight: "6px", marginBottom: "-2px", opacity: 0.6 }}
        />
        <span>{title}</span>
      </MenuLink>
    )}
  </Li>
);
