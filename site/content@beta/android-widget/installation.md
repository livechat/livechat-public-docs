---
weight: 20
---

# Installation

To get the project into your build, do the following:

## 1. Add the JitPack repository

[See the repository at JitPack](https://jitpack.io/#livechat/chat-window-android)

Add it to your root build.gradle at the end of ```repositories```:

```js
allprojects {
     repositories {
         ...
         maven { url 'https://jitpack.io' }
     }
 }
```

## 2. Add the dependency

To add the dependency, use the following code:

```js
dependencies {
    compile 'com.github.livechat:chat-window-android:v2.0.3'
}
```
<div class="clear"></div>

Your application will need a permission to use the Internet. Add the following line to your **AndroidManifest.xml**:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

<div class="clear"></div>

If you want to allow users to upload files from their external storage using the chat window, a permission is needed as well:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```
