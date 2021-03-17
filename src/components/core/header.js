import { useContext } from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import Link from "next/link";
import styled from "@emotion/styled";
import { LiveChatLogo, CategoryIcon } from "./icons";
import categories from "../../configs/categories";
import { getVersionColor } from "../../utils";
import { VersionContext, PromotionContext } from "../../contexts";
import { logAmplitudeEvent } from "../../utils/index";

const HeaderWrapper = styled.div`
  background: #4a4a55;
  height: ${(props) => (props.promoIsActive ? "100px" : "60px")};
  display: none;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  font-family: "Colfax";
  z-index: 99;
  @media (min-width: 768px) {
    flex-direction: column;
    display: flex;
  }
`;

const MenuWrapper = styled.div`
  background: #4a4a55;
  height: 60px;
  width: 100%;
  font-family: "Colfax";
  display: flex;
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
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const MenuElementWrapper = styled.li`
  padding: 0;
  margin: 0 5px;
  white-space: nowrap;
  a {
    padding: 14px;
    height: 60px;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
    font-size: 15px;
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
`;

const linkCss = css`
  color: white;
  text-decoration: none;
  font-weight: 500;
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

const linkStyle = {
  borderTop: "4px solid transparent",
  borderBottom: "4px solid transparent",
  transition: "color 60ms ease-out",
};

const iconStyle = { marginRight: "5px", marginBottom: "1px" };

const activeLinkStyle = (color) => ({
  borderBottom: `5px solid rgb(${color})`,
  color: "white",
});

const MenuElement = ({ label, href, slug, color, ...props }) => (
  <MenuElementWrapper {...props}>
    {href ? (
      <a
        href={href}
        css={linkStyle}
        onClick={() => logAmplitudeEvent("External link clicked", { href })}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    ) : (
      <Link href={`/${slug}/`} partiallyActive passHref>
        <a
          css={linkStyle}
          activeStyle={activeLinkStyle(color)}
          onClick={() =>
            logAmplitudeEvent("Top menu tab clicked", {
              slug,
            })
          }
        >
          <CategoryIcon category={slug} style={iconStyle} />
          {label}
        </a>
      </Link>
    )}
  </MenuElementWrapper>
);

const Header = () => {
  const { items: versions, selected: selectedVersion } = useContext(
    VersionContext
  );
  const tabColor = getVersionColor(selectedVersion, versions);
  const { isActive, content } = useContext(PromotionContext);

  return (
    <HeaderWrapper id="header" promoIsActive={isActive}>
      {isActive && <PromoBanner>{content}</PromoBanner>}
      <MenuWrapper>
        <LogoWrapper>
          <a href="/">
            <LiveChatLogo style={{ margin: "0", display: "block" }} />
          </a>
          <VLine />
          <Link href="/">
            <a css={linkCss}>Platform Docs</a>
          </Link>
        </LogoWrapper>

        <MenuListWrapper>
          <MenuList>
            {categories
              .filter(({ hide }) => !hide)
              .map(({ title, slug }) => (
                <MenuElement
                  key={slug}
                  color={tabColor}
                  label={title}
                  slug={slug}
                />
              ))}
            <MenuElement
              label={"Console"}
              href={"/console/"}
              style={{ alignSelf: "flex-end", marginLeft: "auto" }}
            />
          </MenuList>
        </MenuListWrapper>
      </MenuWrapper>
    </HeaderWrapper>
  );
};

export default Header;
