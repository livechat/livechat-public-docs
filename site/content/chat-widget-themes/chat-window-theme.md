# Chat window theme

A theme is basically **a set of CSS rules** applied to the elements of the chat window.

The styles are injected to `#livechat-full` and `#livechat-compact-container`.

Additionally, you can apply styles to these containers themselves to change their size or position:

```css
#livechat-full {
    width: 500px;
    height: 890px;
}
```

## Creating a theme

To create a custom theme, you have to modify one of the [default skins](https://my.livechatinc.com/settings/theme): Classic, Modern, Minimal or Circle.

The easiest way to do this is to use "Customize using own CSS" option in the Agent App ([Chat Window > Theme](https://my.livechatinc.com/settings/theme)). There is a live preview available, so you can immediately see your changes. 

<img src="../assets/images/livechat-themes/livechat-themes-customize.jpg" width="100%" style="margin-top: 20px; border: 1px solid #ddd;"/>

<aside class="note">If you need a <code>class</code> or the <code>id</code> of a chat window element, use developer tools in your browser to inspect it. See the documentation for <a href="https://developer.chrome.com/devtools" target="_blank">Chrome</a>, <a href="https://developer.mozilla.org/son/docs/Tools" target="_blank">Firefox</a> and <a href="https://developer.apple.com/safari/tools/" target="_blank">Safari</a> for reference.</aside>

Keep in mind that your custom theme will support **only the elements available in your base theme** (i.e. the default skin that you're modifying). For example, Minimal theme doesn't support chat rating and transcripts, so these won't be visible in your custom theme.

## Additional classes

The `<body>` element in the widget `iframe` gets additional classes in the following cases: 

* `state-chatting` - when a visitor is chatting
* `avatar-enabled` - when agent avatar is enabled
* `chat-ended` - when the chat has ended
* `has-operators-bar` - when the agent bar is visible
* `email-transcript-form-visible` - when the transcript form is displayed
* `rate-comment-form-visible` - when the rating form is displayed

You can use them to style the chat window depending on the chat state. For example, you can add a semi-transparent overlay to the chat window when the transcript form is visible:

<img src="../assets/images/livechat-themes/livechat-themes-body-classes.jpg" width="400" style="margin-top: 20px; border: 1px solid #ddd;"/>

## Additional CSS functions

### Mobile styles

There is no support for media-queries in the custom CSS, but you can decide which styles will work only on mobile devices. To do this, wrap the mobile-only styles in `@livechat-mobile`. For example, to give the `#wrapper` a red border on desktop and green border on mobile, do this:

```css
#wrapper {
    border: 1px solid red;
    box-shadow: 1px 1px 1px #000;
}
@livechat-mobile {
    #wrapper {
        border: 1px solid green;
    }
}
```
<div class="clear"></div>

Note that `box-shadow` property is not overwritten in the mobile styles, so the mobile styles will inherit it.

<aside class="note">You can use <code>@livechat-mobile</code> <strong>only once</strong> in your custom CSS. Therefore, put all your mobile styles in a single <code>@livechat-mobile</code> wrapper.</aside>

### Variables

You can use `%color%` variable in your custom CSS. It will pick up the selected visitor color:

<img src="../assets/images/livechat-themes/livechat-themes-color.jpg" width="400" style="margin-top: 20px; border: 1px solid #ddd;"/>


## Additional options

### Icons color

The icons in the chat window are actually a font, so you can easily change their color:

```css
.icon-close {
    color: red;
}
```

### Custom fonts

You can use custom fonts in your chat widget. See [LiveChat Custom Fonts](https://developers.livechatinc.com/blog/livechat-custom-fonts/) for details.

## Final notes

When creating a custom theme, keep the following in mind:

### Right-to-left support

If a RTL language is enabled, the `<body>` element receives `rtl-lang` class. Make sure that the interface is displayed correctly in the RTL mode.

<img src="../assets/images/livechat-themes/livechat-themes-rtl.jpg" width="400" style="margin-top: 20px; border: 1px solid #ddd;"/>

### Mobile devices

Always check if your theme works correctly on mobile devices. LiveChat adds some default styles that improve the usability of the mobile window.

### Visitor color

Using `%color%` variable in your custom CSS will make the theme more flexible - there will be no need to change the color manually in the code.

### Advanced properties

There are three options in "Advanced window tweaks" available:

* Display logo
* Display agent’s picture
* Display mobile icon when agent is using a mobile device

Make sure that your theme works correctly whether or not these are enabled.

### Social media

There is an option to add social media icons in the chat window footer. Check if your theme displays them correctly.

### Minimized window options

There are two types of the minimized window to choose from: bar and bubble. Test your theme with both!

### Flexibility

Make sure that long texts (e.g. chat title, agent name and title, chat messages) are displayed properly in your theme.

### Control inputs

LiveChat window supports text inputs, radio buttons and checkbox. Provide styles for all of them.

### Chat window options

There are [two types of LiveChat window](https://my.livechatinc.com/settings/window-type):

* embedded
* pop-up

Additionally, there is a full-screen window (upon clicking [direct chat link](https://my.livechatinc.com/settings/direct-chat-link)).

Test your theme for all window types.

### Cross-browser compatibility

We recommend that you test your theme in the most popular browsers (the latest versions of Chome, Firefox, Safari and IE) for maximum compatibility.

## Sample themes

We have created a set of sample skins to demonstrate the structure of a custom theme. They can be found on GitHub [here](https://github.com/livechat/chat-widget-themes).