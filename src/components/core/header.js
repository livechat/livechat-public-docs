/** @jsx jsx */ import { jsx } from "@emotion/core";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { LiveChatLogo, CategoryIcon } from "./icons";
import { useAllCategoriesMeta } from "../../hooks";
import { css } from "@emotion/core";

const HeaderWrapper = styled.div`
  background: #293462;
  height: 60px;
  display: none;
  align-items: center;
  position: fixed;
  width: 100%;
  font-family: "Source Sans Pro";
  z-index: 99;
  white-space: nowrap;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const LogoWrapper = styled.nav`
  display: flex;
  font-size: 15px;
  margin: 0 20px;
  align-items: center;
`;

const MenuListWrapper = styled.div`
  margin: 0;
  padding: 0;
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const MenuElementWrapper = styled.li`
  padding: 0;
  margin: 0 5px;
  a {
    padding: 14px;
    height: 60px;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 15px;
    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }
  }
`;

const linkStyle = css`
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  transition: color 60ms ease-out;
`;

const iconStyle = css`
  margin-right: 5px;
`;

const activeLinkStyle = color => ({
  borderBottom: `5px solid rgb(${color})`,
  color: "white"
});

const MenuElement = ({ label, slug, color }) => (
  <MenuElementWrapper>
    <Link
      to={`/${slug}/`}
      partiallyActive
      css={linkStyle}
      activeStyle={activeLinkStyle(color)}
    >
      <CategoryIcon category={slug} css={iconStyle} />
      {label}
    </Link>
  </MenuElementWrapper>
);

const Header = () => {
  const categories = useAllCategoriesMeta();

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <a href="/">
          <LiveChatLogo
            css={css`
              margin: 0 10px -6px 0;
              display: block;
            `}
            width={80}
          />
        </a>
        <Link
          to="/"
          css={css`
            color: white !important;
            text-decoration: none;
            font-weight: 600;
          `}
        >
          Platform Docs
        </Link>
      </LogoWrapper>
      <MenuListWrapper>
        <MenuList>
          {categories.map(({ color, title, slug }) => (
            <MenuElement key={slug} color={color} label={title} slug={slug} />
          ))}
        </MenuList>
      </MenuListWrapper>
    </HeaderWrapper>
  );
};

export default Header;
