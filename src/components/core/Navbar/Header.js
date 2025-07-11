import React, { useContext, useState } from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "react-material-icon-svg/dist/Menu";
import Close from "react-material-icon-svg/dist/Close";

import { PromotionContext } from "contexts";
import Logo from "components/core/Logo/Logo";
import Search from "components/core/Search";

import Platform from "./Platform";
import APIsSDKs from "./APIsSDKs";
import Resources from "./Resources";
import DeveloperConsole from "./DeveloperConsole";
import MobileMenu from "./MobileMenu/MobileMenu";

const Wrapper = styled.div`
  font-family: Colfax, colfax-web, Proxima Nova, Open Sans, Gill Sans MT,
    Gill Sans, Corbel, Arial, sans-serif;
  background-color: #4a4a55;
  height: ${({ isSearchOpen }) => (isSearchOpen ? "110px" : "60px")};
  @media (min-width: 768px) {
    height: ${({ promoIsActive }) => (promoIsActive ? "100px" : "60px")};
  }

  display: flex;
  align-items: center;
  flex-direction: column;

  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
`;

const LogoWrapper = styled.nav`
  display: flex;
  font-size: 15px;
  margin: 0 20px;
  align-items: center;
  height: 60px;

  > a {
    > svg {
      margin: 0;
      display: block;
      height: 24px;
    }
  }
`;

const MenuWrapper = styled.div`
  background: #4a4a55;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const MenuListWrapper = styled.div`
  margin: 0;
  padding: 0;
  max-width: calc(100% - 60px);
  width: calc(100% - 60px);
  overflow-x: auto;
  overflow-y: hidden;
  display: none;
  margin-right: 10px;
  margin-left: 40px;
  @media (min-width: 1024px) {
    display: flex;
    gap: 32px;
  }
`;

const MobileSearchField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1024px) {
    display: none;
  }
  height: 100%;
`;

const DesktopSearchField = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    width: 192px;
    margin-right: 16px;
  }
`;

const linkCss = css`
  color: white;
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
  margin-left: 8px;

  &:hover {
    text-decoration: none;
    color: white;
  }
`;

const iconCss = css`
  @media (min-width: 1024px) {
    display: none;
  }
`;

const PromoBanner = styled.div`
  width: 100%;
  background-color: #ff5100;
  color: white;
  font-weight: 500;
  padding: 8px;
  text-align: center;
  a,
  a:visited,
  a:active,
  a:hover {
    color: white;
    text-decoration: underline;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuIcon = styled(Menu)`
  display: flex;
  margin-right: 16px;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const CloseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
  margin-right: 8px;
`;

const Header = () => {
  const { isActive, content } = useContext(PromotionContext);
  const { pathname } = useRouter();
  const isNotHomeDirectory = pathname !== "/";

  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  return (
    <Wrapper promoIsActive={isActive}>
      {isActive && <PromoBanner>{content}</PromoBanner>}
      <MenuWrapper>
        <LogoWrapper>
          <a href="https://text.com/" css={linkCss}>
            <Logo />
          </a>
          <Link href="/" passHref>
            <a css={linkCss}>Platform Docs</a>
          </Link>
        </LogoWrapper>

        <MenuListWrapper>
          <Platform />
          <APIsSDKs />
          <Resources />
        </MenuListWrapper>

        <ActionsWrapper>
          <DeveloperConsole />
          {isNotHomeDirectory && (
            <DesktopSearchField className="DocSearch-Button-Desktop">
              <Search />
            </DesktopSearchField>
          )}

          {!openMenu && (
            <MobileSearchField className="DocSearch-Button-Mobile">
              <Search />
            </MobileSearchField>
          )}
          {!openMenu ? (
            <MenuIcon
              fill="#ffffff"
              width="32px"
              height="28px"
              css={iconCss}
              onClick={handleOpenMenu}
            />
          ) : (
            <CloseWrapper onClick={() => setOpenMenu(false)} css={iconCss}>
              Close
              <Close fill="#ffffff" width="32px" height="28px" />
            </CloseWrapper>
          )}
        </ActionsWrapper>
      </MenuWrapper>

      {openMenu && <MobileMenu />}
    </Wrapper>
  );
};

export default Header;
