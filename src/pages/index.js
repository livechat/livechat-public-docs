/** @jsx jsx */ import { jsx, css } from "@emotion/core";

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
import DeveloperPath from "components/core/DeveloperPath/DeveloperPath";
import { cards, devPaths } from "constant/cards";

const wrapperCss = css`
  max-width: 960px;
  margin: 0 auto;
  margin-bottom: 64px;
  padding 0 20px;

  > p {
    font-size: 24px;
    line-height: 32px;
    color: #9898a0;
  }

  @media (min-width: 1024px) {
	  padding: 0;
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

export default function Index() {
  const ratingContext = { selectedRating: 0, saveRating: () => {} };
  const versions = getVersionsByGroup(null);
  const versionContext = {
    selected: 3.5,
    items: versions,
  };
  const promotionContext = { isActive: false, content: <div /> };
  const basePath = process.env.CONTEXT === "deploy-preview" ? "" : "/docs";

  return (
    <AuthProvider>
      <RatingProvider value={ratingContext}>
        <VersionProvider value={versionContext}>
          <PromotionProvider value={promotionContext}>
            <Header />
            <div css={wrapperCss}>
              <h1>Text Platform Docs</h1>
              <p>
                Text Platform offers you a variety of APIs, SDKs, and developer
                tools that allow for maximum flexibility in building software:
                from smart, lightweight widgets to sophisticated solutions.
                Extend LiveChat and HelpDesk or build independent products.{" "}
              </p>
              <h2>Build with Platform components</h2>
              <div css={cardsWrapperCss}>
                {cards.map((card) => (
                  <Card
                    title={card.title}
                    link={card.link}
                    image={basePath + card.image}
                  >
                    {card.copy}
                  </Card>
                ))}
              </div>
              <h2>Choose your path</h2>
              <div css={pathsWrapperCss}>
                {devPaths.map((path) => (
                  <DeveloperPath
                    title={path.title}
                    subtitle={path.subtitle}
                    links={path.links}
                    image={basePath + path.image}
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
}
