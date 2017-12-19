# Introduction

Easily embed LiveChat chat widget with React Native component. Works for **both iOS and Android** apps.

## Demo

![Alt Text](https://raw.githubusercontent.com/venits/react-native-router-flux/master/livechatdemo.gif)

## Pre requirements

To use LiveChat in your application you need **license_id**. You get one after creating account on our [website](https://www.livechatinc.com/).

You can check your **license_id** anytime [here](https://my.livechatinc.com/settings/code).

_If you have difficulties finding your **license_id** please take a look at this [screenshot](https://github.com/livechat/react-native-livechat/blob/master/license.png)._

## Installation

Install the package with `npm`:

`npm install react-native-livechat --save`

## Usage

Just import LiveChat component and put it in your render method

```javascript
import LiveChat from 'react-native-livechat'

...

<LiveChat license={your_license_id} />
```
