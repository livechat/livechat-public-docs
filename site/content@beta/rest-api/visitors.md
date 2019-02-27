---
weight: 130
---

# Visitors

You can use this method to get information about the real-time [Visitors](https://www.livechatinc.com/features/visitors-tracking/) on your website. You can also use it to **display additional information** about the visitors in the LiveChat app.

## Available paths {#visitors-available-paths}

| Methods      | Path      |
|--------------|-----------|
| `GET` | `/visitors` |
| `POST` | `/visitors/<VISITOR_ID>/details` |


## List all visitors

> Path

```
GET https://api.livechatinc.com/visitors
```

> Sample request

```shell
curl "https://api.livechatinc.com/visitors?
state=chatting&\
group[]=0" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 -g
```

> Sample response

```json
[
  {
    "browser": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
    "chat": {
      // (...)
    },
    "chat_id": "DL1G0UED4H",
    "chat_start_time": "2017-02-16 12:54:26",
    "chat_start_time_ts": 1487246066,
    "chats": 1,
    "custom_variables": [
      {
        "key": "empty_cart",
        "value": "true"
      }
    ],
    "city": "Greenville",
    "country": "United States",
    "country_code": "US",
    "greetings_accepted": 1,
    "greetings_all": 2,
    "greetings_refused": 1,
    "group": 102,
    "host": "very-hosty.sl.us",
    "id": "S148dea44981.d9443253fef2",
    "invitation": "",
    "ip": "8.8.8.8",
    "language": "en",
    "last_visit": "2017-02-16 12:36:21",
    "last_visit_ts": 1487244981,
    "latitude": "35.6127",
    "longitude": "-77.3663",
    "name": "Visitor",
    "operators": [
      // (...)
    ],
    "page_address": "https://developers.livechatinc.com/beta-docs/js-api/#on-chat-window-minimized",
    "page_current": "https://developers.livechatinc.com/beta-docs/js-api/#on-chat-window-minimized",
    "page_entered": "2017-02-16 12:36:21",
    "page_entered_ts": 1487244981,
    "page_time": "2017-02-16 12:39:12",
    "page_time_ts": 1487245152,
    "page_title": "LiveChat – Chat Window API (JS)",
    "page_views": 16,
    "prechat_survey": [
      // (...)
    ],
    "queue_start_time": 46843480,
    "referrer": "https://www.livechatinc.com/",
    "region": "North Carolina",
    "state": "chatting",
    "timezone": "America/New_York",
    "visit_path": [
      {
        "invitation": "Time on site: 30 sec",
        "page": "https://developers.livechatinc.com/",
        "time": "2017-02-16 12:36:21",
        "time_ref": 1487244981,
        "time_ts": 1487244981,
        "title": "LiveChat Developers - REST API & Integrations"
      },
      {
        "invitation": "",
        "page": "https://developers.livechatinc.com/beta-docs/",
        "time": "2017-02-16 12:38:33",
        "time_ref": 1487245113,
        "time_ts": 1487245113,
        "title": "LiveChat Docs"
      },
      // (...)
    ],
    "visits": 3
  },
  // (...)
]
```
   

Returns a list of the visitors on the pages with the tracking code installed.

#### Optional parameters

| Parameter | Description |
|---------|--------------------|
| `state` | parameter determines what state the visitors are. Possible values: `chatting`, `queued`, `browsing`, `invited`, `refused invitation` or `chat closed` |
| `group[]` | parameter decides which group will be used for the listing. Use group numbers as values to select visitors only for the specified group |
| `count` | parameter will allow you to return the number of visitors (when the value is set to `1`) instead of all the available information (when it is set to `0`). The parameter is set to `0` by default |

#### Additional info:

The possible `state` values returned without any filter are:

*   `browsing`
*   `chatting`
*   `logging into chat`
*   `queued`
*   `invited`
*   `refused invitation`
*   `chat closed`

The possible `state` filter values are `chatting` and `queued`.

`prechat_survey` parameter will be available only if the visitor is currently chatting.

`custom_variables` parameter will be available only if the custom variables are defined in the tracking code.

## Add custom visitor details

> Path

```
POST https://api.livechatinc.com/visitors/<VISITOR_ID>/details
```

> Sample request

```shell
curl "https://api.livechatinc.com/visitors/S1352647457.ac951bfe2e/details" \
  -H X-API-Version:2
  -d "license_id=12345&\
token=26132406c42c96ba61ed42689b70f719&\
id=my-app&\
fields[0][name]=Age&\
fields[0][value]=36"
```

> Sample JSON request

```shell
curl "https://api.livechatinc.com/visitors/S1352647457.ac951bfe2e/details" \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "license_id":"12345",
        "token":"26132406c42c96ba61ed42689b70f719",
        "id":"my-app",
        "fields":[
          {
            "name":"Age",
            "value":36
          }
        ]
      }'
```

> Sample response

```json
{
  "result": "Visitor details added"
}
```

Displays additional information about a visitor in LiveChat apps.

For example, if you have your own database with some additional details about your users, you can query this database based on your visitor’s e-mail address, and display the data from your database for an agent during the chat.

<img src="https://www.livechatinc.com/wp-content/uploads/2013/02/visitor-details1.png" width="300" style="margin:30px 0"/>

**Note:** this method can only be used along with the [Webhooks](https://developers.livechatinc.com/beta-docs/configuration-api/#webhooks). You should create a webhook with `chat_started` event that will be sent to your integration script. This script must read webhook's `license_id` and `token` params and include them in this API method call. See a sample integration in [Webhooks documentation](https://developers.livechatinc.com/beta-docs/configuration-api/#webhooks).

#### Required properties

| Property | Description |
|---------|--------------------|
| `license_id` | sent by the webhook (read the note above) |
| `token` | sent by the webhook (read the note above) |
| `id` | descriptive ID your data set, for example: "my-app". It lets us group the data into one set and display many different data sets for single visitor. It should include only alphanumeric characters (letters, digits, punctuation marks) |
| `fields` | array of data objects that include `name` and `value` properties. This is the actual data that you have about your visitor. This data will be displayed to the agent during the chat. For the links you can also pass the anchor text. By adding `url` param, the value field would act as the anchor. |

#### Optional properties

| Property | Description |
|---------|--------------------|
| `icon` | address of the icon picture that will be displayed in the LiveChat app next to visitor’s data. It lets you group important information. `icon` should be a URL without the `http://` prefix. Your web server should support serving the icon file using https:// (SSL) protocol. The icon’s dimensions must be 64x64 px. |
