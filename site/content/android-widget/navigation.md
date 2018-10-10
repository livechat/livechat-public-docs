---
weight: 50
---

# Navigation

Depending on your use case you may want to hide the **ChatWindow** if a user hits the back button.
You can use our ```onBackPressed()``` function which hides the view if it's visible and returns ```true```.
Add the following to your activity/fragment:

```java
@Override
public boolean onBackPressed() {
    return fullScreenChatWindow != null && fullScreenChatWindow.onBackPressed();
}
```
