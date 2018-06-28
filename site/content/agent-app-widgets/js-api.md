---
weight: 40
---

# JavaScript Widgets API

To use the JavaScript API you should import the [Agent App Widgets SDK](https://www.npmjs.com/package/@livechat/agent-app-widget-sdk).

## Init and receive customer profile
```js
import LiveChat from '@livechat/agent-app-widget-sdk';

// ...

LiveChat.init();

LiveChat.on("customer_profile", function( data ) {
	console.log( data )
})

```

Let the Agent App know the widget is ready. Once called, the Agent App removes the loading spinner and shows the content of the widget.

## Events

Events allow you react to the actions in the Agent App. Use this method as a listener for certain events.

```js
LiveChat.on("<event_name>", function( data ) {
	// ...
})
```

| Event name | Triggers when |
|------------|-------------|
| `customer_profile` | the agent opens a customer profile within **Chats**, **Archives** or **Visitors** sections |
| `customer_profile_hidden` | the opened customer profile belongs to the visitor that left the **Visitors** list |


Events `customer_profile` and `customer_profile_hidden` return an object width additional properties.

### Customer profile displayed

> Sample `data` object for `customer_profile` event

```json
{
  "id": "S126126161.O136OJPO1",
  "name": "Mary Brown",
  "email": "mary.brown@email.com",
  "chat": {
    "id": "NY0U96PIT4",
    "groupID": "42"
  },
  "source": "chats",
  "geolocation": {
    "city": "Wroclaw"
    "country": "Poland"
    "country_code": "PL"
    "latitude": "51.1093"
    "longitude": "17.0248"
    "region": "Dolnoslaskie"
    "timezone": "Europe/Warsaw"
    "zipcode": ""
  }
}
```

| Property | Description |
|------------|-------------|
| `id` | Unique ID of a visitor |
| `name` | Visitor name (if provided) |
| `email` | Visitor email (if provided) |
| `chat` | Object with two properties: `id` (unique chat id) and `groupID` (unique group id); this object may be empty when a visitor is not currently chatting |
| `source` | String representing the source of an event; possible values: `chats`, `visitors`, `archives` |

### Customer profile hidden

> Sample `data` object for `customer_profile_hidden` event

```json
{
  "id": "S126126161.O136OJPO1"
}
```

| Property | Description |
|------------|-------------|
| `id` | Unique ID of a visitor |


## Put message to textarea

It appends given message at the end of current conversation input window or into ticket window. Agent has to confirm sending this message.

```js
LiveChat.putMessage("Hello! This message comes from the App Widget. Press enter to send it!");
```



## Get the ID of the session

Returns the ID of the current extension session.

```js
LiveChat.getSessionId();
```

## Refresh the session ID

Deletes the ID of the previous session and requests of a new one.

```js
LiveChat.refreshSessionId();
```
