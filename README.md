# Platform Docs

[![Netlify Status](https://api.netlify.com/api/v1/badges/64c9d8bf-8fe6-4481-91d9-4258c3b9ae91/deploy-status)](https://app.netlify.com/sites/livechat-public-docs/deploys)

Hello 👋!

This is the repository for the [Platform documentation](https://platform.text.com/docs/).
Our documents are written in the [MDX format](https://mdxjs.com/), so pay attention to our custom tags when contributing to the docs.

## Who we are

Behind Text, Inc. there is a team of [passionate people](https://www.text.com/team/) building online customer service software with online chat, help desk software, chatbot, and web analytics capabilities.

With a suite of five products ([LiveChat](https://www.livechat.com/), [ChatBot](https://www.chatbot.com/), [HelpDesk](https://www.helpdesk.com/), [KnowledgeBase](https://www.knowledgebase.ai/), and [OpenWidget](https://openwidget.com/)) and their powerful APIs, we power customer communication for 37,000 companies in 150 countries.

[The Platform](https://platform.text.com/) is a range of products and services that can be used to build a variety of communication tools for businesses. Our [Developer Program](https://platform.text.com/developer-program/) and [Marketplace](https://www.text.com/marketplace/) create an open ecosystem for developers, partners, and customers.

## Node version

We require node version 14.x.

## Development

1. Fetch the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:3000/docs

## Production

We are using **Netlify** to serve the docs in production.

<!-- **Important:** `master` branch is automatically deployed to production. -->

You can simulate the production build process locally by running.

1. Run `npm run build`
2. Run `npm start`

## Feature branch / Deploy preview

In order to test your work before merging to master, **Netlify** provides **Deploy Preview**. When raising a PR, GitHub will provide **Netlify** notifications with the **Deploy Preview** url that can be found in the checks section.

## How to contribute

All contribution's welcome! [Read how to do it.](./CONTRIBUTING.md)

## Get in touch

- [Create a free developer account](https://platform.text.com/console/) in our Developer Program.
- [Join our Discord for Developers](https://discord.gg/rFbJkYQFwp)
- Send us an email at developers@livechat.com
- Follow us on [Twitter](https://twitter.com/LiveChatDev)
