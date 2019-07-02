---
weight: 40
---

# Extending the LiveChat UI

<!-- [Extending user interfaces](https://developers.livechatinc.com/docs/building-apps-for-livechat/#extending-user-interfaces) -->

One of the paths is to extend user interfaces. We provide developers with tools to modify the Agent App, as well as the Chat Widget interface. 

## Agent App 

![LiveChat Tag Master](livechat-tag-master-app.jpg)

When integrating with the Agent App, developers can choose from a variety of options. They were designed to extend different locations of the Agent App making the whole application very flexible. To name them all, there are: 

- Apps in the Details section (widgets)
- Apps in the Customer Details section (Customer Detail widgets)
- Chat Actions
- Fullscreen apps displayed in the main menu
- MessageBox

Those are the possible integration interfaces that developers can work with. You can always check out our [Marketplace](https://www.livechatinc.com/marketplace/) to see what integrations are available for purchase.

Each type of integration has its advantages, which in turn suggests use cases. The most common extensions are **apps in the Details section**, also known as widgets. They are quite versatile, which makes them usable in many cases. You could use them to display some statistics on your agents performance or to manage tags used by agents. Similar to **apps in Details** are the **apps in Customer Details**. There're perfect for displaying data needed at hand. 

Speeding up the work can be easily achieved with **Chat Actions**, which are shortcuts to certain operations. Manual ticket creation takes a few steps, but with **Chat Actions** it's just a button click.

![LiveChat Chat Actions](livechat-chat-actions.jpg)

Web appplications can be displayed **fullscreen**, right in the Agent App. If you're planning on integrating your CRM with LiveChat, that might be the way to go.

There's also another area where developers can integrate their apps- it's the Message Box. This interface can be used for extensions related strongly to messages, which are being sent.
It could be used to send gifs (see [Integration with Giphy](https://developers.livechatinc.com/docs/building-apps-for-livechat/#messagebox)) or files from Dropbox.

<!-- **See the integration of the MessageBox & Dropbox:**  -->

<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
    <caption>The integration of the MessageBox & Dropbox</caption>
    <tbody>
        <tr>
            <td style="width:580px;">
                <a href="https://youtu.be/P07QVFOrT04" target="_blank" style="color:#2200FF;text-decoration:none;">
                <img src="https://cdn.livechatinc.com/mailing/2019-06/managers/video-managers.jpg" style="border:0;display:block;outext-decoration:none;height:auto;width:100%;font-size:13px;" width="580" alt="video-managers.jpg"></a>
            </td>
        </tr>
    </tbody>
</table>

## Chat Widget

Just as there are ways to build upon the Agent App, there are also some to extend the Chat Widget. First of all, you could use [Chat Widget JavaScript API](https://developers.livechatinc.com/docs/js-api/) to alter the look and behavior of the Chat Widget. If that's not enough, building a new Chat Widget from scratch is possible with the [Chat Widget Customer SDK](https://developers.livechatinc.com/docs/visitor-sdk/).

![LiveChat Moments](livechat-moments-in-chat.jpg)

To make chatting more engaging, you could make use of [Chat Widget Moments](https://developers.livechatinc.com/docs/building-apps-for-livechat/#moments) (shown above) and [Rich Messages](https://www.livechatinc.com/help/rich-messages/).

If you want to know more about extending the LiveChat UI, check out [this guide](https://developers.livechatinc.com/docs/building-apps-for-livechat/#extending-user-interfaces).

# Backend APIs

Many applications built upon the LiveChat Platform need to use our API. For that reason, we make it accessible and let developers play with it. 

There are two **messaging APIs**: 

- [Agent Chat API](https://developers.livechatinc.com/beta-docs/agent-chat-api/)
- [Customer Chat API](https://developers.livechatinc.com/beta-docs/customer-chat-api/)

There's also the [Configuration API](https://developers.livechatinc.com/beta-docs/configuration-api/).

## Chat API

Together, the **Agent Chat API** and the **Customer Chat API** create the **Chat API**. It is a full set of methods to use either as an agent or as a customer. We divide it though, to make it more use-case-specific. The distinction is intuitive; when you want to join a chat as an agent, use the Agent Chat API. To interact as a customer, use the Customer Chat API. 

These two sets of APIs are powerful. The Agent Chat API lets you build your custom Agent App, as well as browser chat archives, or ban customers. With the use of the Customer Chat API, you can build a custom Chat Widget. Both APIs allow for interactions, such as joining a chat, posting messages, etc.

## Configuration API

The **Configuration API** is dedicated to handling licence and agent's properties, webhooks management, and bot agents configuration.

# Interacting with data

One of the most extensively used sections in the Agent App is **Reports**. We provide several types of reports, which help managers with the analysis. You can measure chat satisfaction and duration, keep track of agents' activity, or compare time periods to observe trends. Again, this is just a tiny bit of what's available in terms of reporting. Yet, we're aware that what we offer does not cover every single business case. This is where [**Reports API**](https://developers.livechatinc.com/docs/rest-api/#reports) comes into play. It serves as a sets of tools to create apps which interact on the server side. With this API, it's possible to design exactly what you need. 

If you'd like to know more, see [Interacting with data](https://developers.livechatinc.com/docs/building-apps-for-livechat/#interacting-with-data).

# Contact us

If you feel that LiveChat is the platform you'd like to build upon, don't hesitate to contact us at [developers@livechatinc.com](mailto:developers@livechatinc.com).
Got any questions or feedback? We'll be happy to hear from you!