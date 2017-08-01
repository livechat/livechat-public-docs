
# Alternative usage 

**Note: This option has limited capabilities.**

If you don't need the chat to work in the background nor to receive messages when the window is minimized, use Activity and Fragment chat window described above.


If you don't want the chat window to reload its content every time a device orientation changes, add this line to your Activity in the manifest:

```java
android:configChanges="orientation|screenSize"
```

<div class="clear"></div>

The chat window will handle the orientation change by itself.