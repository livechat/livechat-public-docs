# LiveChat Docs

Hello 👋!

The source (markdown & assets) for all of the APIs documentations. Rendered here: https://docs.livechatinc.com/

## If you're new to LiveChat

[LiveChat](https://www.livechatinc.com/) is an online customer service software with live support, help desk software and web analytics capabilities. It's used by more than 20,000 companies all over the world. You can find more information here: [LiveChat for Developers](https://developers.livechatinc.com/).

## Support & Feedback

Please let us know if you have any thoughts on making this collection complete. We are eager to make the documentations better and better! Drop us a line at developers@livechatinc.com or submit a pull request.

:rocket:

## Versioning

The API documentation is versioned. Currently, we are using version `3.1` as `stable`, `3.2` as `dev preview` and `2.0` as `legacy`. This versioning is **default** for all articles which aren't grouped.

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

Then inside the subcategory root `index.mdx` file you must specify the newly created group in the frontmatter section e.g.

```
---

weight: 30
...
versionGroup: "foo"
```

The last step is to add the `versionGroup` and the specified `version` inside your article. Please, also remember to add `versionGroup` to all the siblings (all documents within the same subcategory). You don't have to specify `version` for them, but `versionGroup` is required. 

## Development

## Structure

## Basic Concepts
