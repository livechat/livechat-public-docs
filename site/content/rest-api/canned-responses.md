---
weight: 50
---

# Canned responses

Use this method to **get a full list** of your [Canned responses](https://www.livechatinc.com/kb/canned-responses/) and to **modify them**.

## Available paths {#canned-responses-available-paths}

| Methods      | Path      |
|--------------|-----------|
| `GET`, `POST` | `/canned_responses` |
| `GET`, `PUT`, `POST` | `/canned_responses/<CANNED_RESPONSE_ID>` |

## List all canned responses

> Path

```
GET https://api.livechatinc.com/canned_responses
```

> Sample request

```shell
curl "https://api.livechatinc.com/canned_responses?group=1" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Sample response

```json
[
  {
    "id": 3151,
    "group": 1,
    "text": "Can I help you with anything else?",
    "creation_date": 1358257181,
    "created_by": "john.doe@mycompany.com",
    "tags": [
      "help",
      "else"
    ]
  },
  {
    "id": 3161,
    "group": 1,
    "text": "What product are you interested in?",
    "creation_date": 1358257229,
    "created_by": "john.doe@mycompany.com",
    "modification_date": 1358864338,
    "modified_by": "jenny.doe@mycompany.com",
    "tags": [
      "product",
      "interest"
    ]
  },
  {
      "...": "..."
  }
]
```

Returns the list of all currently set canned responses.

#### Optional parameters

| Parameter | Description |
|---------|--------------------|
| `group` | defaults to `0` |
| `modification_date`, `modification_by` | appear if the canned response has been modified |


## Get a single canned response

`CANNED_RESPONSE_ID` is obtained from the [list of all canned responses](#list-all-canned-responses).

> Path

```
GET https://api.livechatinc.com/canned_responses/<CANNED_RESPONSE_ID>
```

> Sample request

```shell
curl "https://api.livechatinc.com/canned_responses/3151" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Sample response

```json
{
  "id": 3151,
  "group": 1,
  "text": "Can I help you with anything else?",
  "creation_date": 1358257181,
  "created_by": "john.doe@mycompany.com",
  "tags": [
    "help",
    "else"
  ]
}
```

#### Attributes

| Attribute | Description |
|---------|--------------------|
| `id` | id of the canned response |
| `group` | id of the group that canned response is assigned to |
| `text` | canned response text |
| `creation_date` | creation date timestamp |
| `created_by` | login of the canned response's author |
| `tags` | an array of canned response's tags |


## Create a new canned response

> Path

```
POST https://api.livechatinc.com/canned_responses
```

> Sample request

```shell
curl "https://api.livechatinc.com/canned_responses" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -d "text=Have+a+great+day,+goodbye.&\
tags[]=bye&\
tags[]=cu"
```

> Sample JSON request

```shell
curl "https://api.livechatinc.com/canned_responses" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "text":"Have a great day, goodbye.",
        "tags": ["bye", "cu"]
     }'
```

> Sample response

```json
{
  "id": 3181,
  "group": 0,
  "text": "Have a great day, goodbye.",
  "creation_date": 1358866421,
  "created_by": "john.doe@mycompany.com",
  "tags": [
    "cu",
    "bye"
  ]
}
```

Creates a new canned response.

#### Required properties

| Property | Description |
|---------|--------------------|
| `text` | response text |
| `tags` | array of strings (tags) |

#### Optional properties

| Property | Description |
|---------|--------------------|
| `group` | defaults to 0 |

## Update a canned response

> Path

```
PUT https://api.livechatinc.com/canned_responses/<CANNED_RESPONSE_ID>
```

> Sample request

```shell
curl "https://api.livechatinc.com/canned_responses/3181" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X PUT -d "tags[]=bye"
```

> Sample JSON request

```
curl "https://api.livechatinc.com/canned_responses" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -X PUT \
  -d '{
        "tags": ["bye"]
     }'
```

> Sample response

```json
{
  "id": 3181,
  "group": 0,
  "text": "Have a great day, goodbye.",
  "creation_date": 1358866421,
  "created_by": "john.doe@mycompany.com",
  "modification_date": 1358866813,
  "modified_by": "john.doe@mycompany.com",
  "tags": [
    "bye"
  ]
}
```

Updates the specified canned response by setting the values of the parameters passed. Any parameters not provided will be left unchanged.

#### Optional properties

| Property | Description |
|---------|--------------------|
| `text` | response text |
| `tags` | array of strings (tags) |


## Remove a canned response

> Path

```
DELETE https://api.livechatinc.com/canned_responses/<CANNED_RESPONSE_ID>
```

> Example request

```shell
curl "https://api.livechatinc.com/canned_responses/3181" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X DELETE
```

> Example response

```json
{
  "result": "Canned response removed successfully"
}
```

Removes a canned response with the given `CANNED_RESPONSE_ID`.
