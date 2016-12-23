# Archives

Get finished chats and left messages by using the "type" parameter of this function. Additionally, you can also use it to send chat transcripts.

## Available paths

| Methods       | Path      |
|--------------|-----------|
| `GET` | `/chats` |
| `GET` | `/chats/<CHAT_ID>` |
| `POST` | `/chats/<CHAT_ID>/send_transcript` |
| `PUT` | `/chats/<CHAT_ID>/tags` |

## Get list of chats

> Path

```
GET https://api.livechatinc.com/chats
```

> Example request

```shell
curl "https://api.livechatinc.com/chats?\
      date_from=2013-01-23&\
      has_goal=1" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
   "chats":[
      {
         "type":"chat",
         "id":"MH022RD0K5",
         "visitor":{
            "id":"S1355415390.49b8940793",
            "name":"Mary Brown",
            "ip":"85.10.5.156",
            "city": "Central District",
            "country": "Hong Kong",
            "country_code": "HK",
            "timezone": "Asia/Hong_Kong",
            "region": ""
         },
         "agents":[
            {
               "display_name":"John Doe",
               "email":"john.doe@mycompany.com"
            }
         ],
         "supervisors":[
            {
               "display_name":"Jane Doe",
               "email":"jane.doe@mycompany.com"
            }
         ],
         "rate":"not_rated",
         "duration":1456,
         "chat_start_url":"https://livechatinc.com",
         "referrer":"https://domain.com",
         "group":[
            0
         ],
         "started":"Wed, 01/23/13 11:40:53 am",
         "prechat_survey":[
            {
               "key":"Name:",
               "value":"",
               "id":"13589376348060238"
            },
            {
               "key":"E-mail:",
               "value":"",
               "id":"135893763480606511"
            }
         ],
         "postchat_survey":[
            {
               "key":"How would you rate the quality of support?",
               "value":"Good",
               "id":"137164167769201638"
            }
         ],
         "custom_variables":[
            {
               "key":"customer_login",
               "value":"mary_brown"
            }
         ],
         "integration_variables":[
            {
               "key":"facebook.id",
               "value":"123456789"
            },
            // ...
            {
               "key":"facebook.email",
               "value":"mary.brown@email.com"
            }
         ],
         "goals":[
            {
               "id":71,
               "name":"goal_name",
               "order":{
                  "id":"ABC",
                  "description":"product one",
                  "price":"199",
                  "currency":"CZK"
               }
            },
            {
               "id":72,
               "name":"goal_name",
               "order":{

               }
            }
         ],
         "queue":{
            "duration":20
         },
         "tags":[
            "sales",
            "support",
            "feedback"
         ],
         "timezone": "Europe/Berlin",
         "messages":[
            {
               "author_name":"John Doe",
               "text":"Hello",
               "date":"Wed, 01/23/13 11:40:53 am",
               "timestamp":1358937653,
               "user_type":"agent",
               "agent_id":"john.doe@mycompany.com"
            },
            // ...
         ],
         "events":[
            {
               "author_name":"John Doe",
               "text":"Hello",
               "date":"Wed, 01/23/13 11:40:53 am",
               "timestamp":1358937653,
               "user_type":"agent",
               "agent_id":"john.doe@mycompany.com",
               "type":"message"
            },
            {
               "text":"Mary Brown uploaded the attachment.",
               "date":"Wed, 01/23/13 11:41:02 am",
               "timestamp":1358937662,
               "type":"attachment",
               "user_type":"visitor",
               "files":[
                  "https://static.livechatinc.com/.../hello.JPG"
               ],
               "author_name":"Mary Brown"
            },
            {
               "author_name":"John Doe",
               "text":"Thanks, fine :)",
               "date":"Wed, 01/23/13 11:41:05 am",
               "timestamp":1358937665,
               "user_type":"agent",
               "agent_id":"john.doe@mycompany.com",
               "type":"message"
            },
            {
               "author_name":"Jane Doe",
               "text":"Message from supervisor.",
               "date":"Wed, 01/23/13 11:57:13 am",
               "timestamp":1358938633,
               "user_type":"supervisor",
               "agent_id":"jane.doe@mycompany.com",
               "type":"message"
            },
            {
               "text":"Mary Brown closed the chat.",
               "date":"Wed, 01/23/13 11:57:14 am",
               "timestamp":1358937663,
               "type":"event",
               "user_type":"visitor"
            },
         ],
         "engagement":immediate_start,
         "started_timestamp":1358937653,
         "ended_timestamp":1358939109,
         "ended":"Wed, 01/23/13 12:05:09 pm"
      },
      {
         "...":"..."
      }
   ],
   "total":2,
   "pages":1
}
```

