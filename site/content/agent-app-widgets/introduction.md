---
weight: 10
---

# Introduction

## What is an Agent App Widget?

Agent App Widgets are web applications loaded inside the LiveChat Agent App. All agents can interact with the widget during chats with customers. The widget itself is displayed in the Agent's App sidebar:

<img src="../assets/images/agent-app-extension.png" width="500" style="margin-top: 20px;"/>

## Sample use cases

There are number of ways you can utilize the widgets:

* embed and display static content, e.g. knowledge base articles, conversation prompts or context information,
* embed your service or web app as a part of agents' workspace,
* query external services with visitor email or LiveChat group ID (CRM, marketing automation, etc.),
* query [LiveChat REST API](/rest-api) to do basically anything with the visitor, agent or chat.

## Getting started in 5 minutes

1. Go to the <a href="https://developers.livechatinc.com/console/apps">LiveChat Developers Console</a>.
2. Create a new app and follow the app wizard.
3. Set up app name, descriptions and icon in **Display** settings.
4. Configure Agent App Widget in the **Features** tab. If you don't have a working app at hand, feel free to start with the sample ones:
  * [iFrame loader](https://glitch.com/edit/#!/livechat-load-iframe?path=README.md:1:0), so you can embed any website,
  * [Visitor preview widget](https://glitch.com/edit/#!/livechat-sample-agent-app), which displays currently selected visitor data.
5. Go to **Distribution** settings and install the app at your license. You'll see it in the LiveChat Agent App.