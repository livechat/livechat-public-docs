---
weight: 10
---

# Introduction

There are several ways to extend the **LiveChat Agent App** interface. The most common one makes use of widgets. **Agent App Widgets** are web applications loaded inside the LiveChat Agent App. They can use the JavaScript SDK to communicate with the Agent App.  

Such a solution allows for interactions between widgets and agents (people chatting with customers). For example, agents could benefit from analytics, collected and displayed by a widget.

<img src="../assets/images/agent-app-widget-sample.png" width="600" style="margin-top: 20px;max-width: 100%;"/>

Typically, widgets are displayed in the right sidebar, as a part of the **Details** section. This is not the only possible placement for widgets, though. Other placement options include **Settings** and [Fullscreen Apps](#fullscreen-apps).



## Use cases

Widgets are primary elements of Agent App interface. There are number of ways you can use the them:

* embed and display static content, e.g. knowledge base articles, conversation prompts or context information,
* embed your SaaS service or web app as a part of agents' workspace,
* query external services with visitor email or LiveChat group ID (CRM, marketing automation, etc.),
* create store with [in-app purchases](/docs/billing-api) to sell additional services or features of your app,
* query [LiveChat REST API](/docs/rest-api) to do basically anything with the visitor, agent or chat.

## Important notes

From a technical point of view, widgets are regular web applications. For that reason, you need to have some knowledge of HTML, CSS, and JavaScript to build your own widget. 

Bear in mind that widgets are front-end elements of the LiveChat Agent App. If your intention is to build a server-side application, we encourage you to familiarize yourself with the [REST API documentation](https://developers.livechatinc.com/docs/rest-api/).


### Feature requests

If you have any feature requests related to the Agent App Widgets, let us know! We're open for your insights and suggestions.