---
weight: 30
---

# Interacting with data

In some cases you'll need to interact with LiveChat on the server side. We provide set of [REST APIs](https://developers.livechatinc.com/docs/rest-api/) for that purpose. See below for typical use cases.

## Webhook-based apps

### Process automation

Speeding up manual processes could be achieved by automation. The perfect candidate for automation is **chat tagging**. It could take place either for real-time chats or the archived ones. For this purpose, the application would need to have access to chats content, so that tags can be assigned based on that.

### New communication channels\* [beta]

Integration of multiple communication channels would be a convenient solution for both customers and agents.
Customers contact agents via their preferred channels, for example Facebook or Twitter. Agents want a single interface to manage all the incoming messages. When responding, messages would return to the medium it came from.

### Chatbots\* [beta]

We could take it further and engage chatbots. They could lead conversations with customers when no agents are available. Once agents start accepting chats, they take over the conversations from bots. To make it work, chatbots would need to be trained based on the data from the past conversations.

\*) We're working on new set of APIs that introduce new features and multiple improvements. The most important one is new Chat API that allows you to send and receive rich messages, exchange events and perform all variety of actions within the LiveChat ecosystem. Got you curious? Hit us up at [developers@livechatinc.com](mailto:developers@livechatinc.com) for more details &amp; early access!

## Reporting apps

Oftentimes companies need customized reports based on data from LiveChat. Those might be very specific collations for the analysis and statistics. For example, the number of chats rated as good in relation to agents' weekly activity. Or, the number of times a particular word appeared in conversations. The key is to pull from the LiveChat database any data that might be needed to create such reports.
