#Greetings

You can use this method to create new and modify existing [Greetings](https://www.livechatinc.com/kb/why-should-i-set-up-chat-greetings/). It can be also used to **look up Greetings data**.

## Available paths

| Methods      | Path      |
|--------------|-----------|
| `GET`, `POST` | `/greetings` |
| `GET`, `POST`, `DELETE` | `/greetings/<GREETING_ID>` |

## List all greetings

> Path

```
GET -H X-API-Version:2 https://api.livechatinc.com/greetings
```
> Example request

```shell
curl "https://api.livechatinc.com/greetings\
  ?group=1" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
[
  {
    "id": 2291,
    "active": true,
    "name": "Time on site: 5 sec",
    "rules": [
      {
        "id": 8201,
        "value": "5",
        "type": "visit_time_site",
        "operator": "equals",
        "condition": "and"
      }
    ],
    "properties": {
      "active": "1",
      "greeting-message_text": "Hello, how may I help you?"
    }
  },
  {
    "id": 2411,
    "active": true,
    "name": "Returning visitor",
    "rules": [
      {
        "id": 8191,
        "value": "2",
        "type": "visits_number",
        "operator": "greater_or_equal",
        "condition": "and"
      }
    ],
    "properties": {
      "active": "1",
      "greeting-message_text": "Hello again!"
    }
  }
]
```

Returns the list of all greetings.

#### Optional properties

| Property | Description |
|---------|--------------------|
| `group` | Group number can be specified to get greetings from a given group. If not specified, all greetings will be returned |

## Get a single greeting

> Path

```
GET -H X-API-Version:2 https://api.livechatinc.com/greetings/<GREETING_ID>
```

> Example request

```shell
curl "https://api.livechatinc.com/greetings/2411" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example result

```json-doc
{
  "id": 2411,
  "active": true,
  "name": "Returning visitor",
  "rules": [
    {
      "id": 8191,
      "value": "2",
      "type": "visits_number",
      "operator": "greater_or_equal",
      "condition": "and"
    }
  ],
  "properties": {
    "active": "1",
    "greeting-message_text": "Hello again!"
  }
}
```

Returns the specified greeting.

#### Additional info:

*   `active` – Tells you whether the greeting is enabled or not
*   `rules` – Gives you an array with all the rules for the specified greeting.

## Create a new greeting

> Path

```
[POST] /greetings
```

Use this function to create a new greeting.

#### Required properties

| Property | Description |
|---------|--------------------|
| `name` | greeting name displayed in LiveChat settings (not visible to your website visitors) |
| `rules` | an array of conditions that must be met for the greeting to be displayed. Greeting rules are [documented below](#greeting-rules) |

#### Optional properties

| Property | Description |
|---------|--------------------|
| `group` | creates a greeting displayed in particular group only. Defaults to `0` |

## Greeting rules

> Example request

```shell
curl "https://api.livechatinc.com/greetings" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -d "name=my+custom+invitation&\
rules[0][type]=visit_time_page&\
rules[0][value]=15&\
rules[0][operator]=greater_than&\
rules[1][type]=visits_number&\
rules[1][value]=2&\
rules[1][operator]=greater_or_equal"
```

> Example JSON request

```shell
curl "https://api.livechatinc.com/greetings" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "name":"my custom invitation",
        "rules":[
          {
            "type":"visit_time_page",
            "value":15,
            "operator":"greater_than"
          },
          {
            "type":"visits_number",
            "value":2,
            "operator":"greater_or_equal"
          }
        ]
      }'
```

> Example result

```json-doc
{
  "id": 2451,
  "active": true,
  "name": "my custom invitation",
  "rules": [
    {
      "id": 8241,
      "value": "2",
      "type": "visits_number",
      "operator": "greater_or_equal",
      "condition": "and"
    },
    {
      "id": 8251,
      "value": "15",
      "type": "visit_time_page",
      "operator": "greater_than",
      "condition": "and"
    }
  ],
  "properties": {
    "active": "1",
    "greeting-message_text": "Hello, would you like to talk about our products?"
  }
}
```

Greeting rules are the conditions that must be met for a greeting to be displayed.

Each greeting rule can contain an `operator`. Here's a list of possible operators:

* `equals`, 
* `doesnt_equal`, 
* `lower_than`, 
* `lower_or_equal`, 
* `greater_than`, 
* `greater_or_equal`, 
* `contains`, 
* `doesnt_contain`.

The default value for `operator` is `equals`.

And here's a list of greeting rules you can use:

| Rule | Description |
|---------|--------------------|
| `visit_time_site` | After visitor spent a certain amount of time on site |
| `visit_time_page` | After visitor spent a certain amount of time on page |
| `url_current` | For visitors on specific pages |
| `url_visited` | When visitor visited specific pages |
| `pages_view_number` | For visitors who have seen the page for a number of times |
| `url_referrer` | When the visitor arrived from a referring page |
| `geolocation` | For visitors from specific countries or cities |
| `visits_number` | For returning visitors |
| `search_keyword` | When visitor looked up a search keyword |
| `custom_variable` | The greeting will be sent when the specified variable is met [documented below](#custom-variable) |
| `url_funnel` | Visitors who visit the specified sequence of websites will receive the greeting [documented below](#url-funnel) |


### Custom variable

> Example request

```shell
curl "https://api.livechatinc.com/greetings\
  ?group=1" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -d "name=custom+variable+type+greeting&\
rules[0][type]=custom_variable&\
rules[0][variable_name]=my_custom_var&\
rules[0][variable_value]=var_value&\
rules[0][operator]=contains"
```

> Example JSON request

```
curl "https://api.livechatinc.com/greetings\
  ?group=1" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "name":"custom variable type greeting",
        "rules":[
          {
            "type":"custom_variable",
            "variable_name":"my_custom_var",
            "variable_value":"var_value"
            "operator":"contains"
          }
        ]
      }'
