# LiveChat Docs

Hello 👋!

The source (markdown & assets) for all of the APIs documentations. Rendered here: https://developers.livechat.com/docs/

## If you're new to LiveChat

[LiveChat](https://www.livechat.com/) is an online customer service software with live support, help desk software and web analytics capabilities. It's used by more than 30,000 companies all over the world. You can find more information here: [LiveChat for Developers](https://developers.livechat.com/).

## Development

1. Fetch the repository
2. Run `npm install`
3. Run `npm start`

## Versioning

Currently, versioning for the Agent Chat API, Customer Chat API, and Configuration API is as follows:

|                 | Agent Chat API | Customer Chat API | Configuration API |
| --------------- | -------------- | ----------------- | ----------------- |
| **stable**      | 3.2            | 3.2               | 3.2               |
| **dev preview** | 3.3            | 3.3               | 3.3               |
| **legacy**      | 3.1            | 3.1               | 2.0, 3.1          |

This versioning is **default** for all articles which aren't grouped.

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

## Support & Feedback

Please let us know if you have any thoughts on making this collection complete. We are eager to make the documentations better and better! Drop us a line at developers@livechatinc.com or submit a pull request.
