# Tickets

Get all tickets and manage them using this set of API methods.

## Available paths

| Methods      | Path      |
|--------------|-----------|
| `GET` | `/tickets/chats/total_chats` |
| `GET` | `/tickets/<TICKET_ID>` |
| `POST` | `/tickets` |
| `PUT` | `/tickets/<TICKET_ID>/tags` |

## Get list of tickets

> Path

```
GET https://api.livechatinc.com/tickets
```

> Example request

```shell
curl "https://api.livechatinc.com/tickets?\
date_from=2013-11-15&\
status=open" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 
```

> Example response

```json-doc
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
| `date_from` | `YYYY-MM-DD`. Returns tickets with any of its activities matching the date. Defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`. Returns tickets with any of its activities matching the date. Defaults to `today` |
| `page` | page number, defaults to 1 |
| `assigned` | if `0`, returns only unassigned tickets. If `1`, returns only tickets assigned to any agent |
| `order` | orders tickets by date of last ticket modification. Possible values: `desc`, `asc`. Defaults to `desc` |
| `status` | not set by default. Possible values: `open`, `pending`, `solved` or `spam` |
| `assignee` | return tickets assigned to given agent's login |
| `query` | return tickets containing the query |
| `requester[mail]` | return tickets assigned to given requester |
| `group` | return tickets for given group |
| `source` | return tickets for given source. Possible values: `lc2` (created from archives), `mail`, `facebook`, `agent-app-manual` (created manually), `chat-window` (created from ticket form) |
| `tag` | return statistics for the specified tag |
| `tagged` | `1/0`. If 1 is passed, returns tickets having any tag. If 0 passed, returns tickets without any tag |


#### Additional info:

Results are divided into pages, each containing 25 tickets.

`total` tells you the total number of tickets.  
`pages` tells you the total number of pages.

To access next pages of the results, use `?page=<PAGE>` parameter.  
Please note that first page's number is `1`, not `0`.

## Get single ticket

> Path

```
GET https://api.livechatinc.com/tickets/<TICKET_ID>
```

> Example request

```shell
curl "https://api.livechatinc.com/tickets/5FUED" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 
```

> Example response

> *Return format is the same as the single ticket item in [tickets list](#get-list-of-tickets).*

Returns single ticket item for the given `TICKET_ID`.

## Create a ticket

> Path

```
POST https://api.livechatinc.com/tickets
```

> Example request

```
curl "https://api.livechatinc.com/tickets" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2  \
  -X POST -d "subject=I+have+a+problem&\
  message=Hi,I+have+a+problem+with+my+shoes.+Could+you+please+advise?&\
  requester[mail]=mary.brown@email.com&\
  requester[name]=Mary+Brown"
```

> Example JSON request

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

> Example response

```json-doc
Return format is the same as the single ticket item in [tickets list](#get-tickets).

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

> Example JSON request

```
curl "https://api.livechatinc.com/tickets/5FUED/tags" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "tag":["sales","support","feedback"]
     }'
```

> Example response

```json-doc
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
