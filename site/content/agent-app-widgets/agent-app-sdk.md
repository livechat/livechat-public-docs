---
weight: 40
---

# Agent App SDK

The [Agent App SDK](https://github.com/livechat/agent-app-sdk) is currently the primary way to develop your own widgets.

## Installation

You can download the SDK directly from NPM as an ES6 or CommonJS module.

> Install the SDK from NPM...

```
npm install @livechat/agent-app-sdk
```

> ... then import the ES6 module...

```js
import * as LiveChat from "@livechat/agent-app-sdk";
```

> ...or require the CommonJS.

```js
const LiveChat = require("@livechat/agent-app-sdk");
```

You can also use the UMD build of the SDK directly in the browser.

> You can also use the UMD build:

```html
<script src="https://unpkg.com/@livechat/agent-app-sdk@latest/dist/agentapp.umd.min.js"></script>
<script>
  LiveChat.createDetailsWidget().then(function(widget) {
    // do something with widget
  });
</script>
```

## Usage

The usage of the SDK depends on what type of widget you want to use. Refer to the specific instructions for available widgets.

* [Details widget](#details-widgets)

Neverthless, all widgets created by SDK share a common interface that will let you listen to events happening in the Agent App.

> Supposing that `widget` is a widget instance:

```js
function handleEvent(event) {
  // perform logic when event happens,
  // you can also use the data attached to the event
}

// Subscribe to event
widget.on("event", handleEvent);

// Unsubscribe from event
widget.off("event", handleEvent);
```

Each widget type offers a different set of events that you can listen to.

## Details widgets

If you want to use your app in the Details section, you should use the `createDetailsWidget` function. It returns a promise resolving to a details widget instance.

```js
import { createDetailsWidget } from "@livechat/agent-app-sdk";

createDetailsWidget().then(widget => {
  // build your logic around the widget
});
```

### Events

#### `customer_profile`

Emitted when an agent opens a conversation within Chats, Archives, or selects the customer profile in the Customers sections. The handler will get the customer profile object as an argument.

> Listen to customer profile changes

```js
widget.on("customer_profile", profile => {
  // read the new profile
});
```

The customer profile object will have the following shape:

| Property      | Description                                                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | Unique ID of a visitor                                                                                                                               |
| `name`        | Visitor name (if provided)                                                                                                                           |
| `email`       | Visitor email (if provided)                                                                                                                          |
| `chat`        | Object with two properties: `id` (unique chat id) and `groupID` (unique group id); this object may be empty when a visitor is not currently chatting |
| `source`      | String representing the source of an event; possible values: `chats`, `customers`, `archives`                                                        |
| `geolocation` | Object containing detailed information about customer's geolocation                                                                                  |

#### `customer_details_section_button_click`

Emitted when you click a button located in a section in Customer Details. The handler gets the following payload:

| Property   | Description                                              |
| ---------- | -------------------------------------------------------- |
| `buttonId` | The `id` of the button taken from the section definition |

> React to button clicks within Customer Details widgets

```js
widget.on("customer_details_section_button_click", ({ buttonId }) => {
  // perform an action when the button is clicked
});
```

### Actions

#### Get the customer profile

If you want to access to the current customer profile, you should use the `getCustomerProfile` method.

> Get the current customer profile

```js
const profile = widget.getCustomerProfile();
```

The returned profile will be an object identical to the one emitted by the `customer_profile` event. It can also be `null`, if no profile was recorded.

#### Append text to the message box

You can add any text to the current chat's message box by using the `putMessage` method. The method returns a promise.

> Append text to the message box

```js
widget.putMessage("this text will be appended").then(() => {
  // the text should be appended now
});
```

#### Modify Customer Details widget's state

If you configured a [Customer Details widget](#creating-a-customer-details-widget), you can modify its section state using the `modifySection` method. The method accepts the section state definition as its only parameter and returns a promise.

You can look up [component types](#component-types) to see how to create the state definition.

The `title` of a given section has to match the one specified in the initial state. Otherwise, the section won't change. Also, the Agent App ignores the commands without valid section definitions. Make sure that the definition you're sending is correct.

> Modifing the Customer Details widget's state

```js
widget
  .modifySection({
    title: "My widget",
    components: [
      {
        type: "title",
        data: {
          value: "The title will be modified"
        }
      }
    ]
  })
  .then(() => {
    // the widget should be modified now
  });
```
