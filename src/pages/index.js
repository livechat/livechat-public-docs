import React, { useEffect } from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import {
  VersionProvider,
  RatingProvider,
  PromotionProvider,
} from "../contexts";
import { AuthProvider } from "../contexts/auth";
import { getVersionsByGroup } from "../components/core/version";
import Header from "components/core/Navbar/Header";
import Footer from "components/core/Footer/Footer";
import Menu from "components/core/SideNav/SideNav";
import Card from "components/core/Card/Card";
import DeveloperPath from "components/core/DeveloperPath/DeveloperPath";
import Search from "components/core/Search";
import SEO from "components/core/seo";
import { cards, devPaths } from "constants/cards";
import AsyncApiDocs from "components/extensions/AsyncApi";
import specMock from "../../testDoc.yml";

const wrapperCss = css`
  max-width: 960px;
  margin: 140px auto 64px auto;
  padding: 0 20px;

  > p {
    margin: 24px 0;
    font-size: 20px;
    line-height: 32px;
    color: #9898a0;
  }

  @media (min-width: 1024px) {
    padding: 0;
  }

  h2 {
    margin-top: 80px;
    font-size: 24px;

    &:last-of-type {
      margin-top: 20px;
    }
  }
`;

const cardsWrapperCss = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > a {
    margin-bottom: 40px;
  }

  @media (min-width: 480px) {
    justify-content: space-between;
  }
`;

const pathsWrapperCss = css`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const titleWrapperCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > div {
    margin-top: 24px;
    width: 500px;
  }

  > header {
    margin-bottom: 32px;
  }
`;

const textLogoCss = css`
  font-weight: 600;
  font-size: 32px;
  line-height: 34px;
  display: flex;
  align-items: center;
  letter-spacing: -0.5px;
  margin-bottom: 24px;
  color: #424d57;

  .carrier {
    margin-bottom: 4px;
  }

  span:last-of-type {
    margin-left: 16px;
  }
`;

const Index = () => {
  const ratingContext = { selectedRating: 0, saveRating: () => {} };
  const versions = getVersionsByGroup(null);
  const versionContext = {
    selected: 3.5,
    items: versions,
  };
  const promotionContext = { isActive: false, content: <div /> };

  return (
    <AuthProvider>
      <RatingProvider value={ratingContext}>
        <VersionProvider value={versionContext}>
          <PromotionProvider value={promotionContext}>
            <SEO
              desc="Text enables entrepreneurs to build data-intelligent products for customer service apps. Browse the Platform docs to learn about developer tools and APIs."
              title="Text Platform Docs"
            />
            <Header />
            <Menu />

            <AsyncApiDocs schema={specMock}/>
            <Footer />
          </PromotionProvider>
        </VersionProvider>
      </RatingProvider>
    </AuthProvider>
  );
};

export default Index;
