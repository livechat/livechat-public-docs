---
weight: 30
---

# Setup

You can use this library in a couple of ways. To be able to use all features, we recommend you to add the chat window as a view, either by using a static method which adds the view to your Activity, or as an embedded view in your xml. 

When **ChatWindowView** is initilized, you will get the events when a new message arrives.

First, let's configure the chat window.

## Configuration

The configuration is very simple - just use **ChatWindowConfiguration.java** constructor. Note that the licence number is mandatory.

```js
configuration = new ChatWindowConfiguration(
	"your_licence_number", 
	"group_id", 
	"Visitor name", 
	"visitor@email.com", 
	customParamsMap
);
```

## Chat Window View


There are two recommended ways to use the **ChatWindow**:

*   Full screen ChatWindow added to the root of your Activity
*   XML embedded ChatWindow to control the location and size



### Full Screen Window

All you need to do is to create, attach and initialize the chat window. For example:

```js
public void startFullScreenChat() {
    if (fullScreenChatWindow == null) {
        fullScreenChatWindow = ChatWindowView.createAndAttachChatWindowInstance(getActivity());
        fullScreenChatWindow.setUpWindow(configuration);
        fullScreenChatWindow.setUpListener(this);
        fullScreenChatWindow.initialize();
    }
    fullScreenChatWindow.showChatWindow();
}
```

### XML Embedded View

If you want to control the location and size of the **ChatWindowView**, you may want to add it to your app either by including a view in XML:

```xml
<com.livechatinc.inappchat.ChatWindowView
    android:id="@+id/embedded_chat_window"
    android:layout_width="match_parent"
    android:layout_height="400dp"/>
```
<div class="clear"></div>

or by inflating the view directly:

```java
ChatWindowView chatWindowView = new ChatWindowView(MainActivity.this);
```
<div class="clear"></div>

and then initializing the **ChatWindow** with the full screen window approach:

```js
public void startEmmbeddedChat(View view) {
    if (!emmbeddedChatWindow.isInitialized()) {
        emmbeddedChatWindow.setUpWindow(configuration);
        emmbeddedChatWindow.setUpListener(this);
        emmbeddedChatWindow.initialize();
    }
    emmbeddedChatWindow.showChatWindow();
}
```

## Navigation

Depending on your use case you may want to hide the **ChatWindow** if a user hits the back button.
You can use our ```onBackPressed()``` function which hides the view if it's visible and returns ```true```.
Add the following to your activity/fragment:

```js
@Override
public boolean onBackPressed() {
    return fullScreenChatWindow != null && fullScreenChatWindow.onBackPressed();
}
```

## File sharing

If you want the users to be able to send files, you need to set **ChatWindowEventsListener** on your **ChatWindowView** and allow the view to handle the activity result:

```js
@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (fullChatWindow != null) fullChatWindow.onActivityResult(requestCode, resultCode, data);
    super.onActivityResult(requestCode, resultCode, data);
}
```


## ChatWindowEventsListener

This listener allows you to:

*	handle a case when a user wants to attach a file in the **ChatWindow**
*	get notified if a new message has arrived in a chat (this comes in handy if you want to show a prompt for a user to read the new message)
*	react to visibility changes (the users can hide the view on their own)
