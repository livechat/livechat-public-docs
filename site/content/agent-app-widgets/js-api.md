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

// Forces Web App to send you information about the current customer
LiveChat.refreshSessionId();

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

It appends given message at the end of current conversation input window or into ticket window. Agent has to confirm sending this message.

```js
LiveChat.putMessage("Hello! This message comes from the App Widget. Press enter to send it!");
```

## Add new content to Customer Details

### Introduction

You can use the SDK to add your own content to the Customer Details view. To better understand the following part, lets first define the definitions we will be using:   

- **Section** - An element of Customer Details that can be collapsed / expanded and includes a completed set of information that is grouped under a single title.
- **Component** - A single line in the section that can have one of the pre-defined formats and be filled with the data from AAW.

### How to add a section
To extend the Customer Details view, you need to first declare the initial state of the section in the Developer Console:

> Example of initial state JSON for "Chat details":

```json
{
  "customerDetailsSections": [
    { 
      "title": "Example section",
      "components": [
        {
          "type": "button",
          "data": {
            "label": "Example button",
            "id": "example-button"
          }
        }
      ]
    }
  ]
}
```

  1. Log into the Agent App using your license.
  2. Go to [Developer Console Apps](https://developers.livechatinc.com/console/apps) and select your app or create a new one with the Agent App Widget template.
  3. Go to the `Building blocks` section of your app and create a new Agent App widget. You need to provide the `Widget source URL`, which can be either an URL pointing to the Web or to localhost (for eg. `https://localhost:4000`), if you want to use the local version of the widget. The URL will be used as an iframe source and should be publily available.
  4. Set the `Widget placement` to `Chat details` and provide the initial state JSON.
  5. The sections list can only be initialized once and they can't be modified afterwarts. This means you can't add or remove a section using the SDK later on. You can however modify the list of components inside a section later on.
  6. Go to `Private installation` and click the `Install app` button.
  7. Your widget should be now visible in the right sidebar of the Agent App chat view. Beware - if you did not set any icon for your widget, it may seem that it's not there. To make sure, you can hover over the widget icon bar and check if there's any clickable whitespace. You can set the icon in Developers Console.

### How to update a section

> Example of using the `modifyCustomerDetailsSection` method:

```js
LiveChat.modifyCustomerDetailsSection(
  { 
    "title": "Example section",
    "components": [
      {
        "type": "button",
        "data": {
          "label": "Updated button",
          "id": "example-button"
        }
      }
    ]
  } 
);
```

To update a section you can use the `LiveChat.modifyCustomerDetailsSection()` method.

---
**IMPORTANT**

The **title** attribute in the root of the JSON acts as an ID to the section and *cannot* be changed. You need to provide it to identify which section you want to update.

---

### Component types
Components are *lego bricks* which can be used for building a section.

#### Section
Section is a container for components.

> Example of section component

```json
{
    "title": "card with image",
    "components": [],
    "imgUrl": "https://www.gstatic.com/webp/gallery/4.jpg"
}
```

| Property     | Required | Type                |
|--------------|----------| ------------------- |
| `title`      | Yes      | string              |
| `components` | Yes      | array of components | 
| `imgUrl`     | No       | string              | 

#### Title
Title could be used in several cases. Component look depends on given data.

> Example of title component

```json
{
    "type": "title",
    "data": {
        "title": "title",
        "value": "value",
        "description": "description",
        "imgUrl": "https://www.gstatic.com/webp/gallery/4.jpg"
    }
}
```

| Property      | Required | Type | Note        |
|---------------|----------| ---- | ----------- |
| `title`       | Yes      | string |           |
| `value`       | No       | string |           |
| `description` | No       | string |           |
| `imgUrl`      | No       | string |           |
| `imgSize`     | No       | string, one of: ["small", "big"]` | Default value: "big" | 
| `link` | No | string | URL added when title is a link. |

#### Button
Simple button from design system.

> Example of button component

```json
{
    "type": "button",
    "data": {
          "id": "second-button",
          "label": "second button",
          "openApp": true
    }
}
```

| Property      | Required | Type    | Description            |
|---------------|----------| ------- | ---------------------- |
| `id`          | Yes      | string  |                        |
| `label`       | Yes      | string  |                        |
| `openApp`     | No       | boolean | Default value: `false` | 

##### Click events

```js
Livechat.on("customer_details_section_button_click", ({ buttonId }) => {
  console.log(buttonId);
});
```

You can listen for button clicks using the SDK. Note that `buttonId` will be the same as the `id` from the schema. If you want to capture a specific click, you need to make sure that the `id` is unique across all definitions.

#### Label with value

> Example of label with value component

```json
{
  "type": "label_value",
  "data": {
    "label": "Name",
    "value": "Stefan",
    "inline": false
  }
}
```

| Property | Required | Type    | Description |
|----------|----------| ------- | ----------- |
| `label`  | No       | string  |             |
| `value`  | No       | string  |             |
| `inline` | No       | boolean | Default value: `true` |

#### Link

> Example of link component

```json
{
  "type": "link",
  "data": {
    "value": "click me",
    "url": "http://google.com",
    "inline": false
  }
}
```

| Property | Required | Type    | Description     |
|----------|----------| ------- | --------------- |
| `url`    | Yes      | string  |                 |
| `value`  | No       | string  |                 |
| `inline` | No       | boolean | default: `true` |

#### Line
Line could be used to separate section content. It has no components inside. 

> Example of line component

```json
{
    "type": "line"
}
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
