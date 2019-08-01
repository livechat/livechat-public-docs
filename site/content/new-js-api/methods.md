---
weight: 20
---

# API Methods

This API allows you to interact with the Chat Widget embeded on your website by giving you control over the behaviour and data passed through to LiveChat.

## Interacting with the Chat Widget

You can use the following methods to change the visibility of the Chat Widget.

- [maximize](#maximize)
- [minimize](#minimize)
- [hide](#hide)
- [destroy](#destroy)

## Passing data to LiveChat

Various data can be sent over to the LiveChat integration to be used by your Agents.
For more information, you can read these articles in our help center: https://www.livechatinc.com/help/custom-variables-configuration/

- [set session variables](#set-session-variables)
- [update session variables](#update-session-variables)
- [set visitor name](#set-visitor-name)
- [set visitor email](#set-visitor-email)

### maximize

Maximizes the Chat Widget.

#### Example

`LiveChatWidget.call('maximize')`

### minimize

Minimizes the Chat Widget.

#### Example

`LiveChatWidget.call('minimize')`

### hide

Hides the Chat Widget from the site.
You will need to use another API call to show it afterwards.

#### Example

`LiveChatWidget.call('hide')`

### destroy

Destroys the Chat Widget.
It won't be available for further actions until the window is refreshed.

#### Example

`LiveChatWidget.call('destroy')`
