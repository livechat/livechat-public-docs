---
weight: 30
---

# Interacting with data

In some cases you'll need to interact with LiveChat on the server side. We provide set of [REST APIs](https://developers.livechatinc.com/docs/rest-api/) for that purpose. See below for typical the use cases.

## Webhook-based apps

[Webhooks](https://en.wikipedia.org/wiki/Webhook) are one of the most popular ways to interact with data or events happening within the system. At LiveChat we provide webhooks for the following events:

- chat started and chat ended,
- new tag added to chat,
- visitor is in a queue,
- and many more in the Beta Configuration API\*

See the [webhooks guide](/docs/build-integration/) for more details.

<div class="note">
*) We're working on a new set of APIs, which introduce new features and multiple improvements. Got you curious? Hit us up at <a href="mailto:developers@livechatinc.com">developers@livechatinc.com</a> for more details and early access!
</div>

### Process automation

Automation speeds up manual processes and reduces the possibility of mistakes. The perfect candidate for automation trigger is a chat being tagged. It can happen either for ongoing chats or the archived ones. Once the Agent assigns a certain tag to a chat, you can for instance send a follow up email to the customer or notify your team on the Slack.

### Channel integrations\* [beta]

Integration of multiple communication channels is a convenient solution for both customers and agents.
Customers contact agents via their preferred channels, for example Facebook or Twitter. Agents want a single interface to manage all the incoming messages. When responding, messages would return to the medium it came from. With Beta Chat APIs*, you can link any messenging channel with LiveChat.

### Chatbots\* [beta]

Chatbots are multipurpose time savers. They could lead conversations with customers when no agents are available. Once agents start accepting chats, they take over the conversations from bots. To make it work, chatbots would need to be trained based on the data from the past conversations.

<div class="note">
*) We're working on the new set of APIs, which introduce new features and multiple improvements. The most important one is the new Chat API. It allows you to send and receive rich messages, exchange events, and perform all variety of actions within the LiveChat ecosystem. Got you curious? Hit us up at <a href="mailto:developers@livechatinc.com">developers@livechatinc.com</a> for more details &amp; early access!
</div>

## Advanced reporting

Managers need customized reports based on data from LiveChat. Those might be very specific collations for the analysis and statistics. For example, the number of chats rated as good in relation to agents' weekly activity. Or, the number of times a particular word appeared in conversations. The key is to pull data from the LiveChat via [Reports API](/docs/rest-api/#reports).
