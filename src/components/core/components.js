import React from "react";
import posed from "react-pose";
import styled from "@emotion/styled";
import { HashtagIcon, ArticleIcon, ChevronRight } from "./icons";
import Link from "next/link";

const COLLAPSED = "COLLAPSED";
const EXPANDED = "EXPANDED";

export const Box = posed.div({
  COLLAPSED: {
    height: 0,
    opacity: 0,
    transition: { duration: 150 },
  },
  EXPANDED: {
    height: "auto",
    opacity: 1,
    transition: { duration: 150 },
  },
});

export const CollapsableSection = ({ expanded, children }) => (
  <Box
    pose={expanded ? EXPANDED : COLLAPSED}
    initialPose={COLLAPSED}
    withParent={false} // don't ever remove this
    style={{
      overflow: "hidden",
    }}
  >
    {children}
  </Box>
);

const NavWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  --page-theme-color: ${({ color }) => color};
  transition: margin 0.3s ease-out, box-shadow 0.3s ease-out;
  top: 0;
  background-color: #f6f6f7;
  border-right: 1px solid #dedede;

  position: fixed;
  z-index: 50;
  width: 300px;
  height: 100vh;
  margin-left: ${({ expanded = true }) => (expanded ? "0px" : "-280px")};
  box-shadow: ${({ expanded = true }) =>
    expanded ? "10px 10px 25px 0 rgba(0, 0, 0, 0.1)" : "none"};

  @media (min-width: 768px) {
    top: 60px;
    height: calc(100vh - 60px);
  }

  @media (min-width: 1024px) {
    position: sticky;
    width: 250px;
    box-shadow: none;
    border-right: 1px solid #e8e8e8;
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
  top: 14px;
  background-color: white;
  border: 1px solid #e8e8e8;
  border-radius: 30px;
  color: inherit;
  transition: transform 0.3s ease-out;
  transform: ${({ expanded = true }) => (expanded ? "rotate(180deg)" : "")};
`;

export const Nav = ({ expanded, setExpanded, children, ...rest }) => {
  return (
    <NavWrapper expanded={expanded} {...rest}>
      <NavSwitch
        href="#toggle-nav"
        expanded={expanded}
        onClick={(e) => {
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
  padding: 16px 28px 16px;
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

  &.redoc {
    display: block;
  }
`;

export const MainWrapper = styled.div`
  padding-right: 15px;
  display: flex;

  @media (min-width: 768px) {
    padding: 0 20px 0 0;
  }

  @media (min-width: 1024px) {
    padding: 0 30px 0 0;
  }
`;

export const LeftColumn = styled.div``;
export const MiddleColumn = styled.div`
  max-width: 100%;
  padding-bottom: ${({ noPadding }) => (noPadding ? "0" : "30vh")};
  position: relative;
  margin-left: ${({ noMargin }) => (noMargin ? "0" : "50px")};
  width: 100%;
`;

export const LeftColumnRedoc = styled.div`
  position: sticky;
  width: 250px;
  background-color: #f6f6f7;
  border-right: 1px solid #dedede;
  top: 60px;
  z-index: 1000;
  display: block;

  @media (max-width: 50rem) {
    display: none;
  }
`;

export const MenuWrapper = styled.div`
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const Li = styled.li`
  padding: 0;
  margin: 0;
`;

export const MenuLink = styled.a`
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
      <MenuAnchorLink href={url} active={active} title={title}>
        <HashtagIcon style={{ marginTop: "1px", opacity: 0.6 }} />
        &nbsp;
        <span>{title}</span>
      </MenuAnchorLink>
    ) : (
      <Link to={url} title={title}>
        <MenuLink active={active ? 1 : 0}>
          <ArticleIcon
            style={{ marginRight: "4px", marginBottom: "-2px", opacity: 0.6 }}
          />
          &nbsp;
          <span>{title}</span>
        </MenuLink>
      </Link>
    )}
  </Li>
);

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    margin-top: 50px;

    > label {
      margin: 0px 10px 5px 0;
    }
  }
`;
