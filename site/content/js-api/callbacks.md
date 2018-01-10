---
weight: 30
---

# Callbacks

Callbacks let you bind a custom JavaScript function to an event. For example, your function can be executed every time the chat window is opened.

## On before load

```js
var LC_API = LC_API || {};
LC_API.on_before_load = function()
{
  // your code here
};
```

Callback function executed when `LC_API` object is loaded and ready to use, before the chat window has been rendered (not supported with the pop-up chat window). You may want to use this callback to perform some operations with the chat window before it's displayed to the visitor. See the sample code for the [hide_chat_window](#hide-chat-window) function.


## On after load

```js
var LC_API = LC_API || {};
LC_API.on_after_load = function()
{
  // your code here
};
```

Callback function executed when `LC_API` object is loaded and ready to use, right after the chat window has been rendered (not supported with the pop-up chat window).

## On chat window opened

```js
var LC_API = LC_API || {};
LC_API.on_chat_window_opened = function()
{
  // your code here
};
```

Callback function executed when the chat window is opened.

## On chat window minimized

```js
var LC_API = LC_API || {};
LC_API.on_chat_window_minimized = function()
{
  // your code here
};
```

Callback function executed when the chat window is minimized (not supported with the pop-up chat window).

## On chat window hidden

```js
var LC_API = LC_API || {};
LC_API.on_chat_window_hidden = function()
{
  // your code here
};
```

Callback function executed when the chat window is hidden (not supported with the pop-up chat window).

## On chat state changed

```js
var LC_API = LC_API || {};
LC_API.on_chat_state_changed = function(data)
{
  alert('Chat state changed to: ' + data.state);
};
```

Callback function executed when the chat state is changed. It accepts one argument which contains an object with the `state` property. Possible values:

*   `offline` – chat agents are not available to chat.
*   `online_for_chat` – chat agents are available to chat. A visitor entering the chat will be connected to an agent immediately.
*   `online_for_queue` – chat agents are available to chat. A visitor entering the chat will be put in the chat queue and will need to wait for an available agent.

## On chat started

```js
var LC_API = LC_API || {};
LC_API.on_chat_started = function(data)
{
  alert('Chat started with agent: ' + data.agent_name);
};
```

Callback function executed when the chat is started. The only argument, `data`, contains additional information about the chat:

*   `data.agent_name` – the name of the agent that handles the chat.


## On chat ended

```js
var LC_API = LC_API || {};
LC_API.on_chat_ended = function()
{
  alert('Chat ended');
};
```

Callback function executed when the chat is ended.

## On message

```js
var LC_API = LC_API || {};
LC_API.on_message = function(data)
{
  alert('Message ' + data.text + ' sent by ' + data.user_type);
};
```

Callback function executed when the message has been sent or received. The only argument, `data`, contains additional information about the message:

*   `data.text` – the content of the message
*   `data.user_type` – visitor or agent
*   `data.timestamp` – unix timestamp created at the time the message arrives.

If the message has been sent by agent (data.user_type is 'agent'), the data contains additional information:

*   `data.agent_name` – the name of the agent that sent the message
*   `data.agent_login` – the login of the agent that sent the message

If the message has been sent by visitor (data.user_type is 'visitor'), the data contains additional information:

*   `data.visitor_name` – the name of the visitor that sent the message

## On ticket created

```js
var LC_API = LC_API || {};
LC_API.on_ticket_created = function(data)
{
alert('Ticket '+ data.ticket_id + ' created by ' + data.visitor_name + ', subject ' + data.ticket_subject + ', ' + data.text);
};
```

Callback function executed when the ticket form has been filled in by the visitor. The only argument, `data`, contains additional information:

*   `data.ticket_id` – ID of the created ticket, received from the API
*   `data.text` – the ticket message
*   `data.visitor_name` – the name of the visitor that created the message
*   `data.visitor_email` – the name of the visitor that created the message
*   `data.form_data` – all information provided by the visitor in the ticket form.

If the ticket form contains the subject field and it has been filled in by the visitor, the data contains additional information:

*   `data.ticket_subject` – the subject of the ticket


## On pre-chat survey submitted

```js
var LC_API = LC_API || {};
LC_API.on_prechat_survey_submitted = function(data)
{
  var alertText = data.form_data.map(function(formData) {
    return formData.label + ': ' + formData.value;
  }).join('\n')
  alert(alertText);
};

```

Callback function executed when the pre-chat survey has been submitted by visitor. The only argument, `data`, contains the `data.form_data` property with all information provided by the visitor.

## On post-chat survey submitted

```js
var LC_API = LC_API || {};
LC_API.on_postchat_survey_submitted = function(data)
{
  var alertText = data.form_data.map(function(formData) {
    return formData.label + ': ' + formData.value;
  }).join('\n')
  alert(alertText);
};

```
Callback function executed when the post-chat survey has been submitted by visitor. The only argument, `data`, contains the `data.form_data` property with all information provided by the visitor.

## On chat rated

```js
var LC_API = LC_API || {};
LC_API.on_rating_submitted = function(data) {
   alert('Rating:' + data);
};

```

Callback function executed when the chat rating is submitted. The only argument, `data`, can have three values: `good`, `bad` or `none`.

## On chat rating comment submitted

```js
var LC_API = LC_API || {};
LC_API.on_rating_comment_submitted = function(data) {
   alert('Rating message:' + data);
};

```

Callback function executed when a chat rating comment is submitted. The only argument, `data`, contains the  message entered by the visitor.