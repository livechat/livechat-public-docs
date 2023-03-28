import React, { useEffect } from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import { Input } from "@livechat/design-system";

import {
  VersionProvider,
  RatingProvider,
  PromotionProvider,
} from "../contexts";
import { AuthProvider } from "../contexts/auth";
import { getVersionsByGroup } from "../components/core/version";
import Header from "../components/core/header";
import Footer from "../components/core/Footer/Footer";
import Card from "components/core/Card/Card";
import Logo from "components/core/Logo/Logo";
import DeveloperPath from "components/core/DeveloperPath/DeveloperPath";
import SEO from "components/core/seo";
import { cards, devPaths } from "constant/cards";
import { setupDocsearch } from "utils";

const wrapperCss = css`
  max-width: 960px;
  margin: 80px auto 64px auto;
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
    width: 500px;
  }

  > header {
    margin-bottom: 32px;
  }
`;

const searchWrapperCss = css`
  display: none;
  @media (min-width: 768px) {
    display: block;
    position: relative;

    &:before {
      content: "";
      width: 22px;
      height: 22px;
      display: block;
      position: absolute;
      color: #424d57;
      left: 8px;
      top: 7px;
      z-index: 15;
      background-image: url("data:image/svg+xml,%3Csvg height='22' viewBox='0 0 24 24' width='22' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' fill='%23879098'/%3E%3Cpath d='M0 0h24v24H0z' fill='none' /%3E%3C/svg%3E");
    }
  }
`;

const searchCss = css`
  padding-left: 32px;
  width: 100%;
`;

const Index = () => {
  const ratingContext = { selectedRating: 0, saveRating: () => {} };
  const versions = getVersionsByGroup(null);
  const versionContext = {
    selected: 3.5,
    items: versions,
  };
  const promotionContext = { isActive: false, content: <div /> };

  useEffect(setupDocsearch, []);

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

            <div css={wrapperCss}>
              <div css={titleWrapperCss}>
                <Logo adjacent={"Platform Docs"} />
                <div css={searchWrapperCss}>
                  <Input
                    type="text"
                    id="search"
                    placeholder="Search the docs..."
                    css={searchCss}
                  />
                </div>
              </div>
              <h2>Build with Platform components</h2>
              <p>
                Text Platform offers you a variety of APIs, SDKs, and developer
                tools that allow for maximum flexibility in building software.
                Extend LiveChat and HelpDesk or build independent products.
              </p>
              <div css={cardsWrapperCss}>
                {cards.map((card, index) => (
                  <Card
                    key={index}
                    title={card.title}
                    link={card.link}
                    image={card.image}
                    badge={card.badge}
                  >
                    {card.copy}
                  </Card>
                ))}
              </div>
              <h2>Choose your path</h2>
              <div css={pathsWrapperCss}>
                {devPaths.map((path, index) => (
                  <DeveloperPath
                    key={index}
                    title={path.title}
                    subtitle={path.subtitle}
                    links={path.links}
                    image={path.image}
                  />
                ))}
              </div>
            </div>
            <Footer />
          </PromotionProvider>
        </VersionProvider>
      </RatingProvider>
    </AuthProvider>
  );
};

export default Index;