Returns all ended chats.

#### Optional parameters

| Parameter | Description |
|---------|----------------------------|
| `date_from` | `YYYY-MM-DD` Defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD` Defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `page` | page number, defaults to 1 |
| `visitor_id` | return chats with specified visitor_id |
| `query` | return chats containing the query |
| `agent` | return chats for given agent login |
| `group` | return chats for given group id |
| `goal` | return chats for given goal id |
| `has_goal` | `1/0`. If 1 is passed, returns chats having any goal |
| `queued` | `1/0`. If 1 is passed, returns chats started from queue |
| `rate` | filter chats considering its rating status. Available values: `rated`, `not_rated`, `rated_good`, `rated_bad` |
| `include_pending` | `1/0`. Whether to include chats that haven't yet ended. Pending chats can be recognized by `pending: true` attribute | They may appear with some delay because of caching reasons |
| `tag[]` | filter chats by a specified tag |
| `tagged` | `1/0`. If 1 is passed, chats with any tag are returned. If 0 is passed, only chats without a tag are returned |
| `comment` | `1/0`. If 1 is passed, chats with rating comments are returned |
| `city` | filters by city, values should be entered and are returned in the local language |
| `region` | filters by region. This could be a state, voivodeship, canton, county etc. Values should be entered and are returned in the local language |
| `country` | filters by country name. All values are in english |

#### Additional info

| Parameter | Description |
|---------|----------------------------|
| `goal` | parameter will appear only if a goal for a particular chat has been reached
| `referrer` | parameter will appear only if referrer url exists
| `custom_variables` | parameter will be available only if the custom variables are defined in the tracking code
| `integration_variables` | parameter will appear only if a visitor logs in with Facebook
| `queue` | parameter will appear only if chat started from queue
| `engagement` | – possible values: `auto_invite` (chat from automatic invitation), `manual_invite` (chat from manual invitation), `immediate_start` (visitor started chats themselves)
| `duration` | is counted in seconds
| `total` | tells you the total number of chats
| `pages` | tells you the total number of pages
| `city`, `region`, `country` | geolocation filters have been working for chats since May 11, 2015

Results are divided into pages, each containing 25 chats. To access next pages of the results, use `?page=<PAGE>` parameter. Please note that first page's number is `1`, not `0`.


## Get single chat

Returns single chat item for the given `CHAT_ID`.

> Path

```
GET https://api.livechatinc.com/chats/<CHAT_ID>
```

> Example request

```shell
curl "https://api.livechatinc.com/chats/MH022RD0K5" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

