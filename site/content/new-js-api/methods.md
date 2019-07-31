---
weight: 20
---

# API Methods

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

Example:

```js
LiveChatWidget.call('maximize')
```

### minimize

Minimizes the Chat Widget.

Example:

```js
LiveChatWidget.call('minimize')
```

### hide

Hides the Chat Widget from the site.
You will need to use another API call to show it afterwards.

Example:

```js
LiveChatWidget.call('hide')
```

### destroy

Destroys the Chat Widget.
It won't be available for further actions until the window is refreshed.

Example:

```js
LiveChatWidget.call('destroy')
```

## Setters

### Set session variables

Creates new session variables, or replaces the ones set previously.

Example:

```js
LiveChatWidget.call('set_session_variables', {
  cart_value: '450',
})
```

### update session variables

Changes values for your session variables.
Please note that this will include new session variables with those previously set, instead of replacing them.

Example:

```js
LiveChatWidget.call('udpate_session_variables', {
  cart_value: '450',
})
```

### set visitor name

Sets the Visitor name

Example:

```js
LiveChatWidget.call('set_visitor_name', 'John Doe')
```

### set visitor email

Sets the Visitor e-mail address

Example:

```js
LiveChatWidget.call('set_visitor_email', 'john@example.com')
```
