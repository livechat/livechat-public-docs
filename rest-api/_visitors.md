# Visitors

Use this function to get visitor-related information.

## Available paths

| Methods      | Path      |
|--------------|-----------|
| `GET` | `/visitors` |
| `POST` | `/visitors/<VISITOR_ID>/details` |


## List all visitors

> Path

```
GET https://api.livechatinc.com/visitors
```

> Example request

```shell
curl "https://api.livechatinc.com/visitors?
state=chatting&\
group[]=0" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 -g
```

> Example response

```json-doc
[
  {
    "browser": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14",
    "chat_id": "MH0H3V3XO3",
    "chat_start_time": "2013-01-31 15:51:03",
    "city": "Greenville",
    "country": "United States",
    "host": "152.27.26.254",
    "id": "S1355415390.49b8940793",
    "ip": "152.27.26.254",
    "language": "en",
    "last_visit": "2013-01-31 15:43:05",
    "latitude": "35.6127",
    "longitude": "-77.3663",
    "operators": [
      {
        "id": "john.doe@mycompany.com",
        "display_name": "John Doe"
      }
    ],
    "page_current": "http://www.mycompany.com/products/shoes",
    "page_entered": "2013-01-31 15:49:17",
    "page_time": "2013-01-31 15:49:17",
    "prechat_survey": [
      {
        "key": "Name:",
        "value": "Mark"
      },
      {
        "key": "E-mail:",
        "value": "mark.johnson@example.com"
      }
    ],
    "queue_start_time": "",
    "referrer": "",
    "region": "North Carolina",
    "state": "chatting",
    "timezone": "America/New_York",
    "custom_variables": [
      {
        "key": "empty_cart",
        "value": "true"
      }
    ],
    "chats": 27,
    "group": 0,
    "greetings_accepted": 9,
    "greetings_all": 13,
    "greetings_refused": 4,
    "visits": 16,
    "page_views": 59
  },
  {
    "browser": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.101 Safari/537.11",
    "chat_id": "",
    "chat_start_time": "",
    "city": "Courbevoie",
    "country": "France",
    "host": "def92-2-87-91-13-226.dsl.sta.abo.bbox.fr",
    "id": "S1359643767.a7904dd2f2",
    "ip": "87.91.13.226",
    "language": "en",
    "last_visit": "2013-01-31 15:49:27",
    "latitude": "48.897",
    "longitude": "2.2564",
    "operators": [
      {
        "id": "",
        "display_name": ""
      }
    ],
    "page_current": "http://www.mycompany.com/",
    "page_entered": "2013-01-31 15:49:27",
    "page_time": "2013-01-31 15:49:27",
    "prechat_survey": [],
    "queue_start_time": "",
    "referrer": "",
    "region": "Ile-de-France",
    "state": "online",
    "timezone": "Europe/Paris",
    "chats": 0,
    "group": 0,
    "greetings_accepted": 0,
    "greetings_all": 0,
    "greetings_refused": 0,
    "visits": 1,
    "page_views": 1
  },
  (...)
]
    
```

Returns list of the visitors available on pages with tracking code installed.

#### Optional parameters

| Parameter | Description |
|---------|--------------------|
| `state` | parameter determines what state the visitors are. Possible values: `chatting`, `queued`, `browsing`, `invited`, `refused invitation` or `chat closed` |
| `group[]` | parameter decides which group will be used for the listing. Use group numbers as values to select visitors only for the specified group |
| `count` | parameter will allow you to return the number of visitors (when the value is set to `1`) instead of all the available information (when it is set to `0`). The parameter is set to `0` by default |

#### Additional info:

Possible `state` values returned without any filter are:

*   `browsing`
*   `chatting`
*   `logging into chat`
*   `queued`
*   `invited`
*   `refused invitation`
*   `chat closed`

Possible `state` filter values are `chatting` and `queued`.

`prechat_survey` parameter will be available only if the visitor is currently chatting.

`custom_variables` parameter will be available only if the custom variables are defined in the tracking code.

## Add custom visitor details

> Path

```
POST https://api.livechatinc.com/visitors/<VISITOR_ID>/details
```

> Example request

```shell
curl "https://api.livechatinc.com/visitors/S1352647457.ac951bfe2e/details" \
  -H X-API-Version:2
  -d "license_id=12345&\
token=26132406c42c96ba61ed42689b70f719&\
id=my-app&\
fields[0][name]=Age&\
fields[0][value]=36"
```

> Example JSON request

```shell
curl "https://api.livechatinc.com/visitors/S1352647457.ac951bfe2e/details" \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d "{
        "license_id":12345,
        "token":"26132406c42c96ba61ed42689b70f719",
        "id":"my-app",
        "fields":[
          {
            "name":"Age",
            "value":36
          }
        ]
      }"
```

> Example response

```json-doc
{
  "result": "Visitor details added"
}
```

Displays additional information about the visitor in LiveChat apps.

For example, if you have your own database with additional details about your users, you can look up this database based on your visitor’s e-mail address, and display the information from your database for the agent during the chat.

<img src="https://www.livechatinc.com/wp-content/uploads/2013/02/visitor-details1.png" width="300" style="margin:30px 0"/>

**Note:** this method can only be used along with the [Webhooks](/build-an-integration#webhooks). You should create a webhook with `chat_started` event that will be sent to your integration script. This script must read webhook's `license_id` and `token` params and include them in this API method call. See an example integration in [Webhooks documentation](/build-an-integration#webhooks).

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
