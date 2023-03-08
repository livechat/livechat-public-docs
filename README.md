# LiveChat Platform Docs

[![Netlify Status](https://api.netlify.com/api/v1/badges/64c9d8bf-8fe6-4481-91d9-4258c3b9ae91/deploy-status)](https://app.netlify.com/sites/livechat-public-docs/deploys)

Hello 👋!

This is the repository for the [Platform documentation](https://developers.livechat.com/docs/).
Our documents are written in the [MDX format](https://mdxjs.com/), so pay attention to our custom tags when contributing to the docs.

## Who we are

Behind LiveChat, Inc. there is a team of [passionate people](https://www.livechat.com/team/) building online customer service software with online chat, help desk software, chatbot, and web analytics capabilities.

With a suite of four products ([LiveChat](https://www.livechat.com/), [ChatBot](https://www.chatbot.com/), [HelpDesk](https://www.helpdesk.com/), [KnowledgeBase](https://www.knowledgebase.ai/)) and their powerful APIs, we power customer communication for 36,000 companies in 150 countries.

[The Platform](https://developers.livechat.com/) is a range of products and services that can be used to build a variety of communication tools for businesses. Our [Developer Program](https://developers.livechat.com/) and [Marketplace](https://www.livechat.com/marketplace/) create an open ecosystem for developers, partners, and customers.

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

Currently, deploy previews need to be generated manually.
<!-- In order to test your work before merging to master, **Netlify** provides **Deploy Preview**. When raising a PR, github will provide **Netlify** notifications with the **Deploy Preview** url. -->

## Versioning

This is the current versioning for the Messaging APIs (Agent Chat API, Customer Chat API), the Configuration API, and Reports API:

|                 | Messaging APIs | Configuration API | Reports API   |
| --------------- | -------------- | ----------------- | ------------- |
| **stable**      | 3.5            | 3.5               | 3.5           |
| **dev preview** | 3.6            | 3.6               | 3.6           |
| **legacy**      | 3.4, 3.3       | 3.4, 3.3          | 3.4, 3.3, 2.0 |
| **deprecated**  | 3.2            | 3.2               | 3.2           |

### Grouping versions

You can create a different set of versions for your `subcategories`.
If your article isn't using the **default** versioning, you can create a custom group of versions. In order to do that, you need to add your versions scheme into `/src/contant/index.js` e.g.

```js
export const VERSIONS_GROUPS = {
  ...
  "foo": {
    STABLE_VERSION: "1.0",
    DEV_PREVIEW_VERSION: "2.0",
    ALL_VERSIONS: ["1.0", "2.0"]
  }
```

Then inside the subcategory root `index.mdx` file, you must specify the newly created group in the frontmatter section e.g.

```
---

weight: 30
...
versionGroup: "foo"
```

The last step is to add the `versionGroup` and the specified `version` inside your article. Please, also remember to add `versionGroup` to all the siblings (all documents within the same subcategory). You don't have to specify `version` for them, but `versionGroup` is required.

### Adding a new version

Run this command to automatically create folders and files for a new version of the API documentation.

`new` e.g. `npm run version -- --type=new --newVersion=3.5 --fromVersion=3.1` (create new version 3.5 based on files from 3.1)

Options:

- `--group`: (default: DEFAULT), for chat widget use `--group=chat-widget`
- `--exclude`: e.g. `--exclude=agent-chat-api,customer-chat-api`

### Changing the stable version

Run this command to automatically change the stable version of the API documentation. All the necessary files and folders will be created, moved, and deleted.

`make-stable` e.g. `npm run version -- --type=make-stable --newVersion=3.3 --exclude=customer-chat-api` (make version 3.3 stable, current stable version will become legacy)

Options:

- `--group`: (default: DEFAULT), for chat widget use `--group=chat-widget`
- `--exclude`: e.g. `--exclude=agent-chat-api,customer-chat-api`

## How to contribute

All contribution's welcome! [Read how to do it.](./CONTRIBUTING.md)

## Contact us

- [Join our Discord for Developers](https://discord.gg/rFbJkYQFwp)
- Send us an email at developers@livechat.com
