import { MessagingIcon } from "assets/icons/cards/Messaging";
import { ManagementIcon } from "assets/icons/cards/Management";
import { DataReportingIcon } from "assets/icons/cards/DataReporting";
import { AgentAppSdkIcon } from "assets/icons/cards/AgentAppSDK";
import { ChatWidgetIcon } from "assets/icons/cards/ChatWidget";
import { HelpDeskApiIcon } from "assets/icons/cards/HelpDeskAPI";
import { AuthorizationIcon } from "assets/icons/cards/Authorization";
import { MonetizationIcon } from "assets/icons/cards/Monetization";
import { BeginnerPathIcon } from "assets/icons/cards/BeginnerPath";
import { AdvancedPathIcon } from "assets/icons/cards/AdvancedPath";
import { PartnerApiIcon } from "assets/icons/cards/PartnerAPI";
import { GuidesIcon } from "assets/icons/cards/Guides";
import { GettingStartedCardIcon } from "assets/icons/cards/GettingStartedCard";
import { ChangelogIcon } from "assets/icons/cards/Changelog";

export const cards = [
  {
    title: "Getting started",
    link: "/getting-started",
    copy: "Learn the fundamentals needed to work with Text APIs.",
    image: <GettingStartedCardIcon />,
  },
  {
    title: "Guides and tutorials",
    link: "/guides",
    copy: "Step-by-step explainers for using APIs and the Text Platform.",
    image: <GuidesIcon />,
  },
  {
    title: "Authorization",
    link: "/authorization",
    copy: "Authenticate and authorize users with OAuth flows. Manage scopes.",
    image: <AuthorizationIcon />,
  },
  {
    title: "Messaging",
    link: "/messaging",
    copy: "Event-based messaging for sync and async communication in LiveChat.",
    image: <MessagingIcon />,
  },
  {
    title: "Management",
    link: "/management",
    copy: "Configure resources. Set up webhooks and properties.",
    image: <ManagementIcon />,
  },
  {
    title: "Data and reporting",
    link: "/data-reporting",
    copy: "Extract data to build custom reports and dashboards.",
    image: <DataReportingIcon />,
  },
  {
    title: "Agent App SDK",
    link: "/extending-agent-app/products-sdk/agent-app-sdk",
    copy: "Integrate LiveChat with external software or a custom app.",
    image: <AgentAppSdkIcon />,
  },
  {
    title: "Chat Widget",
    link: "/extending-chat-widget",
    copy: "Monitor and interact with visitors via rich messages and apps.",
    image: <ChatWidgetIcon />,
  },
  {
    title: "Monetization",
    link: "/monetization",
    copy: "Seamless payment configuration right within the Platform.",
    image: <MonetizationIcon />,
  },
  {
    title: "HelpDesk API",
    link: "/helpdesk",
    copy: "Build integration for our ticketing system, HelpDesk.",
    image: <HelpDeskApiIcon />,
  },
  {
    title: "Partner API",
    link: "/partner-program",
    copy: "Manage Partner Program data and integrate it into your systems.",
    image: <PartnerApiIcon />,
  },
  {
    title: "Changelog",
    link: "/changelog",
    copy: "Keep track of changes and updates to the available APIs.",
    image: <ChangelogIcon />,
  },
];

export const devPaths = [
  {
    title: "I’m a beginner",
    subtitle: "Not sure where to start? Try the articles below:",
    image: <BeginnerPathIcon />,
    links: [
      {
        link: "/getting-started",
        name: "Platform Overview",
      },
      {
        link: "/guides/console-guides",
        name: "Console Guides",
      },
      {
        link: "/guides/livechat-apps",
        name: "Building LiveChat apps",
      },
      {
        link: "/guides/helpdesk-apps",
        name: "Building HelpDesk apps",
      },
      {
        link: "/monetization/how-to-monetize-apps",
        name: "How to monetize apps",
      },
    ],
  },
  {
    title: "I’m advanced",
    subtitle: "Already fluent in tech talk? Give those a try:",
    image: <AdvancedPathIcon />,
    links: [
      {
        link: "/messaging",
        name: "Messaging Overview",
      },
      {
        link: "/extending-agent-app/products-sdk",
        name: "Products SDK",
      },
      {
        link: "/extending-chat-widget/javascript-api",
        name: "Chat Widget JS API",
      },
      {
        link: "/management/webhooks",
        name: "Webhooks",
      },
      {
        link: "/data-reporting/reports-api",
        name: "Reports API",
      },
    ],
  },
];
