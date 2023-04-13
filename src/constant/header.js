import React from "react";
import Twitter from "react-material-icon-svg/dist/Twitter";
import Github from "react-material-icon-svg/dist/Github";
import UnfoldMoreVertical from "react-material-icon-svg/dist/UnfoldMoreVertical";
import { Discord } from "assets/icons/Discord";
import { UpdatesIcon } from "assets/icons/Updates";
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

export const apis = [
  {
    title: "Agent Chat API",
    description: "A service for all products",
    link: "/messaging/agent-chat-api",
  },
  {
    title: "Customer Chat API",
    description: "Ready-to-use components",
    link: "/messaging/customer-chat-api",
  },
  {
    title: "Chat Widget JS API",
    description: "The fundamentals of LiveChat authorization",
    link: "/extending-chat-widget/javascript-api",
  },
  {
    title: "Configuration API",
    description: "Go, Python, JavaScript",
    link: "/management/configuration-api",
  },
];

export const sdks = [
  {
    title: "Accounts SDK",
    description: "Implement authorization",
    link: "/authorization/sign-in-with-livechat",
  },
  {
    title: "Agent App SDK",
    description: "Extend the LiveChat App",
    link: "/extending-agent-app/products-sdk/agent-app-sdk",
  },
  {
    title: "HelpDesk SDKs",
    description: "Extend HelpDesk",
    link: "/extending-agent-app/products-sdk/helpdesk-sdk",
  },
  {
    title: "Customer SDK",
    description: "Build a custom widget",
    link: "/extending-chat-widget/customer-sdk",
  },
];

export const platform = {
  leftColumn: [
    {
      title: "Authorization",
      description: "Accounts SDK; scope references",
      link: "/authorization",
      image: <AuthorizationIcon fill="#6BC5A8" />,
    },
    {
      title: "Messaging",
      description: "Web and RTM APIs for chatting",
      link: "/messaging",
      image: <MessagingIcon fill="#7A2CF5" />,
    },
    {
      title: "Management",
      description: "Webhooks, properties, and more",
      link: "/management",
      image: <ManagementIcon fill="#2469F6" />,
    },
    {
      title: "Data & reporting",
      description: "Leverage the Reports API",
      link: "/data-reporting",
      image: <DataReportingIcon fill="#55B4E0" />,
    },
    {
      title: "Monetization",
      description: "Monetization tools",
      link: "/monetization",
      image: <MonetizationIcon fill="#9061CC" />,
    },
  ],
  rightColumn: [
    {
      title: "Agent App SDK",
      description: "Extend the LiveChat App",
      link: "/extending-agent-app",
      image: <AgentAppSdkIcon fill="#FE5000" />,
    },
    {
      title: "Chat Widget",
      description: "Extend the Chat Widget",
      link: "/extending-chat-widget",
      image: <ChatWidgetIcon fill="#EAB23E" />,
    },
    {
      title: "HelpDesk API",
      description: "Integrate with HelpDesk",
      link: "/getting-started/helpdesk-apps/helpdesk-api",
      image: <HelpDeskApiIcon fill="#2FC774" />,
    },
    {
      title: "Developer Tools",
      description: "How-tos for Developer Console",
      link: "https://developers.livechat.com/console/",
      image: <DevConsoleToolsIcon fill="#A27167" />,
    },
    {
      title: "Text API",
      description: "Various Text operations",
      link: "https://text.com/universe",
      image: <TextApiIcon fill="#29292E" />,
      badge: true,
    },
  ],
};

export const resources = [
  {
    title: "How-to guides",
    description: "Grouped by use case",
    link: "https://developers.livechat.com/marketplace-guidelines/",
  },
  {
    title: "Design System",
    description: "Ready-to-use components",
    link: "https://livechat.github.io/design-system/",
  },
  {
    title: "Video tutorials",
    description: "Tutorials, courses, webinars",
    link: "https://developers.livechat.com/building-apps-crash-course/",
  },
  {
    title: "Sample apps",
    description: "Some examples for reference",
    link: "https://github.com/livechat/tag-master",
  },
];

export const connects = [
  {
    title: "Developer Program",
    link: "https://developers.livechat.com/developer-program/",
    image: <UnfoldMoreVertical />,
  },
  {
    title: "Platform Updates",
    link: "https://developers.livechat.com/updates/",
    image: <UpdatesIcon />,
  },
  {
    title: "Discord",
    link: process.env.NEXT_PUBLIC_DISCORD_FOOTER_URL,
    image: <Discord fill="#000000" />,
  },
  {
    title: "Docs on GitHub",
    link: process.env.NEXT_PUBLIC_GITHUB_LIVECHAT,
    image: <Github />,
  },
  {
    title: "Platform Twitter",
    link: process.env.NEXT_PUBLIC_TWITTER_LIVECHAT,
    image: <Twitter />,
  },
];
