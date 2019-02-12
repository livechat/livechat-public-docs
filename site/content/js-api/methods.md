---
weight: 20
---

# Methods

## Set custom variables

```js
var custom_variables = [
  { name: 'page', value: 'Store' },
  { name: 'user_id', value: '12345' }
];
LC_API.set_custom_variables(custom_variables);
```

You can set custom variables that the LiveChat agents will see in their apps. Custom variables will be saved in the chat transcript, so you will see them in the [Archives](https://my.livechatinc.com/archives) even after the chat has been finished. (Note: if the variables are set after the chat has started, they will not be saved in Archives.)

<img src="https://www.livechatinc.com/wp-content/uploads/2015/03/custom-variables-in-livechat@2x.jpg" width="400"/>

Please note that custom variables can also be set in the tracking code `window.__lc.params` variable ([read more](#tracking-code)). The above method should be used if you want to update the custom variables without page refresh.

## Update custom variables

This method works only with [new chat widget](https://developers.livechatinc.com/blog/new-chat-window-look/).

```js
var custom_variables = [
  { name: 'page', value: 'Store' },
  { name: 'user_id', value: '12345' }
];
LC_API.update_custom_variables(custom_variables);
```

It works the same way as [Set custom variables](/docs/js-api/#set-custom-variables) method, but it will merge new visitor's properties with the current visitor's properties, instead of replacing them with a new set.

## Set visitor name

This method works only with [new chat widget](https://developers.livechatinc.com/blog/new-chat-window-look/).

```js
LC_API.set_visitor_name('John Doe');
```

Sets current visitor name which is used in chat, Agent App Customers section and as default value in forms where `name` field appears.

## Set visitor email

This method works only with [new chat widget](https://developers.livechatinc.com/blog/new-chat-window-look/).

```js
LC_API.set_visitor_email('john@doe.com');
```

Sets current visitor email which is used in chat, Agent App Customers section and as default value in forms where `email` field appears.

## Open the chat window

```js
LC_API.open_chat_window();
```

Maximizes the chat window (when using the embedded chat window) or opens the chat window (when using the pop-up window).

## Minimize the chat window

```js
LC_API.minimize_chat_window();
```

Minimizes the chat window (not supported with the pop-up chat window).

## Hide the chat window

```js
LC_API.hide_chat_window();
```

Hides the chat window (not supported with the pop-up chat window).

### Hide on page load

```js
var LC_API = LC_API || {};
var livechat_chat_started = false;

LC_API.on_before_load = function() {
  // don't hide the chat window only if visitor
  // is currently chatting with an agent
  if (LC_API.visitor_engaged() === false && livechat_chat_started === false) {
    LC_API.hide_chat_window();
  }
};

LC_API.on_chat_started = function() {
  livechat_chat_started = true;
};

```

Use this snippet if you want to hide chat window on particular page(s).

## Agents are available

```js
var LC_API = LC_API || {};
LC_API.on_after_load = function()
{
  if (LC_API.agents_are_available())
  {
    // your code here which will fire only
    // when your agents are available to chat
  }
};
```

Returns `true` if your agents are available to chat, otherwise it returns `false`. This function is available only when using the embedded chat window (not the pop–up window).

## Check if the chat window is maximized

```js
var is_maximized = LC_API.chat_window_maximized();
```

Returns `true` if the chat window is maximized, returns `false` otherwise (not supported with the pop-up chat window).

## Check if the chat window is minimized

```js
var is_minimized = LC_API.chat_window_minimized();
```

Returns `true` if the chat window is minimized, returns `false` otherwise (not supported with the pop-up chat window).

## Check if the chat window is hidden

```js
var is_hidden = LC_API.chat_window_hidden();
```

Returns `true` if the chat window is hidden, returns `false` otherwise (not supported with the pop-up chat window).

## Check if the visitor is currently waiting in the queue

```js
var visitor_in_queue = LC_API.visitor_queued();
```

Returns `true` if the visitor is currently waiting in the queue, returns `false` otherwise (not supported with the pop-up chat window).

## Check if the visitor is currently chatting with an agent

```js
var is_chatting = LC_API.chat_running();
```

Returns `true` if the visitor is currently chatting with an agent, returns `false` otherwise (not supported with the pop-up chat window).

## Check if the visitor is engaged

```js
var is_engaged = LC_API.visitor_engaged();
```

Returns `true` if the visitor is currently chatting, waiting in the queue or the greeting is displayed to them. Returns `false` otherwise (not supported with the pop-up chat window).


## Return current chat window type

```js
var window_type = LC_API.get_window_type();
```

Returns `embedded` if the chat window is embedded on the website or `popup` if the chat window opens in a new window. You can change the chat window type in the [LiveChat app](https://my.livechatinc.com/settings/window-type).


## Close chat

```js
LC_API.close_chat();

```
Closes an ongoing chat.


## Disable sounds

```js
LC_API.disable_sounds();

```

Mutes all sounds in the chat window on visitor's side (not supported with the pop-up chat window).
