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

const wrapperCss = css`
  max-width: 960px;
  margin: 0 auto;
  margin-bottom: 64px;

  > p {
    font-size: 24px;
    line-height: 32px;
    color: #9898a0;
  }
`;

const cardsWrapperCss = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > a {
    margin-bottom: 40px;
  }
`;

const pathsWrapperCss = css`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 32px;
`;

const cards = [
  {
    title: "Messaging",
    link: "/messaging",
    copy: "Event-based messaging for sync and async communication.",
    image: "/docs/icons/messaging.png",
  },
  {
    title: "Managment",
    link: "/managment",
    copy: "Configure resources. Set up webhooks and properties.",
    image: "/docs/icons/managment.png",
  },
  {
    title: "Data & Reporting",
    link: "/messaging",
    copy: "Extract data to build custom reports and dashboards.",
    image: "/docs/icons/data-and-raporting.png",
  },
  {
    title: "Agent App SDK",
    link: "/messaging",
    copy: "Integrate LiveChat with external software or a custom app.",
    image: "/docs/icons/agent-app-sdk.png",
  },
  {
    title: "Chat Widget",
    link: "/messaging",
    copy: "Monitor and interact with visitors via rich messages and apps.",
    image: "/docs/icons/chat-widget.png",
  },
  {
    title: "HelpDesk API",
    link: "/managment",
    copy: "Build integration for our ticketing system, HelpDesk.",
    image: "/docs/icons/help-desk-api.png",
  },
  {
    title: "Authorization",
    link: "/messaging",
    copy: "Authenticate and authorize users with OAuth flows. Manage scopes.",
    image: "/docs/icons/authorization.png",
  },
  {
    title: "Monetization",
    link: "/messaging",
    copy: "Seamless payment configuration right within the Platform.",
    image: "/docs/icons/monetization.png",
  },
  {
    title: "Developer Console Tools",
    link: "/messaging",
    copy: "Configure your app with a GUI instead of calling the API.",
    image: "/docs/icons/developer-console-tools.png",
  },
  {
    title: "Text API",
    link: "/messaging",
    copy: "Build products powered by advanced text operations.",
    image: "/docs/icons/text-api.png",
  },
];

const devPaths = [
  {
    title: "I’m a beginner",
    subtitle: "Not sure where to start? Try the articles below:",
    image: "/docs/icons/beginner-path.png",
    links: [
      {
        link: "",
        name: "Platform Overview",
      },
      {
        link: "",
        name: "App Guides",
      },
      {
        link: "",
        name: "Building LiveChat apps",
      },
      {
        link: "",
        name: "Building HelpDesk apps",
      },
      {
        link: "",
        name: "How to monetize apps",
      },
    ],
  },
  {
    title: "I’m advanced",
    subtitle: "Already fluent in tech talk? Give those a try:",
    image: "/docs/icons/advanced-path.png",
    links: [
      {
        link: "",
        name: "Messaging Overview",
      },
      {
        link: "",
        name: "Products SDK",
      },
      {
        link: "",
        name: "Chat Widget JS API",
      },
      {
        link: "",
        name: "Webhooks",
      },
      {
        link: "",
        name: "Reports API",
      },
    ],
  },
];

export default function Index() {
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
                  <Card title={card.title} link={card.link} image={card.image}>
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
}
