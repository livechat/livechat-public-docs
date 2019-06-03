---
weight: 30
---

# Advanced use

## Developing your own widget

If you're building your own widget and you need to interact with the Agent App, be sure to use the [Agent App SDK](#agent-app-sdk).

If you've already developed a widget, you're probably using the [Widget SDK](#widget-sdk). Keep in mind that **it is no longer actively maintained**. However, we provide backward compatibility for this SDK, so your existing widgets should still be working properly. When building new widgets, we encourage you to use the [Agent App SDK](#agent-app-sdk) instead.

## Accessing LiveChat data

You can leverage the OAuth2.0 authorization flow to access data from the [REST API](/docs/rest-api). Head to [Sign in with LiveChat](/docs/sign-in-with-livechat) docs for more information.

## Layout and Styling

If you're using React, you can use the [LiveChat Design System](https://github.com/livechat/design-system), which is a component library used directly in the LiveChat user interface.

## Hosting the widget

You can host your widget locally or on a dedicated server. The hosted content has to be served over the **HTTPS Protocol**. 

During development, you can use a self-signed certificate for `localhost` or upload your widget to an SSL-enabled host. You can also leverage bundlers like [Webpack](https://webpack.js.org/configuration/dev-server/) to use an https-enabled development server.

If you need a quick way to **deploy** your widget, you can use [Netlify Drop](https://developers.livechatinc.com/blog/widget-hosting-on-netlify/).

## Creating a Customer Details widget

When developing an app in the **Details** section, you can add some content to the **Customer Details** view and display it as a widget. This way you turn it into a **Customer Details widget**.  

Let's define the terms we use in this document:

- **Section** - an element of **Customer Details**. It contains a complete set of information grouped under a single widget.
- **Component** - a single line in a section. It can have one of the pre-defined formats and be filled with data from the app.

### How to add a widget
To display a widget, first, you need to declare the initial state of a section. Go to **Apps** in [Developer Console](https://developers.livechatinc.com/console/apps) and create a new **Details** widget or update an exisiting one. The initial state of a section can be added using the `Initial state` input.

> Example of the initial state JSON:

```json
{
  "customerDetailsSections": [
    { 
      "title": "Example section",
      "components": [
        {
          "type": "button",
          "data": {
            "label": "Example button",
            "id": "example-button"
          }
        }
      ]
    }
  ]
}
```

You can define as many sections as you want. Once your widget is running within the Agent App, you can't add nor remove any sections. However, you can still modify the components within any section.

Also, the `title` attribute in the section initial state acts as a section ID. You **should not** modify it.

### How to update a section

You can control your widget and change its components using the Agent App SDK. Please refer to the [Modify the Customer Details widget](#modify-the-customer-details-widget).

### Component types

Here's the list of all the components you can use to build the Customer Details app.

#### Section
Section is a container for components.

> Example of a section component

```json
{
    "title": "card with image",
    "components": [],
    "imgUrl": "https://www.gstatic.com/webp/gallery/4.jpg"
}
```

| Property     | Required | Type                |
|--------------|----------| ------------------- |
| `title`      | Yes      | string              |
| `components` | Yes      | array of components | 
| `imgUrl`     | No       | string              | 

#### Title
Title could be used in several cases. Component look depends on the given data.

> Example of a title component

```json
{
    "type": "title",
    "data": {
        "title": "title",
        "value": "value",
        "description": "description",
        "imgUrl": "https://www.gstatic.com/webp/gallery/4.jpg"
    }
}
```

| Property      | Required | Type | Note        |
|---------------|----------| ---- | ----------- |
| `title`       | Yes      | string |           |
| `value`       | No       | string |           |
| `description` | No       | string |           |
| `imgUrl`      | No       | string |           |
| `imgSize`     | No       | string, one of: ["small", "big"]` | Default value: "big" | 
| `link` | No | string | URL added when title is a link. |

#### Button
Simple button component

> Example of a button component

```json
{
    "type": "button",
    "data": {
          "id": "second-button",
          "label": "second button",
          "openApp": true
    }
}
```

| Property      | Required | Type    | Description            |
|---------------|----------| ------- | ---------------------- |
| `id`          | Yes      | string  |                        |
| `label`       | Yes      | string  |                        |
| `openApp`     | No       | boolean | Default value: `false` | 

##### Click events

You can listen for button clicks using the SDK. Note that `buttonId` will be the same as the `id` from the schema. If you want to capture a specific click, you need to make sure that the `id` is unique across all definitions.

#### Label with value

> Example of label with value component

```json
{
  "type": "label_value",
  "data": {
    "label": "Name",
    "value": "Stefan",
    "inline": false
  }
}
```

| Property | Required | Type    | Description |
|----------|----------| ------- | ----------- |
| `label`  | No       | string  |             |
| `value`  | No       | string  |             |
| `inline` | No       | boolean | Default value: `true` |

#### Link

> Example of a link component

```json
{
  "type": "link",
  "data": {
    "value": "click me",
    "url": "http://google.com",
    "inline": false
  }
}
```

| Property | Required | Type    | Description     |
|----------|----------| ------- | --------------- |
| `url`    | Yes      | string  |                 |
| `value`  | No       | string  |                 |
| `inline` | No       | boolean | default: `true` |

#### Line
Line could be used to separate section content. It has no components inside. 

> Example of a line component

```json
{
    "type": "line"
}
```