> *Return format is the same as the single chat item in [get list of chats](#get-list-of-chats).*

## Send chat transcript to e-mail

> Path

```
POST https://api.livechatinc.com/chats/<CHAT_ID>/send_transcript
```

> Example request

```shell
curl "https://api.livechatinc.com/chats/MH022RD0K5/send_transcript" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -d "to=john.doe@mycompany.com"
```

> Example JSON request

```shell
curl "https://api.livechatinc.com/chats/MH022RD0K5/send_transcript" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \  
  -d '{
       "to":"john.doe@mycompany.com"
      }'
```

> Example response

```json-doc
{
  "result": "E-mail has been sent to john.doe@mycompany.com."
}
```

#### Required parameter

| Parameter | Description |
|---------|--------------------|
| `to`   | receiver's email address. |


## Update chat tags

> Path

```
PUT https://api.livechatinc.com/chats/<CHAT_ID>/tags
```

> Example request

```shell
curl "https://api.livechatinc.com/chats/MH022RD0K5/tags" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -X PUT \
  -H X-API-Version:2 \
  -d "tag[]=sales&\
tag[]=support&\
tag[]=feedback"
```

> Example JSON request

```shell
curl "https://api.livechatinc.com/chats/MH022RD0K5/tags" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -X PUT \
  -H X-API-Version:2 \
  -H Content-type:application/json \ 
  -d '{
        "tag[]":"sales",
        "tag[]":"support",
        "tag[]":"feedback"
      }'
```

> Example response

```json-doc
{
   "chats":[
      {
         "type":"chat",
         "id":"MH022RD0K5",
         "visitor":{
            "id":"S1355415390.49b8940793",
            "name":"Mary Brown",
            "ip":"85.10.5.156",
            "city": "Central District",
            "country": "Hong Kong",
            "country_code": "HK",
            "timezone": "Asia/Hong_Kong",
            "region": ""
         },
         "agents":[
            {
               "display_name":"John Doe",
               "email":"john.doe@mycompany.com"
            }
         ],
         "supervisors":[
            {
               "display_name":"Jane Doe",
               "email":"jane.doe@mycompany.com"
            }
         ],
         "rate":"not_rated",
         "duration":1456,
         "chat_start_url":"https://livechatinc.com",
         "referrer":"https://domain.com",
         "group":[
            0
         ],
         "started":"Wed, 01/23/13 11:40:53 am",
         "prechat_survey":[
            {
               "key":"Name:",
               "value":"",
               "id":"13589376348060238"
            },
            {
               "key":"E-mail:",
               "value":"",
               "id":"135893763480606511"
            }
         ],
         "postchat_survey":[
            {
               "key":"How would you rate the quality of support?",
               "value":"Good",
               "id":"137164167769201638"
            }
         ],
         "custom_variables":[
            {
               "key":"customer_login",
               "value":"mary_brown"
            }
         ],
         "integration_variables":[
            {
               "key":"facebook.id",
               "value":"123456789"
            },
            {
               "...":"..."
            }
         ],
         "goals":[
            {
               "id":71,
               "name":"goal_name",
               "order":{
                  "id":"ABC",
                  "description":"product one",
                  "price":"199",
                  "currency":"CZK"
               }
            },
            {
               "id":72,
               "name":"goal_name",
               "order":{
               }
            }
         ],
         "queue":{
            "duration":20
         },
         "tags":[
            "tag1",
            "tag2",
            "tag3"
         ],
         "timezone": "Europe/Berlin",
         "messages":[
            {
               "author_name":"John Doe",
               "text":"Hello",
               "date":"Wed, 01/23/13 11:40:53 am",
               "timestamp":1358937653,
               "user_type":"agent",
               "agent_id":"john.doe@mycompany.com"
            },
            {
               "...":"..."
            }
         ],
         "events":[
            {
               "author_name":"John Doe",
               "text":"Hello",
               "date":"Wed, 01/23/13 11:40:53 am",
               "timestamp":1358937653,
               "user_type":"agent",
               "agent_id":"john.doe@mycompany.com",
               "type":"message"
            },
            {
               "...":"..."
            },
         ],
         "engagement":immediate_start,
         "started_timestamp":1358937653,
         "ended_timestamp":1358939109,
         "ended":"Wed, 01/23/13 12:05:09 pm"
      },
      {
         "...":"..."
      }
   ],
   "total":2,
   "pages":1
}
```

Method updates tags assigned to a chat.

#### Required parameter

| Parameter | Description |
|---------|--------------------|
| `tag`   | array of used tags |