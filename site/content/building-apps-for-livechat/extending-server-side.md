# Extending LiveChat with server-side applications

**Server-side applications** are the second category of apps that you can build the LiveChat ecosystem with. Their name comes from the fact that they usually extend the data pulled from LiveChat servers. To build this kind of apps, you need to familiarize yourself with the [Platform REST API](https://developers.livechatinc.com/docs/rest-api/) document.

There are 3 general use cases for this type of apps:

1. [Reports](#reports)
2. [Process automation](#process-automation)
3. [Interactions during chat](#interactions-during-chat)

## Reports

Oftentimes companies need customized reports based on data from LiveChat. Those might be very specific collations for the analysis and statistics. For example, the number of chats rated as good in relation to agents' weekly activity. Or, the number of times a particular word appeared in conversations. The key is to pull from the LiveChat database any data that might be needed to create such reports.

## Process automation

Speeding up certain manual processes could be achieved by automation. The perfect candidate for automation is **chat tagging**. It could take place either for real-time chats or the archived ones. For this purpose, the application would need to have access to chats content, so that tags can be assigned based on that. 

## Interactions during chat

Integration of multiple communication channels would be a convenient solution for both customers and agents.
The former could contact agents via their preferred channels, for example Facebook or Twitter. Thanks to channel integration, agents would receive all the incoming messages in LiveChat. When responding, messages would return to the medium it came from. 

We could take it further and engage chatbots. They could lead conversations with customers when no agents are available. Once agents start accepting chats, they take over the conversations from bots. To make it work, chatbots would need to be trained based on the data from the past conversations.

This feature would be possible only for the new **LC3 protocol**. 