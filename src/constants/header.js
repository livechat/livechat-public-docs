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
import { GettingStartedIcon } from "assets/icons/cards/GettingStarted";
import { TextApiIcon } from "assets/icons/cards/TextAPI";

export const apis = [
  {
    title: "Agent Chat API",
    description: "Chat as an agent",
    link: "/messaging/agent-chat-api",
  },
  {
    title: "Customer Chat API",
    description: "Chat as as a customer",
    link: "/messaging/customer-chat-api",
  },
  {
    title: "Chat Widget JS API",
    description: "Interact with the Chat Widget",
    link: "/extending-chat-widget/javascript-api",
  },
  {
    title: "Configuration API",
    description: "Manage resources",
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
      title: "Getting started",
      description: "Kick off your journey with Platform",
      link: "/getting-started",
      primaryIcon: <GettingStartedIcon />,
      secondaryIcon: <GettingStartedIcon fill="#ffffff" background="#4a4a55" />,
    },
    {
      title: "Authorization",
      description: "Accounts SDK; scope references",
      link: "/authorization",
      primaryIcon: <AuthorizationIcon fill="#6BC5A8" />,
      secondaryIcon: <AuthorizationIcon fill="#ffffff" background="#4a4a55" />,
    },
    {
      title: "Messaging",
      description: "Web and RTM APIs for chatting",
      link: "/messaging",
      primaryIcon: <MessagingIcon fill="#7A2CF5" />,
      secondaryIcon: <MessagingIcon fill="#ffffff" background="#4a4a55" />,
    },
    {
      title: "Management",
      description: "Webhooks, properties, and more",
      link: "/management",
      primaryIcon: <ManagementIcon fill="#2469F6" />,
      secondaryIcon: <ManagementIcon fill="#ffffff" background="#4a4a55" />,
    },
    {
      title: "Data & reporting",
      description: "Leverage the Reports API",
      link: "/data-reporting",
      primaryIcon: <DataReportingIcon fill="#55B4E0" />,
      secondaryIcon: <DataReportingIcon fill="#ffffff" background="#4a4a55" />,
    },
  ],
  rightColumn: [
    {
      title: "Monetization",
      description: "Monetization tools",
      link: "/monetization",
      primaryIcon: <MonetizationIcon fill="#9061CC" />,
      secondaryIcon: <MonetizationIcon fill="#ffffff" background="#4a4a55" />,
    },
    {
      title: "Agent App",
      description: "Extend the LiveChat App",
      link: "/extending-agent-app",
      primaryIcon: <AgentAppSdkIcon fill="#FE5000" />,
      secondaryIcon: <AgentAppSdkIcon fill="#ffffff" background="#4a4a55" />,
    },
    {
      title: "Chat Widget",
      description: "Extend the Chat Widget",
      link: "/extending-chat-widget",
      primaryIcon: <ChatWidgetIcon fill="#EAB23E" />,
      secondaryIcon: <ChatWidgetIcon fill="#ffffff" background="#4a4a55" />,
    },
    {
      title: "HelpDesk API",
      description: "Integrate with HelpDesk",
      link: "/getting-started/helpdesk-apps/helpdesk-api",
      primaryIcon: <HelpDeskApiIcon fill="#2FC774" />,
      secondaryIcon: <HelpDeskApiIcon fill="#ffffff" background="#4a4a55" />,
    },
    {
      title: "Text API",
      description: "Advanced text operations",
      link: "/text",
      primaryIcon: <TextApiIcon fill="#29292E" />,
      secondaryIcon: <TextApiIcon fill="#ffffff" background="#4a4a55" />,
    },
  ],
};

export const resources = [
  {
    title: "Design System",
    description: "Ready-to-use components",
    link: "https://design.livechat.com/",
  },
  {
    title: "Figma templates",
    description: "Visual assets for the Marketplace",
    link: "https://www.figma.com/community/file/1192489623743762740",
  },
  {
    title: "Video tutorials",
    description: "Tutorials, courses, webinars",
    link:
      "https://www.youtube.com/watch?v=NVBthQxCZqY&list=PL7llGGeQNj4z8Up8tmq8JKThsVoq1XL-u&ab_channel=LiveChatInsider",
  },
  {
    title: "Developer CLI",
    description: "Build apps from the command line",
    link: "https://www.npmjs.com/package/@livechat/developer-cli",
  },
];

export const connects = [
  {
    title: "Developer Console",
    link: process.env.NEXT_PUBLIC_CONSOLE_URL,
    primaryIcon: <UnfoldMoreVertical />,
    secondaryIcon: <UnfoldMoreVertical fill="#ffffff" />,
  },
  {
    title: "Resource Center",
    link: "https://platform.text.com/resource-center/updates",
    primaryIcon: <UpdatesIcon />,
    secondaryIcon: <UpdatesIcon fill="#ffffff" />,
  },
  {
    title: "Discord",
    link: process.env.NEXT_PUBLIC_DISCORD_FOOTER_URL,
    primaryIcon: <Discord fill="#000000" />,
    secondaryIcon: <Discord fill="#ffffff" />,
  },
  {
    title: "Docs on GitHub",
    link: process.env.NEXT_PUBLIC_GITHUB_LIVECHAT,
    primaryIcon: <Github />,
    secondaryIcon: <Github fill="#ffffff" />,
  },
  {
    title: "Platform Twitter",
    link: process.env.NEXT_PUBLIC_TWITTER_LIVECHAT,
    primaryIcon: <Twitter />,
    secondaryIcon: <Twitter fill="#ffffff" />,
  },
];
