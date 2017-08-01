
## Chat Window View


There are two recommended ways to use the **ChatWindow**:

*   Full screen ChatWindow added to the root of your Activity
*   XML embedded ChatWindow to control the location and size



### Full Screen Window

All you need to do is to create, attach and initialize the chat window. For example:

```java
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

```java
public void startEmmbeddedChat(View view) {
    if (!emmbeddedChatWindow.isInitialized()) {
        emmbeddedChatWindow.setUpWindow(configuration);
        emmbeddedChatWindow.setUpListener(this);
        emmbeddedChatWindow.initialize();
    }
    emmbeddedChatWindow.showChatWindow();
}
```