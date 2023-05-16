import { MessagingIcon } from "assets/icons/cards/Messaging";
import { ManagementIcon } from "assets/icons/cards/Management";
import { DataReportingIcon } from "assets/icons/cards/DataReporting";
import { AgentAppSdkIcon } from "assets/icons/cards/AgentAppSDK";
import { ChatWidgetIcon } from "assets/icons/cards/ChatWidget";
import { HelpDeskApiIcon } from "assets/icons/cards/HelpDeskAPI";
import { AuthorizationIcon } from "assets/icons/cards/Authorization";
import { MonetizationIcon } from "assets/icons/cards/Monetization";
import { DevConsoleToolsIcon } from "assets/icons/cards/DevConsoleTools";
import { TextApiIcon } from "assets/icons/cards/TextAPI";
import { BeginnerPathIcon } from "assets/icons/cards/BeginnerPath";
import { AdvancedPathIcon } from "assets/icons/cards/AdvancedPath";

export const cards = [
  {
    title: "Messaging",
    link: "/messaging",
    copy: "Event-based messaging for sync and async communication.",
    image: <MessagingIcon />,
  },
  {
    title: "Management",
    link: "/management",
    copy: "Configure resources. Set up webhooks and properties.",
    image: <ManagementIcon />,
  },
  {
    title: "Data & Reporting",
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
    title: "HelpDesk API",
    link: "/getting-started/helpdesk-apps/helpdesk-api",
    copy: "Build integration for our ticketing system, HelpDesk.",
    image: <HelpDeskApiIcon />,
  },
  {
    title: "Authorization",
    link: "/authorization",
    copy: "Authenticate and authorize users with OAuth flows. Manage scopes.",
    image: <AuthorizationIcon />,
  },
  {
    title: "Monetization",
    link: "/monetization",
    copy: "Seamless payment configuration right within the Platform.",
    image: <MonetizationIcon />,
  },
  {
    title: "Developer Console Guides",
    link: "/getting-started/app-guides",
    copy: "Learn how to configure your app with Developer Console tools.",
    image: <DevConsoleToolsIcon />,
  },
  {
    title: "Text API",
    link: "/text-api",
    copy: "Build products powered by advanced text operations.",
    image: <TextApiIcon />,
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
        link: "/getting-started/app-guides",
        name: "App Guides",
      },
      {
        link: "/getting-started/livechat-apps",
        name: "Building LiveChat apps",
      },
      {
        link: "/getting-started/helpdesk-apps",
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
