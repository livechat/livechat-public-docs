---
weight: 30
---

# Advanced use

## Developing your own widget

If you're building your own widget and you need to interact with the Agent App, be sure to use the [Agent App SDK](#agent-app-sdk).

If you developed a widget already, you're probably using the [Widget SDK](#widget-sdk). Mind that it is not actively maintained anymore and its usage is discouraged. Neverthless, we provide backward compatibility for the SDK, so your widgets should be still working.

## Accessing LiveChat data

You can leverage OAuth2.0 authorization flow to access data from the [REST API](/docs/rest-api). Head to [Sign in with LiveChat](/docs/sign-in-with-livechat) docs for more information.

## Layout and Styling

If you're using React, you can use the [LiveChat's Design System](https://github.com/livechat/design-system), which is a component library used directly in the LiveChat's user interface.

We also ship a [LiveChat Boilerplate](/docs/boilerplate) – it's a lightweight CSS stylesheet to help you lift off with creating the widget interface.

> Place this tag within the `<head></head>` section:

```html
<link rel="stylesheet" href="//cdn.livechatinc.com/boilerplate/1.1.css">
```

## Hosting the widget

You can host your widget locally or on a dedicated server. The hosted content has to be served over **HTTPS Protocol**. 

While development, you can use a self-signed certificate for `localhost` or upload your widget to an SSL-enabled host. You can also leverage bundlers like [Webpack](https://webpack.js.org/configuration/dev-server/) to use https-enabled development server.

## Creating a Customer Details widget

When developing a Details app, you may want to add your own content to the Customer Details view as a widget. First, let's first define the definitions we will be using:   

- **Section** - An element of Customer Details that includes a completed set of information that is grouped under a single widget.
- **Component** - A single line in the section that can have one of the pre-defined formats and be filled with the data from the app.

### How to add a widget
In order to display the widget, you need to first declare the initial state of the section. Go to your app's page in the [Developer Console](https://developers.livechatinc.com/console/apps) and create a new Details widget or update an exisiting one. The initial state of section can be added using the `Initial state` input.

> Example of initial state JSON:

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

You can define how many sections you want, but remember that you can't add or remove any section later on. However, you can still modify the components inside any section.

Also, The **title** attribute in initial state acts as an ID to the section and *cannot* be modifed at any time.

### How to update a section

You can control your widget and change its components using the Agent App SDK. Please refer to the [Modify the Customer Details widget](#modify-the-customer-details-widget).

### Component types

Here's the list of all components you can use to build the Customer Details.

#### Section
Section is a container for components.

> Example of section component

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
Title could be used in several cases. Component look depends on given data.

> Example of title component

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
Simple button from design system.

> Example of button component

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

> Example of link component

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

> Example of line component

```json
{
    "type": "line"
}
```
