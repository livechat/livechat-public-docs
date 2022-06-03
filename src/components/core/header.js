import { useContext, useState } from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import Magnify from "react-material-icon-svg/dist/Magnify";
import Link from "next/link";
import styled from "@emotion/styled";
import { Search } from "./Search";
import { PromotionContext } from "../../contexts";
import { HelpDeskIcon } from "../../assets/icons/hd";
import { LiveChatIcon } from "../../assets/icons/lc";
import { logAmplitudeEvent } from "../../utils/index";
import Products from "../core/Dropdowns/Products";
import Platform from "../core/Dropdowns/Platform";
import Resources from "../core/Dropdowns/Resources";

const HeaderWrapper = styled.div`
  background: #4a4a55;
  height: ${(props) => (props.isSearchOpen ? "110px" : "84px")};
  @media (min-width: 768px) {
    height: ${(props) => (props.promoIsActive ? "100px" : "84px")};
  }
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  font-family: "Colfax";
  z-index: 99;
  flex-direction: column;
  display: flex;
`;

const MenuWrapper = styled.div`
  background: #4a4a55;
  height: 84px;
  width: 100%;
  font-family: "Colfax";
  display: flex;
  justify-content: space-between;
  @media (min-width: 768px) {
    justify-content: normal;
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
  display: none;
  padding-left: 50px;
  @media (min-width: 768px) {
    display: flex;

    > * {
      margin-left: 60px;
    }
  }
`;

const linkCss = css`
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
    color: white;
  }
`;

const VLine = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  height: 28px;
  width: 1px;
  margin: 0 10px;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    display: none;
  }
  width: 32px;
  height: 32px;
  margin: 10px 10px 0px 0px;
  cursor: pointer;
  border-radius: 100%;
  background-color: ${({ openSearch }) => (openSearch ? "#6E6E7C" : "")};
`;

const SearchField = styled.div`
  background-color: #4a4a55;
  height: 50px;
  width: 100%;
  @media (min-width: 768px) {
    display: none;
  }

  padding: 0px 10px;
`;

const SearchWrapper = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg:first-of-type {
    margin-right: 10px;
  }
`;

const consoleLinkCss = css`
  border: 1px solid #ffffff;
  border-radius: 4px;
  color: #ffffff;
  margin: 25px;
  width: 200px;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
    color: white;
  }
`;

const Header = () => {
  const { isActive, content } = useContext(PromotionContext);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <HeaderWrapper
      id="header"
      promoIsActive={isActive}
      isSearchOpen={openSearch}
    >
      {isActive && <PromoBanner>{content}</PromoBanner>}
      <MenuWrapper>
        <LogoWrapper>
          <Link href="/" passHref>
            <a css={linkCss}>Platform Docs</a>
          </Link>
          <VLine />
          <IconsWrapper>
            <LiveChatIcon />
            <HelpDeskIcon />
          </IconsWrapper>
        </LogoWrapper>

        <MenuListWrapper>
          <Products />
          <Platform />
          <Resources />
        </MenuListWrapper>
        <SearchIconWrapper
          openSearch={openSearch}
          onClick={() => setOpenSearch(!openSearch)}
        >
          <Magnify fill="white" />
        </SearchIconWrapper>

        <SearchWrapper>
          <Search />
        </SearchWrapper>
        <a
          href="https://developers.livechat.com/console/"
          css={consoleLinkCss}
          onClick={() => logAmplitudeEvent("External link clicked")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to console
        </a>
      </MenuWrapper>
      {openSearch && (
        <SearchField>
          <Search />
        </SearchField>
      )}
    </HeaderWrapper>
  );
};

export default Header;
