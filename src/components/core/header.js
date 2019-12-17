/** @jsx jsx */ import { jsx, keyframes, css } from "@emotion/core";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { LiveChatLogo, CategoryIcon, WarningIcon } from "./icons";
import { useAllCategoriesMeta } from "../../hooks";
import { PopperTooltip } from "@livechat/design-system";
import { getVersionColor } from "../../utils";
import { API } from "../../constant";

const HeaderWrapper = styled.div`
  background: #293462;
  height: 60px;
  display: none;
  align-items: center;
  position: fixed;
  width: 100%;
  font-family: "Source Sans Pro";
  z-index: 99;
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
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 15px;
    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }
  }
`;

const linkCss = css`
  color: white;
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
    color: white;
  }
`;

const linkStyle = {
  borderTop: "4px solid transparent",
  borderBottom: "4px solid transparent",
  transition: "color 60ms ease-out"
};

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: rotate(0);
  }
  20%, 23% {
    transform: rotate(-5deg);
  }
  35% {
    transform: rotate(12deg);
  }
  45% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(0);
  }
  90% {
    transform: rotate(0);
  }
`;

const iconsCss = css`
  animation: ${bounce} 2s ease-out infinite;
`;

const iconStyle = { marginRight: "5px" };

const activeLinkStyle = color => ({
  borderBottom: `5px solid rgb(${color})`,
  color: "white"
});

const MenuElement = ({ label, href, slug, color, ...props }) => (
  <MenuElementWrapper {...props}>
    {href ? (
      <a href={href} css={linkStyle} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    ) : (
      <Link
        to={`/${slug}/`}
        partiallyActive
        css={linkStyle}
        activeStyle={activeLinkStyle(color)}
      >
        <CategoryIcon category={slug} style={iconStyle} />
        {label}
      </Link>
    )}
  </MenuElementWrapper>
);

const Warning = () => (
  <PopperTooltip
    isVisible={true}
    placement={"bottom-start"}
    triggerActionType={"hover"}
    trigger={
      <span>
        <WarningIcon
          width={18}
          style={{ display: "block", color: "#f1bb15" }}
          className={iconsCss}
        />
      </span>
    }
    closeOnOutsideClick
    zIndex={99999}
  >
    <div style={{ maxWidth: "320px" }}>
      <p>
        We're rolling out major changes to the documentation. Apologies for any
        inconvenience!
      </p>
      <p style={{ marginBottom: "10px" }}>
        If anything is missing, please let us know at{" "}
        <a
          href="mailto:developers@livechatinc.com"
          style={{ color: "white", textDecoration: "underline" }}
        >
          developers@livechatinc.com
        </a>
        .
      </p>
    </div>
  </PopperTooltip>
);

const Header = ({ selectedVersion }) => {
  const categories = useAllCategoriesMeta();
  const tabColor = getVersionColor(selectedVersion);

  return (
    <HeaderWrapper id="header">
      <LogoWrapper>
        <a href="/">
          <LiveChatLogo
            style={{ margin: "0 10px -6px 0", display: "block" }}
            width={80}
          />
        </a>
        <Link to="/" css={linkCss}>
          Platform Docs
        </Link>
      </LogoWrapper>

      <MenuListWrapper>
        <MenuList>
          {selectedVersion === API.DEV_REVIEW_VERSION && <Warning />}

          {categories.map(({ color, title, slug }) => (
            <MenuElement
              key={slug}
              color={tabColor}
              label={title}
              slug={slug}
            />
          ))}
          <MenuElement
            label={"Developer Console"}
            href={"/console/"}
            style={{ alignSelf: "flex-end", marginLeft: "auto" }}
          />
        </MenuList>
      </MenuListWrapper>
    </HeaderWrapper>
  );
};

export default Header;
