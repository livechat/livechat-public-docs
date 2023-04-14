import React, { useContext, useState } from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { PromotionContext } from "contexts";
import Logo from "components/core/Logo/Logo";
import Search from "components/core/Search";

import Platform from "./Platform";
import APIsSDKs from "./APIsSDKs";
import Resources from "./Resources";

const Profile = dynamic(() => import("../Profile/Profile"), {
  ssr: false,
  loading: () => <p>...</p>,
});

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

  position: sticky;
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
  @media (min-width: 768px) {
    justify-content: normal;
  }
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
  @media (min-width: 768px) {
    display: flex;
    gap: 32px;
  }
`;

const MobileSearchField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    display: none;
  }
  width: 32px;
  margin-right: 10px;
  height: 100%;
`;

const DesktopSearchField = styled.div`
  display: none;
  @media (min-width: 768px) {
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

const Header = () => {
  const { isActive, content } = useContext(PromotionContext);
  const { pathname } = useRouter();
  const isNotHomeDirectory = pathname !== "/";

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
        {isNotHomeDirectory && (
          <DesktopSearchField className="DocSearch-Button-Desktop">
            <Search />
          </DesktopSearchField>
        )}

        <Profile />
        <MobileSearchField className="DocSearch-Button-Mobile">
          <Search />
        </MobileSearchField>
      </MenuWrapper>
    </Wrapper>
  );
};

export default Header;
