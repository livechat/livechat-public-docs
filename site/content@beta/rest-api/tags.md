---
weight: 110
---

# Tags

Using this method, you will be able to **create** and **delete** [Tags](https://www.livechatinc.com/kb/tagging-chats-and-tickets/) in LiveChat. You can also use it to **learn more** about the performance of all your Tags.

## Available paths {#tags-available-paths}

| Methods      | Path      |
|--------------|-----------|
| `GET`, `POST` | `/tags` |
| `DELETE` | `/tags/<TAG>` |

## List all tags

> Path

```
GET https://api.livechatinc.com/tags
```

> Sample request

```shell
curl "https://api.livechatinc.com/tags\
      ?group=1" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Sample response

```json
[
  {
    "name": "sales",
    "author":"john.doe@mycompany.com",
    "creation_date":1402989014,
    "count": 
    {
        "inChats":4,
        "inTickets":1
    },
    group:1
  },
  {
    "name": "support",
    "author":"john.doe@mycompany.com",
    "creation_date":1402991857,
    "count": 
    {
        "inChats":0,
        "inTickets":2
    },
    group:1
  }
]
```

Returns tags from all groups.

#### Optional parameters

| Parameter | Description |
|---------|--------------------|
| `group` | returns tags from chosen group |

## Add a tag

> Path

```
POST https://api.livechatinc.com/tags
```

> Sample request

```shell
curl "https://api.livechatinc.com/tags" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -d "tag=support&\
author=john.doe@mycompany.com&\
group=1"
```

> Sample JSON request

```shell
curl "https://api.livechatinc.com/tags" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "tag":"support",
        "author":"john.doe@mycompany.com",
        "group":1  
      }'
```

> Sample response

```json
{
  "name": "support",
  "author":"john.doe@mycompany.com",
  "creation_date":1402989014,
  "count": 
  {
      "inChats":0,
      "inTickets":0
  },
  group:1
}
```

Adds a new tag. Note that only the owner and the admins are authorized to use this.

#### Required parameters

| Parameter | Description |
|---------|--------------------|
| `author` | agent login |
| `tag` | name of a tag |
| `group` | id of the group that tag will be added to |

## Delete a tag

> Path

```
[DELETE]   /tags/<TAG>
```

> Sample request

```shell
curl "https://api.livechatinc.com/tags/support" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 DELETE \
  -d "group=1"
```

> Sample JSON request

```shell
curl "https://api.livechatinc.com/tags/support" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 DELETE \
  -H Content-type:application/json \
  -d '{
        "group":1
      }' 
```

> Example response

```json
{
  "ok": true
}
```

Deletes a tag from the chosen group. The agents will no longer be able to tag chats and tickets using this tag. 

<aside class="notice">Deleting a tag will not remove it from the archived chats and tickets.</aside>

#### Required properties

| Property | Description |
|---------|--------------------|
| `tag` | tag name |
| `group` | id of the group that the tag is assigned to |
