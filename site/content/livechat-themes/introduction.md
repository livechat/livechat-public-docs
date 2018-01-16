---
weight: 10
---

# Introduction

Hello! 👋

This documentation will get you started with creating **custom LiveChat themes (skins)**.

<aside class="note">To customize LiveChat themes, you will need at least <strong>basic HTML and CSS skills</strong>. For tutorials and references, go to MDN <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference" target="_blank">CSS</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference" target="_blank">HTML</a> sections.</aside>

## Chat window structure

The LiveChat widget is an `iframe` wrapped in a `div`. The basic structure of a maximized window looks like this:

<img src="../assets/images/livechat-themes/livechat-themes-structure.png" width="400" style="margin-top: 20px; border: 1px solid #ddd;"/>

The widget consists of the following elements:

### Minimized chat window

This item is placed in `#livechat-compact-container` element.

<img src="../assets/images/livechat-themes/livechat-themes-minimized.jpg" width="400" style="margin-top: 20px; border: 1px solid #ddd;"/>

### Maximized chat window

This item is placed in `#livechat-full` element.

<img src="../assets/images/livechat-themes/livechat-themes-maximized.jpg" width="400" style="margin-top: 20px; border: 1px solid #ddd;"/>

The chat window is situated in `#wrapper` element. The window itself is an HTML `table` element (`#content`).

The default chat window is built of the following parts:

#### Title bar 

This item is placed in `#title-container` element. It contains the chat title and the icons that change depending on the chat state. 

<aside class="note">On mobile devices the title bar will have a slightly different layout (there will be an extra menu button on the left).</aside>

#### Agent bar

This item is placed in `#operators` element. It displays the details of the current agent, rating buttons, email transcript buttons and the company logo (if provided).

#### Chat body

This item is placed in `#body-container` element. It displays the current chat view. The possible elements are:

* `#view-loading` - it is displayed e.g. when a visitor is waiting for the chat to start.
* `#view-offline-message-sent` it is displayed when the [ticket form](https://www.livechatinc.com/kb/support-tickets-in-livechat/) has been sent successfully.
* `#view-connection-lost` - it is displayed when a visitor is disconnected from the chat.
* `#view-not-working-cookies-and-local-storage` - it is displayed when visitor's device doesn't support cookies.
* `#view-confirm-closing` - it is displayed when a visitor has clicked "Close" button to end the chat. 
* `#view-prechat-survey` - it displays the [pre-chat survey](https://www.livechatinc.com/kb/chat-surveys/#pre-chat).
* `#view-chat` - it displays the actual chat flow.
* `#view-postchat-survey` - it displays the [post-chat form](https://www.livechatinc.com/kb/chat-surveys/#post-chat).
* `#view-offline-form` - it displays the ticket form (shown when there is no agent available)
* `#view-queued-form` - it displays the [queue form](https://www.livechatinc.com/kb/queue-configuration/#queue-form) (shown when the visitor is waiting in a queue)
* `#view-information` - it displays system info.

#### Visitor area

This is where chat visitors type in their messages.

This item is placed in `#textarea` element. It contains a text input and "File upload" button. On mobile devices there is also "Send" button.

#### After-greeting button

This item is placed in `#survey-after-greeting` element. It is displayed when "Show prechat survey after greeting" option is enabled and when a visitor has received a greeting.

#### Footer

This item is placed in `#footer` element. It displays "Powered by LiveChat" message and social media buttons (if provided).

### Badge

The badge displays the number of new messages from chat operator.

This item is placed in `#livechat-badge` element.

<img src="../assets/images/livechat-themes/livechat-themes-badge.jpg" width="400" style="margin-top: 20px; border: 1px solid #ddd;"/>

### Eye-catcher container

This item is placed in `#livechat-eye-catcher` element.

<img src="../assets/images/livechat-themes/livechat-themes-eyecatcher.jpg" width="400" style="margin-top: 20px; border: 1px solid #ddd;"/>
