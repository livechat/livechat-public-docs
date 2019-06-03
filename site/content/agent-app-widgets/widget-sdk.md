---
weight: 45
---

# Widget SDK

**Please remember that the Widget SDK is considered [deprecated](#developing-your-own-widget) and you should use the [Agent App SDK](#agent-app-sdk) instead.**

To use the JavaScript API you should import the [Agent App Widget SDK](https://www.npmjs.com/package/@livechat/agent-app-widget-sdk). Note that this document describes the API for `1.3.x` version of the package. If you're using version `2.x` or higher, please refer to the [README](https://github.com/livechat/agent-app-widget-sdk#readme) file located in the Github repository.

> Our widget SDK package is hosted on NPM. You can get it with the following command:

```
npm install --save @livechat/agent-app-widget-sdk
```

> Import the SDK and fire the `LiveChat.init()` method

```js
import LiveChat from '@livechat/agent-app-widget-sdk';
// ...
LiveChat.init();
```

## Init and receive customer profile
```js
import LiveChat from '@livechat/agent-app-widget-sdk';

// ...

LiveChat.init();

// Forces Web App to send you information about the current customer
LiveChat.refreshSessionId();

LiveChat.on("customer_profile", function( data ) {
	console.log( data )
})

```

After the content of your widget is loaded, fire the `LiveChat.init()` method. It will let the Agent App know when to hide the spinning loader.

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


Events `customer_profile` and `customer_profile_hidden` return an object with additional properties.

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
    "city": "Wroclaw",
    "country": "Poland",
    "country_code": "PL",
    "latitude": "51.1093",
    "longitude": "17.0248",
    "region": "Dolnoslaskie",
    "timezone": "Europe/Warsaw",
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

It appends a given message at the end of the current conversation input window or into the ticket window. Agent has to confirm sending the message.

```js
LiveChat.putMessage("Hello! This message comes from the App Widget. Press enter to send it!");
```

## Get the ID of the session

Returns the ID of the current extension session.

```js
LiveChat.getSessionId();
```

## Refresh the session ID

Deletes the ID of the previous session and requests a new one.

```js
LiveChat.refreshSessionId();
```
