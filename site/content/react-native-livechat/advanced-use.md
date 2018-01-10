---
weight: 20
---

# Advanced use

## Chat Bubble

Chat bubble is a small view that by default is blue and is placed on bottom-right side of your screen.

### Changing bubble position

```javascript
<LiveChat bubbleLeft={0} bubbleTop={0} license={your_license_id} />
```

Can can control position of bubble by simply sending **bubbleLeft** and **bubbleTop** props.

### Fixing the position

```javascript
<LiveChat movable={false} license={your_license_id} />
```

By default bubble component is draggable and movable. You can disable this option by sending **movable** prop with _false_ value.

### Change the color of the bubble

```javascript
<LiveChat bubbleColor="red" license={your_license_id} />
```

If would like to change color of bubble you can simply pass **bubbleColor** prop with LiveChat component.

### Custom bubble component

```javascript
<LiveChat
  license={your_license_id}
  bubble={<View style={{ width: 60, height: 60, backgroundColor: "green" }} />}
/>
```

If you don't like appearance of this bubble at all, you can send **bubble** prop with your own component.

## Chat Appearance

This module uses [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat) for chat UI.

You can customise your chat appearance by sending props to LiveChat component like you would normally send them to GiftedChat component.

### Custom action for avatar

```javascript
<LiveChat
  license={your_license_id}
  onPressAvatar={info => console.warn(info)}
/>
```

For example if you would like to control **onPressAvatar** to show info about agent, you can do it like this:

You can find information about all props here: [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat).

## LiveChat Visitor SDK

This module uses LiveChat Visitor SDK. You can find more information about available methods [here](https://github.com/FaridSafi/react-native-gifted-chat). To use VisitorSDK methods you must create LiveChat reference. You can do it like this:

```javascript
<LiveChat onLoaded={ref => (this.livechat = ref)} license={your_license_id} />
```

<div class="clear"></div>

Let's say you want to close current chat. You can do it in two ways:

```javascript
this.livechat.closeChat();
// is the same as:
GLOBAL.visitorSDK.closeChat();
```

### Available methods

| Name           | Note                                                                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| closeChat      | Closes the chat.                                                                                                                                                                                              |
| sendMessage    | Sends a message. More information about message format you can find [here](https://docs.livechatinc.com/visitor-sdk/#sendmessage).                                                                            |
| rateChat       | Enables chat ratings. More info [here](https://docs.livechatinc.com/visitor-sdk/#ratechat).                                                                                                                   |
| setSneakPeek   | Enables sneak peeks to see what the visitor is typing in before they actually send the message. More info [here](https://docs.livechatinc.com/visitor-sdk/#setsneakpeek).                                     |
| getVisitorData | Collects the visitor information. More info [here](https://docs.livechatinc.com/visitor-sdk/#getvisitordata).                                                                                                 |
| setVisitorData | Set the visitor information. More info [here](https://docs.livechatinc.com/visitor-sdk/#setvisitordata).                                                                                                      |
| getTicketForm  | Get ticket form fields configured in chat window settings section in agent app.                                                                                                                               |
| sendTicketForm | Send ticket form filled in by visitor. Ticket form should be rendered using fields fetched by getTicketForm method. More info [here](https://docs.livechatinc.com/visitor-sdk/#sendticketform).               |
| disconnect     | Disconnect Visitor SDK. A visitor won't be tracked, and you won't be notified about agent's availability status. You will be automatically connected again after using sendMessage or setVisitorData methods. |
| destroy        | Disconnect Visitor SDK and unsubscribe from all callbacks.                                                                                                                                                    |
