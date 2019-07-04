---
weight: 30
---

# Key concepts

## Chats and threads

By looking at the chat structure, you notice that each **chat** is is divided into **threads**. Every thread contains **events**, for example sent messages. You can think of a **chat** as **a whole conversation**, while **threads** are separate **conversation topics**.

![Chats and Threads](chat_threads.png "chats and threads")

Consider the example of an online store. A customer starts a chat to ask about the shoes he bought. If he hasn't got any previous chat history, **a new chat is started**. Within this chat, **a new thread is created** (conversation topic). The messages he exchanges with the customer service assistant come to the thread as **events**. After solving the problem, the custmer says goodbye and ends the chat, which automatically **closes the thread**. Let's say the customer is rude and leaves without saying goodbye. In this case, the thread closes after 30 minutes of inactivity (time periods are configurable). The chat **doesn't end**, though.

The next day, customer returns to ask about his other purchase. A new thread starts in the context of the chat, which has been **continuously open**. Each time customer returns and starts a new conversation topic, he needs to click **_start a chat_**. If we stuck to our naming convention, that would have to be **_start a thread_**, because this is what he actually does behind the scenes. 

A **message** is not the only event type, though. To check out other event types, see the [Events](#events) section.


### Rules and conditions

Here are some general rules, which summarize the previous section and add new info.

1. When a new chat is started, **a new thread** is created within this chat. New threads within a single chat are created on the server side. 

2. There's always **only one active thread**. The **last thread** is always the **active** one. Events are always added to the active thread. 

3.  When there's no active thread in the chat, sending an event starts **a new thread**. The [annotation event](#annotation) is an exception; it is added at the end of the **last thread**, instead of starting a new thread.

4. There can be time gaps between threads in a chat, but once a chat is started, it's **continuously open**.

5. Customers can send messages even when agents are **offline**.

6. **Multiple users** (Agents or Customers) can participate in a single chat. 

7. Every user can have **multiple concurrent chats**. Read how it applies to [Agents](#chatting-as-an-agent) and [Customers](#chatting-as-a-customer).
<!-- Agent moze miec nieskoncozna liczbe czatow. W kazdym czacie moze byc tylko 1 agent (ci co supervisuja nie moga uczestniczyc w czacie, tylko moga komentarze wysylac) -->

8. The algorithm, which decides how chats are distributed between Agents is called **routing**. It's documented in the [Routing](#routing) section.


### The flow 

To better understand the flow between services, watch a short video.

<!-- Animacja do zmiany. Zajmie sie tym Gosia oraz Bartek. -->

<video loop width="750" height="500" style="height: auto;" controls>
<source type="video/mp4" src="/beta-docs/platform-overview/images/simple_event_schema.mp4">
</video>


## Chat routing

Routing is the process of **assigning chats to agents**. The primary goal of the routing mechanism is to distribute chats to all available agents who use the same license.  
<!-- In the future, it will be possible to create a custom routing mechanism and run it on the LiveChat platform. -->

Chats are being assigned to agents **either automatically or manually**. Our default routing mechanisms are described in [Understanding chat routing](https://www.livechatinc.com/help/understanding-chat-routing/).

<!-- ### Automatic routing

The diagram below present the flow of automatic routing.

![Automatic routing](automatic-routing.png "automatic routing")

### Manual routing

The diagram below present the flow of manual routing.

![Manual routing](manual-routing.png "manual routing") -->

<!-- 1. Czy dajemy te grafiki, przerabiamy je? 

    2. Czy wspominamy o custom routingu, ktory bedzie mozliwy w przyszlosci? 
    
    3. Czy rezygnujemy z opisow i linkujemy do artykulu w Help Center? 
    
    4. Fajnie by bylo tu kiedys nagrac filmik z lektorem  -->

### Router system messages

While the chat changes its state, the router sends system messages. Read more about [system messages](#system-message).

<!-- W tym zdaniu chodzi o to, ze routing zmienia stan chatow? Przerobilam tak jak mi sie wydaje -->

####  Overview

| Message text | System message type |
|--------------|---------------------|
| `Chat is unassigned because <agent_name> hasn't replied in <minutes_number> minutes` | `routing.unassigned` |
| `Chat assigned to <agent_name> because <agent_name> hasn't replied in <minutes_number> minutes` | `routing.assigned` |
| `Chat archived due to long inactivity` | `routing.archived` |
| `Chat is idle due to <minutes_number> minutes of inactivity` | `routing.idle` |
| `Chat archived because customer was banned by <agent> for N days` | `customer_banned` |

#### System messages: routing.assigned

##### General info

| Message text | System message type |
|--------------|---------------------|
| `Chat assigned to <agent_name>` | `routing.assigned` |

##### Use cases

| Case| Routing type |
|--------------|---------------------|
| A new chat is started and an agent is available | automatic |
| An agent has left the chat and another agent is available | automatic |
| An agent got available for an unassigned chat | automatic |

#### System messages: routing.unassigned

##### General info

| Message text | System message type |
|--------------|---------------------|
| `Chat is unassigned` | `routing.unassigned` |

##### Use cases

| Case| Routing type |
|--------------|---------------------|
| An agent has left the chat and there were no other agents are available | automatic |
| No free agent slots available | automatic |
| A chat is unassigned | manual |

## Bot Agents

Bot Agents are similar to their human counterparts. They can join chats and post messages, but they also have a special feature: you can attach [webhooks](../configuration-api/#webhooks) to them.

<img src="images/bot-agent.jpg" alt="LiveChat Bot Agent" class="has-border"/>

Bot Agents are created and managed with the use of the  [Configuration API](../configuration-api/#bot-agent). They communicate with the [Agent Chat API](../agent-chat-api/) by the [**Web API**](../agent-chat-api/#web-api) or [**websocket connection**](#rtm-api-vs-web-api). They listen to incoming webhooks (or pushes) and react to them.

#### Example: reacting to keywords

Bot Agents can react to specific keywords appearing in the chat. Let's say you set a _pizza_ keyword. Your Bot Agent will join the chat whenever the keyword is used and send the _"Woohoo!"_ message to all agents in the chat. Then, it'll leave the chat.

### Bots vs. regular Agents

Here are the major differences between Bot Agents and regular Agents:

* You can't log in to a Bot Agent account.
* You can't set password for a Bot Agent account.
* Bot Agents don't have email addresses. Their <code>agent_id</code> is a random hash.
* You can assign webhooks to Bot Agents as a communication channel for [pushes](../agent-chat-api/#pushes).

### Technical notes

* Bot Agents use the [Agent Chat API](../agent-chat-api/) to post messages to chats as Agents, so you can use them to write your own integrations. 

* When logged in, a Bot Agent is connected to the Agent's SSO access token, which creates and updates the Bot. A Bot Agent is logged out when the access token is revoked.

* Each Bot Agent is **a resource** owned by an application (identified by `client_id`) in the [Developers Console](https://developers.livechatinc.com/console/). **My Bot Agents** are the Bots owned by the application with a given `client_id`.
