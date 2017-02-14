## Sample application

[Our sample app](https://github.com/livechat/chat-window-android/releases/download/v1.2.1/LiveChatWindowExample.apk) will display a “Chat with us!” button in the ActionBar. Once clicked, a chat with your support team will be opened in the app.

Feel free to download the [source code of this application](https://github.com/livechat/chat-window-android/tree/master/LiveChatWidgetExample).

<img src="https://developers.livechatinc.com/wp-content/uploads/2014/06/android-sample-app1.jpg" class="inline" title="In app widget example" alt="In app widget example" width="200" />
<img src="https://developers.livechatinc.com/wp-content/uploads/2014/06/android-sample-app2.jpg" class="inline" title="In app widget example" alt="In app widget example" width="200" />

Possible use-cases include: adding a chat button to your “Contact us” screen or displaying a chat button all the time, within the app. Read more about [providing in-app support](http://www.livechatinc.com/blog/2013/10/new-approach-to-in-app-support/) in mobile applications.

Let’s get started!

## How to include it in your project

Import [LiveChatWindow.jar](https://github.com/livechat/chat-window-android/releases/download/v1.2.1/LiveChatWindow.jar) library to your project:

*   In **Eclipse**: put the jar file into the “libs” folder, right-click it in “Package Explorer”, select “Build Path” and “Add to Build Path”.
*   In **Android Studio**: put the jar file into the “libs” folder, select “File”/”Project Structure…”, pick your application module and choose “Dependencies” tab. Click on the green plus icon, select “File dependency” and choose the jar file from the list.

Your application will need a permission to use the Internet. Add the following line to your **AndroidManifest.xml**:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```
<div class="clear"></div>

If you want to allow users to upload files from their external storage using chat window, a permission is also needed:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```
<div class="clear"></div>

If you do not want the chat window to reload its content every time device orientation changes, add this line to your Activity in the manifest:

```java
android:configChanges="orientation|screenSize"
```
<div class="clear"></div>

The chat window will handle the orientation change by itself.

## Example usage

There are two ways to open the chat window – using Activity or Fragment.

### Using Activity

In order to open a chat window in new Activity, you need to declare **ChatWindowActivity** in your manifest. Add the following line to **AndroidManifest.xml**, between `<application></application>` tags:

```xml
    <activity android:name="com.livechatinc.inappchat.ChatWindowActivity" android:configChanges="orientation|screenSize" />
```

<div class="clear"></div>

Finally, add the following code to your application, in a place where you want to open the chat window (e.g. button listener). You need to provide a Context (your Activity or Application object), your LiveChat license number (taken from the [tracking code](https://my.livechatinc.com/settings/code)) and, optionally, an ID of a group:

```java
    Intent intent = new Intent(context, com.livechatinc.inappchat.ChatWindowActivity.class);
    intent.putExtra(com.livechatinc.inappchat.ChatWindowActivity.KEY_GROUP_ID, "your_group_id");
    intent.putExtra(com.livechatinc.inappchat.ChatWindowActivity.KEY_LICENSE_NUMBER, "your_license_number");
    context.startActivity(intent);
```

<div class="clear"></div>

It’s also possibile to automatically login to chat window by providing visitor’s name and email. You need to disable [pre-chat survey](https://my.livechatinc.com/settings/pre-chat-survey) in the web application and add the following lines to the previous code:

```java
    intent.putExtra(com.livechatinc.inappchat.ChatWindowActivity.KEY_VISITOR_NAME, "your_name");
    intent.putExtra(com.livechatinc.inappchat.ChatWindowActivity.KEY_VISITOR_EMAIL, "your_email");
```

### Using Fragment

In order to open chat window in new Fragment, you need to add the following code to your application, in a place where you want to open the chat window (e.g. button listener). You also need to provide your LiveChat license number and group ID:

```java
    getFragmentManager() 
       .beginTransaction() 
       .replace(R.id.frame_layout, ChatWindowFragment.newInstance("your_license_number", "your_group_id"), "chat_fragment") 
       .addToBackStack("chat_fragment") 
       .commit();
```

<div class="clear"></div>

Method `ChatWindowFragment.newInstance()` returns chat window Fragment.

<div class="clear"></div>

It’s also possible to automatically login to chat window by providing visitor’s name and email. You need to disable [pre-chat survey](https://my.livechatinc.com/settings/pre-chat-survey) in web application and use different `newInstance()` method:

```java
    getFragmentManager() 
       .beginTransaction() 
       .replace(R.id.frame_layout, ChatWindowFragment.newInstance("your_license_number", "your_group_id", “visitor _name”, “visitor _email”), "chat_fragment") 
       .addToBackStack("chat_fragment") 
       .commit();
```