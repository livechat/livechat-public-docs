---
weight: 120
---

# Tickets

Use this method to **get information** about a specific case or all [Ticket](https://www.livechatinc.com/kb/support-tickets-in-livechat/) of them. You also use it to **create new** Tickets or **update tags** for the existing Tickets.

## Available paths {#tickets-available-paths}

| Methods      | Path      |
|--------------|-----------|
| `GET` | `/tickets/<TICKET_ID>` |
| `POST` | `/tickets` |
| `PUT` | `/tickets/<TICKET_ID>/tags` |

## Get list of tickets

> Path

```
GET https://api.livechatinc.com/tickets
```

> Sample request

```shell
curl "https://api.livechatinc.com/tickets?\
date_from=2013-11-15&\
status=open" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 
```

> Sample response

```json
{
  "pages": 1,
  "total": 15,
  "tickets": [
  {
    "assignee": {
      "id": "jane.doe@mycompany.com",
      "name": "Jane Doe"
    },
    "events": [
    {
      "author": {
        "id": "mary.brown@email.com",
        "name": "Mary Brown",
        "type": "client"
      },
      "date": 1384554260,
      "is_private": false,
      "message": "Hello,\n\nIt seems that my new shoes are broken. What can we do about this?",
      "type": "message",
      "source": {
        "type": "mail"
      }
    }, {
      "to": {
        "id": "jane.doe@mycompany.com",
        "name": "Jane Doe"
      },
      "author": {
        "id": "john.doe@mycompany.com",
        "name": "John Doe"
      },
      "date": 1384554270,
      "type": "assignee_changed"
    }, {
      "message": "Jane, could you please find a moment to handle this customer's complaint?",
      "is_private": true,
      "author": {
        "type": "agent",
        "id": "john.doe@mycompany.com",
        "name": "John Doe"
      },
      "date": 1384554322,
      "type": "message",
      "source": {
        "type": "lc2"
      }
    }],
    "id": "5FUED",
    "requester": {
      "mail": "mary.brown@email.com",
      "name": "Mary Brown"
    },
    "groups": [0],
    "status": "open",
    "subject": "My new shoes are broken",
    "modified": 1384790802,
    "source": {
      "type": "mail"
    },
    "opened": [{
      "from": 1384554260
    }],
    "firstResponse": {}
  },
  "tags": [
    "sales",
    "support",
    "feedback"
  ],
  (...)
  ]
}
```

Returns all tickets.

#### Optional parameters

| Parameter | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`. Returns the tickets with any of their activities matching the date. Defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`. Returns the tickets with any of their activities matching the date. Defaults to `today` |
| `page` | page number, defaults to 1 |
| `assigned` | if `0`, returns only the unassigned tickets. If `1`, returns only the tickets assigned to any agent |
| `order` | orders the tickets by date of the last ticket modification. Possible values: `desc`, `asc`. Defaults to `desc` |
| `status` | not set by default. Possible values: `open`, `pending`, `solved` or `spam` |
| `assignee` | return the tickets assigned to the given agent's login |
| `query` | return the tickets containing the query |
| `requester[mail]` | returns the tickets assigned to the given requester |
| `group` | returns the tickets for the given group |
| `source` | returns the tickets for the given source. Possible values: `lc2` (created from archives), `mail`, `facebook`, `agent-app-manual` (created manually), `chat-window` (created from ticket form) |
| `tag` | returns the statistics for the specified tag |
| `tagged` | `1/0`. If 1 is passed, returns the tickets with any tag. If 0 passed, returns the tickets with no tags |


#### Additional info:

The results are divided into pages, each containing 25 tickets.

`total` indicates the total number of tickets.  
`pages` indicates the total number of pages.

To access next pages of the results, use `?page=<PAGE>` parameter.  
Please note that the first page's number is `1`, not `0`.

## Get single ticket

> Path

```
GET https://api.livechatinc.com/tickets/<TICKET_ID>
```

> Sample request

```shell
curl "https://api.livechatinc.com/tickets/5FUED" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 
```

> Sample response

> *The return format is the same as the single ticket item in [tickets list](#get-list-of-tickets).*

Returns a single ticket item for the given `TICKET_ID`.

## Create a ticket

> Path

```
POST https://api.livechatinc.com/tickets
```

> Sample request

```
curl "https://api.livechatinc.com/tickets" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2  \
  -X POST -d "subject=I+have+a+problem&\
  message=Hi,I+have+a+problem+with+my+shoes.+Could+you+please+advise?&\
  requester[mail]=mary.brown@email.com&\
  requester[name]=Mary+Brown"
```

> Sample JSON request

```shell
curl "https://api.livechatinc.com/tickets" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
      "subject":"I have a problem",
      "message":"Hi,I have a problem with my shoes. Could you please advise?",
      "requester":
      {
        "mail":"mary.brown@email.com",
        "name":"Mary Brown"
      }
     }'
```

> Sample response

```json
The return format is the same as the single ticket item in [tickets list](#get-tickets).

```

Creates a new ticket.

#### Required parameters

| Parameter | Description |
|---------|--------------------|
| `message` | requester's message |
| `requester[mail]` | requester's email address |

#### Optional parameters

| Parameter | Description |
|---------|--------------------|
| `requester[name]` | requester's name |
| `assignee[id]` | login of the agent that will be assigned to the ticket |
| `source[type]` | source of the ticket. Possible values: `chat-window`, `mail` or `lc2`. Defaults to `lc2` |
| `source[url]` | url of the website that the ticket was sent from. Applies only if `source[type]` is `chat-window` |
| `subject` | ticket subject. Defaults to `(no subject)` |
| `group` | list of groups. Must be an array with group IDs. Defaults to `[0]` |


## Update ticket tags

> Path

```
PUT https://api.livechatinc.com/tickets/<TICKET_ID>/tags
```
Sample
> Example request

```shell
curl "https://api.livechatinc.com/tickets/5FUED/tags" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X PUT \
  -d "tag[]=sales&\
tag[]=support&\
tag[]=feedback" 
```

> Sample JSON request

```
curl "https://api.livechatinc.com/tickets/5FUED/tags" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "tag":["sales","support","feedback"]
     }'
```

> Sample response

```json
{
  "pages": 1,
  "total": 15,
  "tickets": [
  {
    "assignee": {
      "id": "jane.doe@mycompany.com",
      "name": "Jane Doe"
    },
    "events": [
    {
      "author": {
        "id": "mary.brown@email.com",
        "name": "Mary Brown",
        "type": "client"
      },
      "date": 1384554260,
      "is_private": false,
      "message": "Hello,\n\nIt seems that my new shoes are broken. What can we do about this?",
      "type": "message",
      "source": {
        "type": "mail"
      }
    }, {
      "to": {
        "id": "jane.doe@mycompany.com",
        "name": "Jane Doe"
      },
      "author": {
        "id": "john.doe@mycompany.com",
        "name": "John Doe"
      },
      "date": 1384554270,
      "type": "assignee_changed"
    }, {
      "message": "Jane, could you please find a moment to handle this customer's complaint?",
      "is_private": true,
      "author": {
        "type": "agent",
        "id": "john.doe@mycompany.com",
        "name": "John Doe"
      },
      "date": 1384554322,
      "type": "message",
      "source": {
        "type": "lc2"
      }
    }],
    "id": "5FUED",
    "requester": {
      "mail": "mary.brown@email.com",
      "name": "Mary Brown"
    },
    "groups": [0],
    "status": "open",
    "subject": "My new shoes are broken",
    "modified": 1384790802,
    "source": {
      "type": "mail"
    },
    "opened": [{
      "from": 1384554260
    }],
    "firstResponse": {}
  },
  "tags": [
    "sales",
    "support",
    "feedback"
  ],
  (...)
  ]
}
```

Updates tags associated with the ticket.

#### Required parameters

| Parameter | Description |
|---------|--------------------|
| `tag` | array of used tags |
