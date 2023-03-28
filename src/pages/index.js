import React, { useEffect, useState } from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import { Input } from "@livechat/design-system";
import Link from "next/link";

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

const searchCss = css`
  display: none;
  @media (min-width: 768px) {
    display: block;
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
  const basePath = process.env.CONTEXT === "deploy-preview" ? "" : "/docs";

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
                <div css={searchCss}>
                  <Input
                    type="text"
                    id="search"
                    placeholder="Search the docs..."
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
