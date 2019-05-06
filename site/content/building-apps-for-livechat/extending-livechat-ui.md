---
weight: 20
---

# Extending user interfaces

LiveChat Platform provides simple tools to extend the Agent interface. With apps, you can add new panels, widgets, and other UI elements.

From a technical perspective, you can build a web application with HTML, CSS, or JavaScript and embed it in different locations of the LiveChat Agent interface. We also provide some native primitives, which don't require from you any coding skills.

## Chat Actions

The simplest way to extend the LiveChat Agent App is by using Chat Actions. They are buttons available at hand while chatting.

Popular use cases handle actions such as ticket creation, sending chat transcript, or banning a visitor. This is where Chat Actions are displayed in the UI:

![Chat Actions](livechat-chat-actions.jpg)

<!-- ![Chat Actions](chat-actions-licence.png) -->

Check out our [blog post](https://developers.livechatinc.com/blog/chat-actions/) about Chat Actions to learn more.

## App locations

Currently, your app can extend three areas of the the LiveChat Agent interface:

- the Details section, by adding a new tab with your web content or a new widget in the default Customer Details tab
- the Main menu, by adding a new, fullscreen section with your web content
- Chat Actions, by adding a new action button in the Chat Action menu

If you feel we lack some options, please drop us a line at [developers@livechatinc.com](mailto:developers@livechatinc.com)!

### Details section

Apps in the Details tabs are the most common way to extend LiveChat UI. They are displayed in the right sidebar of the Agent App when browsing Chats or Archives.

![Tag Master](livechat-tag-master-app.jpg)

In the example above, the **Tag Master** app is installed. It's one of the open-source [sample apps](https://developers.livechatinc.com/docs/agent-app-widgets/#sample-widgets) you can [clone](https://github.com/livechat/sample-apps/tree/master/tag-master) and play with.

Apps located in the Details section are **contextual**. It means they inherit the properties of the currently opened chat. You can use this information to present contextual data for the particular chats.

#### Customer Details widgets

Additionally, those apps can expose a widget in the native Customer Details tab. Those widgets serve as shortcuts or essence of the information presented in the app.

![Customer Details widgets](livechat-cards-for-shopify.jpg)

Widgets are simply tiles displayed one below another. In this example, we see how **Cards for Shopify** and **CartValue** extend default Customer Details tab. Widgets are a great solution for displaying information that agents need to have at hand, as they don't need to switch between tabs.

See the [documentation](https://developers.livechatinc.com/docs/agent-app-widgets/) to learn how to embedd your app in the Details section.

### Main menu (fullscreen apps)

The application icon is located in the **navigation bar** on the left.

Clicking the icon loads the app URL as an iframe. The application is displayed fullscreen, right in the Agent App.

![Fullscreen app](livechat-fullscreen-app.jpg)

Keep in mind that this feature is not supported on the mobile version of the LiveChat Agent App.

Fullscreen apps help to reduce _context switching_. Users no longer need to switch between the Agent App and tabs in the browser. As long as the application they work with is installed as a **Fullscreen app**, they can perform all the operations without leaving the Agent App. It's particularly important for LiveChat Desktop App users.

See how to create a fullscreen app in the [documentation](https://developers.livechatinc.com/docs/agent-app-widgets/).

### App settings

Some applications require settings configuration, especially when they use external services. After installing the app, users need to do the setup in order for the application to work.

We provide a special place called Settings page, where you can embed a page with configuration. It's recommended to use it together with [Sign in with LiveChat](/docs/sign-in-with-livechat/).

See how to setup a Settings page for your app in the [documentation](https://developers.livechatinc.com/docs/agent-app-widgets/).