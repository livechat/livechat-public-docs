# Example usage

There are two ways to open the chat window – by using an Activity or a Fragment.

### Activity

In order to open a chat window in a new Activity, you need to declare **ChatWindowActivity** in your manifest. Add the following line to **AndroidManifest.xml**, between `<application></application>` tags:

```xml
    <activity android:name="com.livechatinc.inappchat.ChatWindowActivity" android:configChanges="orientation|screenSize" />
```

<div class="clear"></div>

Finally, add the following code to your application, in the place where you want to open the chat window (e.g. button listener). You need to provide a **Context** (your Activity or Application object), your LiveChat licence number (taken from the [tracking code](https://my.livechatinc.com/settings/code)) and, optionally, the ID of a group:

```java
    Intent intent = new Intent(context, com.livechatinc.inappchat.ChatWindowActivity.class);
    intent.putExtra(com.livechatinc.inappchat.ChatWindowActivity.KEY_GROUP_ID, "your_group_id");
    intent.putExtra(com.livechatinc.inappchat.ChatWindowActivity.KEY_LICENCE_NUMBER, "your_license_number");
    context.startActivity(intent);
```

<div class="clear"></div>

It’s also possibile to automatically login to the chat window by providing visitor’s name and email. You need to disable [pre-chat survey](https://my.livechatinc.com/settings/pre-chat-survey) in the web application and add the following lines to the previous code:

```java
    intent.putExtra(com.livechatinc.inappchat.ChatWindowActivity.KEY_VISITOR_NAME, "your_name");
    intent.putExtra(com.livechatinc.inappchat.ChatWindowActivity.KEY_VISITOR_EMAIL, "your_email");
```

### Fragment

In order to open chat window in a new Fragment, you need to add the following code to your application, in the place where you want to open the chat window (e.g. button listener). You also need to provide your LiveChat licence number and a group ID:

```java
    getFragmentManager() 
       .beginTransaction() 
       .replace(R.id.frame_layout, ChatWindowFragment.newInstance("your_license_number", "your_group_id"), "chat_fragment") 
       .addToBackStack("chat_fragment") 
       .commit();
```

<div class="clear"></div>

`ChatWindowFragment.newInstance()` method returns the chat window Fragment.

<div class="clear"></div>

It’s also possible to automatically login to the chat window by providing visitor’s name and email. You need to disable [pre-chat survey](https://my.livechatinc.com/settings/pre-chat-survey) in the web application and use a different `newInstance()` method:

```java
    getFragmentManager() 
       .beginTransaction() 
       .replace(R.id.frame_layout, ChatWindowFragment.newInstance("your_license_number", "your_group_id", “visitor _name”, “visitor _email”), "chat_fragment") 
       .addToBackStack("chat_fragment") 
       .commit();
```
