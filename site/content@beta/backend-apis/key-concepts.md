---
weight: 20
---

# Key concepts

## Chats and threads

By looking at the chat structure, you notice that each **chat** is is divided into **threads**. Every thread contains **events**, for example sent messages. You can think of a **chat** as _**a whole conversation**_, while **threads** are separate _**conversation topics**_.

![Chats and Threads](chat_threads.png "chats and threads")
<!-- Grafika do zrobienia. Trzeba komus zlecic -->

Consider the example of an online store. A customer starts a chat to ask about the shoes he bought. If he hasn't got any previous chat history, **a new chat is started**. Within this chat, **a new thread is created** (conversation topic). The messages he exchanges with the customer service assistant are received by the thread as **events**. After solving the problem, the custmer says goodbye and closes the chat, which automatically **closes the thread**. Let's say the customer is rude and leaves without saying goodbye. In this case, the thread closes after 30 minutes of inactivity (time periods are configurable). The chat **doesn't end**, though.

The next day, customer returns to ask about his other purchase. A new thread starts in the context of the chat, which has been **continuously open**. Each time customer returns and starts a new conversation topic, he needs to click **_start a chat_**. If we stuck to our naming convention, that would have to be **_start a thread_**, because this is what he actually does behind the scenes. 

A **message** is not the only event type, though. To check out other event types, see the [Events](#events) section.


### Rules and conditions

Here are some general rules, which summarize the previous section and add new info.

1. When a new chat is started, **a new active thread** is created within this chat. New threads within a single chat are created on the server side. 

2. There's always **only one active thread**. Only the **last thread** can be the **active** one. Events are always added to the active thread. 

3. There can be time gaps between threads in a chat, but once a chat is started, it's **continuously open**.

4. Messages are sent and delivered even when the recipient (both Customer and Agent) is **offline**.

5. **Multiple Agents** can participate in a single chat. 

6. Every user can have **multiple concurrent chats**. Read how it applies to [Agents](#chatting-as-an-agent) and [Customers](#chatting-as-a-customer).

7. The algorithm that decides how chats are distributed between Agents is called **routing**. It's documented in the [Routing](#routing) section.


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

#### Router system messages

While the chat changes its state, the router sends system messages. Read more about **system messages** in [Agent](#agent-system-messages) and [Customer](#customer-system-messages) Chat API.

<!-- Nie wiem trochę o co chodzi z tymi rodzajami system messages. Czy z grubsza mozna je podzielić na takie po stronie Agenta i po stronie Customera. Wtedy mona by tu wymienic typy
tak jak w przypadku pushy czy eventów. Wykomentowuje przykłądy, bo to chyba nie miejsce na to. -->

<!-- ####  Overview

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
| A chat is unassigned | manual | -->


