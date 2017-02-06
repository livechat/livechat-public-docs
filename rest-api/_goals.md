# Goals

Pull information regarding your goals and manage them using this function.

## Available paths

| Methods      | Path      |
|--------------|-----------|
| `GET`, `POST` | `/goals` |
| `GET`, `PUT`, `DELETE` | `/goals/<GOAL_ID>` |
| `POST` | `/goals/<GOAL_ID>/mark_as_successful` |

## List all goals

> Path

```
GET https://api.livechatinc.com/goals
```

> Example request

```shell
curl "https://api.livechatinc.com/goals" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
[
  {
    "id": 1041,
    "name": "purchase",
    "active": 1
  },
  {
    "id": 1181,
    "name": "nike shoes variable",
    "active": 1
  }
]
```

Returns all currently set goals. Parameter `active` tells you if the particular goal is enabled or not.

## Get a single goal details

> Path

```
GET https://api.livechatinc.com/goals/<GOAL_ID>
```

> Example request

```shell
curl "https://api.livechatinc.com/goals/1181" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "id": 1181,
  "name": "nike shoes variable",
  "active": 1,
  "type": "custom_variable",
  "custom_variable_name": "nike_shoes",
  "custom_variable_value": "true"
}
```

Returns goal details for the given `GOAL_ID`.

#### Attributes

| Attribute | Description |
|---------|--------------------|
| `id` | id of the goal |
| `name` | goal name |
| `active` | whether or not the goal is enabled |
| `type` | type of the goal |

#### Additional info

Attribute `type` can take the following values:

*   `custom_variable` – with two additional parameters: `custom_variable_name`, `custom_variable_value`.
*   `url` – with two additional parameters: `url` and `match_type` with possible values: `substring` (default), `exact`.
*   `api` – without any additional parameters.

## Mark goal as successful

> Path

```
POST https://api.livechatinc.com/goals/<GOAL_ID>/mark_as_successful
```

> Example request

```shell
curl "https://api.livechatinc.com/goals/1181/mark_as_successful" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -d "visitor_id=S1281361958.2238ee3bd3"
```

> Example JSON request

```shell
curl "https://api.livechatinc.com/goals/1181/mark_as_successful" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "visitor_id":"S1281361958.2238ee3bd3",
     }'
```

> Example response

```json-doc
{
  "result": "goal marked as successful"
}
```


`GOAL_ID` is obtained from the [goals list](#list-all-goals).

#### Required parameters

| Parameter | Description |
|---------|--------------------|
| `visitor_id` | obtained using JavaScript API: [LC_API.get_visitor_id()](//developers.livechatinc.com/javascript-api#get-visitor-id) |

Optionally you can store additional information regarding the goal. They can be only retrieved using the API.

#### Optional parameters

| Parameter | Example |
|---------|--------------------|
| `order_id` | `AP723HVCA721`|
| `order_description` | `Nike shoes` |
| `order_price` | `199.00`, only the period is allowed as a separation character |
| `order_currency` | `USD` |

## Add a new goal

> Path

```
POST https://api.livechatinc.com/goals
```

> Example request

```shell
curl "https://api.livechatinc.com/goals" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-VERSION:2 \
  -d "name=new%20goal&\
  type=url&\
  url=http://www.mystore.com/checkout/thank_you&\
  match_type=exact"
```

> Example JSON request

```shell
curl "https://api.livechatinc.com/goals" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "name":"new goal",
        "type":"url",
        "url":"http://www.mystore.com/checkout/thank_you",
        "match_type":"exact"
     }'
```

> Example response

```json-doc
{
  "id": 2231,
  "name": "new goal",
  "active": 1,
  "type": "url",
  "match_type": "exact",
  "url": "http://www.mystore.com/checkout/thank_you"
}
```

Creates new goal.

#### Required parameters

| Parameter | Description |
|---------|--------------------|
| `name` | |
| `type`| |

#### Additional info

`type` can take the following values:

*   `custom_variable` – with two additional parameters: `custom_variable_name`, `custom_variable_value`. Both are required.
*   `url` – with two additional parameters: `url` (required) and `match_type` (optional) with possible values: `substring` (default), `exact`.
*   `api` – without any additional parameters.

`active` parameter tells you if the goal is active or not.

## Update a goal

> Path

```
PUT https://api.livechatinc.com/goals/<GOAL_ID>
```

> Example request

```shell
curl "https://api.livechatinc.com/goals/2231" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X PUT -d "name=new%20goal%20paused&\
  active=0"
```

> Example JSON request

```shell
curl "https://api.livechatinc.com/goals/2231" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "name":"new goal paused",
        "active":0
     }'
```

> Example response

```json-doc
{
  "id": 2231,
  "name": "new goal paused",
  "active": 0,
  "type": "url",
  "match_type": "exact",
  "url": "http://www.mystore.com/checkout/thank_you"
}
```

Updates the specified goal by setting the values of the parameters passed. Any parameters not provided will be left unchanged.

`GOAL_ID` is obtained from the [goals list](#list-all-goals).

#### Optional parameters

| Parameter | Description |
|---------|--------------------|
| `name` | |
| `type`| |

#### Additional info

`type` can take the following values:

*   `custom_variable` – with two additional parameters: `custom_variable_name`, `custom_variable_value`. Both are required.
*   `url` – with two additional parameters: `url` (required) and `match_type` (optional) with possible values: `substring` (default), `exact`.
*   `api` – without any additional parameters.

`active` parameter tells you if the goal is active or not.

## Remove a goal

> Path

```
DELETE https://api.livechatinc.com/goals/<GOAL_ID>
```

> Example request

```shell
curl "https://api.livechatinc.com/goals/2231" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X DELETE
```

> Example response

```json-doc
{
  "result": "goal removed successfully"
}
```

Removes a goal with the given `GOAL_ID`.