```

> Example result

```json-doc
{
  "id": 2431,
  "active": true,
  "name": "custom variable type greeting",
  "rules": [
    {
      "id": 8221,
      "type": "custom_variable",
      "operator": "contains",
      "condition": "and",
      "variable_name": "my_custom_var",
      "variable_value": "var_value"
    }
  ],
  "properties": {
    "active": "1",
    "greeting-message_text": "Hello, would you like to talk about our products?"
  }
}
```

The greeting will be sent when the specified variable is met.

<aside class="notice">When using the `custom_variable` greeting rule, you also need to provide `variable_name` and `variable_value`. You also can add the optional `operator` parameter (defaults to `equals`).</aside>



### URL Funnel

> Example request

```shell
curl "https://api.livechatinc.com/greetings" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -d "name=url+funnel+type+greeting&\
rules[0][type]=url_funnel&\
rules[0][urls][0][url]=mystore.com/shoes&\
rules[0][urls][0][operator]=equals&\
rules[0][urls][1][url]=cart&\
rules[0][urls][1][operator]=contains"
```

> Example JSON request

```shell
curl "https://api.livechatinc.com/greetings" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "name":"url funnel type greeting",
        "rules":[
          {
            "type":"url_funnel",
            "urls":[
              {
                "url":"mystore.com/shoes",
                "operator":"equals"
              },
              {
                "url":"cart",
                "operator":"contains"
              }
            ]
          }
        ]
      }'
```

> Example result

```json-doc
{
  "id": 2441,
  "active": true,
  "name": "url funnel type greeting",
  "rules": [
    {
      "id": 8231,
      "type": "url_funnel",
      "condition": "and",
      "urls": [
        {
          "url": "mystore.com/shoes",
          "operator": "equals"
        },
        {
          "url": "cart",
          "operator": "contains"
        }
      ]
    }
  ],
  "properties": {
    "active": "1",
    "greeting-message_text": "Hello, would you like to talk about our products?"
  }
}
```

Visitors who visit the specified sequence of websites will receive the greeting.

<aside class="notice">When using the `url_funnel` greeting rule, you need to provide the `urls` variable. It is an array of objects with the required `url` parameter and optional `operator` parameter (defaults to: `equals`).</aside>

## Greetings with mutliple rules

> Example request

```shell
curl "https://api.livechatinc.com/greetings" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -d "name=my+custom+invitation&\
rules[0][type]=visit_time_site&\
rules[0][value]=15&\
rules[1][type]=custom_variable&\
rules[1][variable_name]=empty_cart&\
rules[1][variable_value]=true&\
rules[2][type]=url_current&\
rules[2][value]=shoes&\
rules[2][operator]=contains"
```

> Example JSON request

```shell
curl "https://api.livechatinc.com/greetings" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "name":"my custom invitation",
        "rules":[
          {
            "type":"visit_time_site",
            "value":15
          },
          {
            "type":"custom",
            "variable_name":"empty_cart",
            "variable_value":true
          },
          {
            "type":"url_current",
            "value":"shoes",
            "operator":"contains"
          }
        ]
      }'
```

> Example result

```json-doc
{
  "id": 2471,
  "active": true,
  "name": "my custom invitation",
  "rules": [
    {
      "id": 8261,
      "type": "custom_variable",
      "operator": "equals",
      "condition": "and",
      "variable_name": "empty_cart",
      "variable_value": "true"
    },
    {
      "id": 8271,
      "value": "15",
      "type": "visit_time_site",
      "operator": "equals",
      "condition": "and"
    },
    {
      "id": 8281,
      "value": "shoes",
      "type": "url_current",
      "operator": "contains",
      "condition": "and"
    }
  ],
  "properties": {
    "active": "1",
    "greeting-message_text": "Hello, would you like to talk about our products?"
  }
}
```

You can create a greeting that will have more than one rule.

## Update a greeting

> Path

```shell
PUT -H X-API-Version:2 -d "..." "https://api.livechatinc.com/greetings/<GREETING_ID>"
```

You can change the previously created greetings using this request. `GREETING_ID` is obtained from the [all greetings](#get-greetings) list.

### Update greeting name or message

> Example request

```shell
curl "https://api.livechatinc.com/greetings/2491" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X PUT -d "name=athletic+shoes&\
properties[greeting-message_text]=Hello"
```

Use this request to change the name or message of a greeting.

### Activate and deactivate greetings

> Example request

```shell
curl "https://api.livechatinc.com/greetings/2491" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X PUT -d "active=0"
```

Activate or deactivate a greeting using this request.

### Change greetings rules

> Example request

```shell
curl "https://api.livechatinc.com/greetings/2491"\
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X PUT -d "rules[0][type]=custom_variable&\
rules[0][variable_name]=athletic_shoes&\
rules[0][variable_value]=true" 
```

> Example result

```json-doc
{
  "id": 2491,
  "active": false,
  "name": "athletic shoes",
  "rules": [
    {
      "id": 8371,
      "type": "custom_variable",
      "operator": "equals",
      "condition": "and",
      "variable_name": "athletic_shoes",
      "variable_value": "true"
    }
  ],
  "properties": {
    "active": "0",
    "greeting-message_text": "Hi, are you looking for some athletic shoes"
  }
}
```

Change the rules of your greetings with this request.

## Remove a greeting

> Path

```
DELETE https://api.livechatinc.com/greetings/<GREETING_ID>
```

> Example request

```shell
curl "https://api.livechatinc.com/greetings/2491" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X DELETE
```

> Example response

```json-doc
{
  "ok": true
}
```

Removes an greeting.
