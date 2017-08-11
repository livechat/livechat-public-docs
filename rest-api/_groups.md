# Groups

Use this method to get [Agent Groups](https://www.livechatinc.com/features/team-management/#Groups) data and also to **create new** and **modify the existing** Groups.

## Available paths

| Methods      | Path      |
|--------------|-----------|
| `GET`, `POST` | `/groups` |
| `GET`, `PUT`, `DELETE` | `/groups/<GROUP_ID>` |

## List all groups

> Path

```
GET https://api.livechatinc.com/groups
```

> Sample request

```shell
curl "https://api.livechatinc.com/groups" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Sample response

```json-doc
[
  {
    "id": 0,
    "name": "All operators",
    "language": "en"
  },
  {
    "id": 1,
    "name": "Invoicing",
    "language": "en",
    "agents": [
      "jane.doe@mycompany.com"
    ]
  },
  {
    "id": 2,
    "name": "Sales",
    "language": "en",
    "agents": [
      "john.doe@mycompany.com",
      "jenny.doe@mycompany.com"
    ]
  },
  {
    "id": 3,
    "name": "Technical Support",
    "language": "en",
    "agents": [
      "john.doe@mycompany.com"
    ]
  }
]
```

Returns all created groups.

#### Additional info:

* `language` specifies the chat window language for the particular group.  
* `agents` list contains all members of the particular group. The group with id _0_ doesn't return the agents list because it always contains all agents from the license and it cannot be modified.

## Get a single group details

> Path

```
GET https://api.livechatinc.com/groups/<GROUP_ID>
```

> Sample request

```
curl "https://api.livechatinc.com/groups/2" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Sample response

```json-doc
{
  "id": 2,
  "name": "Sales",
  "language": "en",
  "agents": [
    "john.doe@mycompany.com",
    "jenny.doe@mycompany.com"
  ],
  "status": "accepting chats"
}
   
```

Returns group details for the given `GROUP_ID`.

#### Attributes

| Attribute | Description |
|---------|--------------------|
| `id` | id of the group |
| `name` | group name |
| `language` | group language (defaults to English). See the [list of supported languages](http://www.livechatinc.com/kb/how-to-modify-chat-window-language/#supported-languages) |
| `agents` | an array of group members' logins |
| `status` | current status of the group |

#### Additional info:

The `status` can take the following values:

*   `accepting chats` – when at least one agent from the group is logged in and has the `accepting chats` status.
*   `not accepting chats` – when at least one agent from the group is logged in but has the `not accepting chats` status.
*   `offline` – when all agents from the group are offline.

## Create a new group

> Path

```
POST https://api.livechatinc.com/groups
```

> Sample request

```shell
curl "https://api.livechatinc.com/groups" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -d "name=Human+Resources&\
agents[0]=jenny.doe@mycompany.com&\
agents[1]=john.doe@mycompany.com"
```

> Sample JSON request

```shell
curl "https://api.livechatinc.com/groups" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
       "name":"Human Resources",
       "agents[0]":"jenny.doe@mycompany.com",
       "agents[1]":"john.doe@mycompany.com" 
      }'  
```

> Sample response

```json-doc
{
  "id": 4,
  "name": "Human Resources",
  "language": "en",
  "agents": [
    "jenny.doe@mycompany.com",
    "john.doe@mycompany.com"
  ],
  "status": "offline"
}
   
```

Creates a new group in your license.

#### Required properties

| Property | Description |
|---------|--------------------|
| `name` | group name |
| `agents` | an array of LiveChat users' logins (e-mails) |

#### Optional properties

| Property | Description |
|---------|--------------------|
| `language` | group language (defaults to English). See the [list of supported languages](http://www.livechatinc.com/kb/how-to-modify-chat-window-language/#supported-languages) |


## Update a group

> Path

```
PUT https://api.livechatinc.com/groups/<GROUP_ID>
```

> Sample request

```shell
curl "https://api.livechatinc.com/groups/3" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X PUT \
  -d "name=Quality+Assurance&\
agents[0]=john.doe@mycompany.com&\
agents[1]=jane.doe@mycompany.com"
```

> Sample JSON request

```shell
curl "https://api.livechatinc.com/groups/3" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 -X PUT \   
  -H Content-type:application/json \
  -d '{
        "name"="Quality Assurance",
        "agents[0]":"john.doe@mycompany.com",
        "agents[1]":"jane.doe@mycompany.com"
      }'
```

> Sample response

```json-doc
{
  "id": 3,
  "name": "Quality Assurance",
  "language": "en",
  "agents": [
    "john.doe@mycompany.com",
    "jane.doe@mycompany.com"
  ],
  "status": "offline"
 }
   
```

Updates the specified group by setting the values of the parameters passed. Any parameters not provided will be left unchanged.

#### Optional properties

| Property | Description |
|---------|--------------------|
| `name` | group name |
| `language` | see the [list of supported languages](http://www.livechatinc.com/kb/how-to-modify-chat-window-language/#supported-languages) |
| `agents` | an array of LiveChat users' logins (e-mails) |


## Remove a group

> Path

```
DELETE https://api.livechatinc.com/groups/<GROUP_ID>
```

> Sample request

```shell
curl "https://api.livechatinc.com/groups/4" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X DELETE
```

> Sample response

```json-doc
{
  "result": "group removed successfully"
}
   
```

Removes a group with the given `GROUP_ID`.
