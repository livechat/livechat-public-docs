# Agent Chat API


## Introduction
### Connection

Connection is established with Socket.io.

{{{ui-copy-input}{Connection endpoint}{https://api.livechatinc.com/}{Copy URL}}}


### Events order
Chat messages are not guaranteed to be sorted by server. Client should sort them by `order` parameter. Do not use `timestamp` to sort messages because two events can have the same timestamp.

## Objects
Objects are standardized data formats that are used in API requests and responses.

You don't need to wonder if you should use `chat_id` or `chatID` parameter in your API call. Instead, just look up the `Chat` object structure to know how to use it in the request or when parsing the response.

Objects can include other objects. For example, `Chat` object may return `users` array which is a list of `User` objects.
### Chat
```json-doc
{
  "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "threads": [
    // array of "Thread" objects
  ]
}
```

### Thread
```json-doc
{
  "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "active": true,
  "users": [
    // array of "User" objects
  ],
  "events": [
    // array of "Event" objects
  ],
  "order": 112057129857
}
```

* `active` possible values:
  * `true` (thread is still active)
  * `false` (thread no longer active)

### User > Customer
```json-doc
{
  "id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "type": "customer",
  "name": "John Smith",
  "email": "john@gmail.com",
  "present": true,
  "last_seen_event_id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "monitoring": {
    "current_visit": {
      "start": 1474659379,
      "pages": [
        {
          "start": 1474659379,
          "url": "https://www.livechatinc.com/"
          "title": "LiveChat - Homepage",
        },
        {
          "start": 1474659393,
          "url": "https://www.livechatinc.com/tour",
          "title": "LiveChat - Tour"
        }
      ],
    },
    "stats": {
      "visits": 16,
      "threads": 7,
      "page_views": 29,
      "last_visit": 1474636646      
    },
    "referrer": "http://www.google.com/",
    "ip": "194.181.146.130",
    "host": "87-99-47-205.internetia.net.pl",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36",
    "geolocation": {
      "country": "Poland",
      "country_code": "PL",
      "region": "Dolnoslaskie",
      "city": "Wroclaw",
      "timezone": "Europe/Warsaw"
    }
  },
  "properties": {
    "custom property name": "custom property value"
  },
  "banned": false
}
```

Optional properties:

* `name`
* `email`
* `last_seen_event_id`
* `monitoring`
* `properties`

### User > Agent
```json-doc
{
  "id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
  "type": "agent",
  "name": "Support Team",
  "email": "john@gmail.com",
  "present": true,
  "last_seen_event_id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "avatar": "cdn.livechatinc.com/avatars/1.png",
  "routing_status": "accepting_chats"
}
```
`routing_status` will be returned only if agent is currently logged in.

### User > Supervisor
```json-doc
{
  "id": "85f3bfc9-06c1-434e-958b-2a5239b07de8",
  "type": "supervisor",
  "name": "Peter Wilkinson",
  "email": "john@gmail.com",
  "present": true,
  "last_seen_event_id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "avatar": "cdn.livechatinc.com/avatars/1.png",
  "routing_status": "accepting_chats"
}
```

### User > My profile
```json-doc
{
  "id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
  "type": "agent"
  "name": "Support Team",
  "email": "john@gmail.com",
  "present": true,
  "last_seen_event_id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "avatar": "cdn.livechatinc.com/avatars/1.png",
  "routing_status": "accepting_chats"
}
```

### Event > Message
```json-doc
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12345-bhdsa",
  "order": 1,
  "type": "message",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "text": "hello there",
  "recipients": "all"
}
```

* `recipients` possible values: `all` (default), `agents`
* `custom_id` is optional


### Event > System message
```json-doc
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "order": 1,
  "type": "system_message",
  "timestamp": 1473433500,
  "text": "hello there",
  "recipients": "all"
}
```

* `recipients` possible values: `all` (default), `agents`

### Event > Form
```json-doc
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12345-bhdsa",
  "order": 4,
  "type": "form",
  "fields": [
  {
    "type": "text",
    "name": "name",
    "label": "Your name"
  },
  {
    "type": "email",
    "name": "email",
    "label": "Your email"
  },
  {
    "type": "radio",
    "name": "purpose",
    "label": "Chat purpose",
    "options": [{
      "label": "Support",
      "value": "support"
    },
    {
      "label": "Sale",
      "value": "sale"
    }],
  },
  {
    "type": "checkbox",
    "name": "industry",
    "label": "Company industry",
    "options": [{
      "label": "automotive",
      "value": "automotive"
    }, {
      "label": "IT",
      "value": "it"
    }],
  },
  {
    "type": "select",
    "name": "country",
    "label": "Country",
    "options": [{
      "label": "USA",
      "value": "usa"
    }, {
      "label": "Poland",
      "value": "pl"
    }, {
      "label": "Poland",
      "value": "pl"
    }]
  }]
}
```

* `custom_id` is optional

### Typing indicator
```json-doc
{
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "recipients": "all",
  "timestamp": 1473433500
}
```

### Sneak peek
```json-doc
{
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "recipients": "agents",
  "timestamp": 1473433500,
  "text": "hello there"
}
```

### Ban
```json-doc
{
  "days": 5
}
```

* `days` - number of days the ban will last

## Methods: Client => Server

### Authorization

>Example request payload

```json-doc
{
  "token": "Bearer wMN3gJw5RvOIuDlrMlg5Ig"
}
```

>Success response payload

```json-doc
{
  "success": true
}
```

Authorize connection.

| Action | Request object | Notes |
|--------|-----------------|-------|
| `authorization` | | |
| | `token`| SSO Token |


### Login
Returns current agent's initial state.

| Action | Response object | Notes |
|--------|-----------------|-------|
| `login` | | |
| | `license_id` | LiveChat account id |
| | `my_profile` | Current agent data |
| | `active_threads[]` | Array of active threads |

>Success response payload

```json-doc
{
  "license_id": "123",
  "my_profile": {
    // "User > My profile" object
  },
  "active_threads": [
    {
      "id": "OE070R0W0U",
      "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
      "users": [
        // array of "User" objects
      ],
      "last_event": {
        // "Event" object
      },
      "order": 12417249812721
    }
  ]
}
```

### Get archives

>Example request payload - searching chat archives

```json-doc
{
  "filters": {
    "query": "search keyword",
    "agents": ["p.bednarek@livechatinc.com"],
    "date_from": "2016-09-01",
    "date_to": "2016-10-01"
  },
  "pagination": {
    "page": 1
  }
}
```

>Success

```json-doc
{
  "threads": [
      // "Thread" object
  ],
  "pagination": {
      "page": 1,
      "total": 3
  }
}
```

Returns active threads that current agent has access to. If the agent is a supervisor in some threads, those threads will be returned as well.

| Action | Request object | Required | Type | Notes |
|--------|----------------|----------|------|-------|
| `get_archives` | | |
| | `filters.query` | No | `string` |
| | `filters.date_from` | No | `string` | `YYYY-MM-DD` format |
| | `filters.date_to` | No | `string` | `YYYY-MM-DD` format |
| | `filters.agent_ids` | No | `string[]` | Array of agent IDs |
| | `filters.team_ids` | No | `string[]` | Array of team IDs |
| | `pagination.page` | No | `integer` |


### Get chat threads
>Example request payload

```json-doc
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "thread_ids": ["a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5"]
}
```

>Example response payloads Success

```json-doc
{
  "chat": {
    "id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
    "threads": [ // optional
      // "Thread" object
    ],
    "threads_summary": [
      {
        "thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
        "order": 129846129847
      },
      {
        "thread_id": "b0c22fdd-fb71-40b5-bfc6-a8a0bc3117f6",
        "order": 129846129848
      }
    ]
  }
}
```

Returns threads that current agent has access to for given chat.

| Action | Request object | Required | Type | Notes |
|--------|----------------|----------|------|-------|
| `get_chat_threads` | | |
| | `chat_id` | Yes | `string` |
| | `thread_ids` | No | `string[]` |


### Supervise chat

>Example request payload

```json-doc
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "agent_ids": ["75a90b82-e6a4-4ded-b3eb-cb531741ee0d"]
}
```

>Example response payloads Success

```json-doc
{
	// No payload.
}
```

>Error

```json-doc
{
  "error": {
    "code": 123,
    "message": "You do not have permission to add a supervisor to this chat."
  }
}
```

Adds a supervisor to chat. The supervisor can only send messages to other agents. These messages are not visible to the customer.

| Action | Request object | Required | Notes |
| -------|----------------|----------|---|
| `supervise_chat` ||||
| | `chat_id` | Yes | |
| | `agent_ids` | No | If no agent is passed, current user will be used instead. |


### Start chat

>Example request payload

```json-doc
{
	// No payload.
}
```

>Success

```json-doc
{
  "thread": {
    "id": "OE070R0W0U",
    "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
    "users": [
      // array of "User" objects
    ],
    "events": [
      // array of "Event" objects
    ]
  }
}
```

>Error

```json-doc
{
  "error": {
    "code": 123,
    "message": "You do not have permission to perform this action."
  }
}
```

Starts a chat.

| Action | Request object | Required | Notes |
| -------|----------------|----------|---|
| `start_chat` ||||



### Join chat

>Example request payload

```json-doc
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "agent_ids": ["75a90b82-e6a4-4ded-b3eb-cb531741ee0d"]
}
```

>Example response payloads success

```json-doc
{
	// No payload.
}
```

>Error

```json-doc
{
  "error": {
    "code": 123,
    "message": "You do not have permission to perform this action."
  }
}
```

Adds an agent to chat. If the agent was already a supervisor in chat, he/she is changed to an agent.

| Action | Request object | Required | Notes |
| -------|----------------|----------|---|
| `join_chat` ||||
| | `chat_id` | Yes | |
| | `agent_ids` | No | If no agent is passed, current user will join the chat. |


### Remove from chat

Removes users from chat. If no user is specified, removes current user.

| Action | Request object | Required |
| -------|----------------|----------|
| `remove_from_chat` |||
| | `chat_id` | Yes |
| | `customer_ids` | No |
| | `agent_ids` | No |

##### Example request payload
```json-doc
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "customer_ids": ["b7eff798-f8df-4364-8059-649c35c9ed0c"],
  "agent_ids": ["75a90b82-e6a4-4ded-b3eb-cb531741ee0d"]
}
```

##### Example response payloads
###### Success
No payload.

###### Error
```json-doc
{
  "error": {
    "code": 123,
    "message": "You do not have permission to perform this action."
  }
}
```

### Send message

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `send_message` |||
| | `chat_id` | Yes | Id of the chat that we want to send the message to |
| | `message.text` | Yes | Message text |
| | `message.recipients` | No | `all` (default), `agents` |
| | `custom_id` | No | Event custom id |

##### Example request payload
```json-doc
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "custom_id": "12345-bhdsa",
  "message": {
    "id": "1",
    "text": "hello world",
    "recipients": "agents"
  }
}
```

##### Example response payloads
###### Success
```json-doc
{
  "message": {
    // "Event > Message" object
  }
}
```

###### Error
```json-doc
{
  "error": {
    "code": 123,
    "message": "You cannot send the message in this chat."
  }
}
```

### Mark event as seen

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `mark_event_as_seen` |||
| | `chat_id` | Yes | Id of the chat that the message belongs to |
| | `event_id` | Yes | Seen event id |

##### Example request payload
```json-doc
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "event_id": "0affb00a-82d6-4e07-ae61-56ba5c36f743"
}
```

##### Example response payloads
###### Success
No payload.

###### Error
```json-doc
{
  "error": {
    "code": 123,
    "message": "You cannot mark this message as seen."
  }
}
```

### Send typing indicator

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `send_typing_indicator` |||
| | `chat.id` | Yes | Id of the chat that we want to send the typing indicator to |

##### Example request payload
```json-doc
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5"
}
```

##### Example response payloads
###### Success
No payload.

###### Error
```json-doc
{
  "error": {
    "code": 123,
    "message": "You cannot send the typing indicator in this chat."
  }
}
```

### Ban customer
Bans the customer for a specific period. It immediately disconnects all customer active sessions and does not accept new ones during the ban lifespan.

| Action | Request object | Required |
| -------|----------------|----------|
| `ban_customer` |||
| | `customer_id` | Yes |
| | `ban.days` | Yes |

##### Example request payload
```json-doc
{
  "customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",

  "ban": {
    "days": 5
  }
}
```

##### Example response payloads
###### Success  
No payload.

###### Error
```json-doc
{
  "error": {
    "code": 123,
    "message": "You are not allowed to ban this customer."
  }
}
```

### Unban customer
Unbans the customer.

| Action | Request object | Required |
| -------|----------------|----------|
| `unban_customer` |||
| | `customer_id` | Yes |

##### Example request payload
```json-doc
{
  "customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c"
}
```

##### Example response payloads
###### Success  
No payload.

###### Error
```json-doc
{
  "error": {
    "code": 123,
    "message": "You are not allowed to unban this customer."
  }
}
```

### Close thread
Closes the thread. Nobody will be able to send any messages to this thread anymore.

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `close_thread` ||||
| | `chat_id` | Yes ||
| | `thread_id` | ? | TODO (v2) |

##### Example request payload
```json-doc
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5"
}
```

##### Example response payloads
###### Success  
No payload.

###### Error
```json-doc
{
  "error": {
    "code": 123,
    "message": "You are not allowed to close this chat."
  }
}
```

### Update agent
Updates agent properties.

| Action | Request object | Required | Notes |
| -------|----------------|----------|-------|
| `update_agent` |||
| | `agent_id` | No | Current agent is used by default |
| | `routing_status` | No | Possible values: `accepting_chats`, `not_accepting_chats` |

##### Example request payload
```json-doc
{
  "routing_status": "accepting_chats"
}
```

##### Example response payloads
###### Success  
No payload.

###### Error
```json-doc
{
  "error": {
    "code": 123,
    "message": "You are not allowed to change routing status for this agent."
  }
}
```

## Methods: Server => Client
Server => Client methods are used for keeping application state up-to-date. They are available only in `websocket` transport.

### Incoming thread

| Action | Payload |
|--------|------------------|
| `incoming_thread` |
|  | `thread` |

##### Example response payload
```json-doc
{
  "thread": {
    "id": "OE070R0W0U",
    "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
    "active": true,
    "users": [
      // array of "User" objects
    ],
    "events": [
      // array of "Event" objects
    ]
  }
}
```

### Chat users updated

| Action | Payload |
|--------|------------------|
| `chat_users_updated` |
|  | `updated_users` |

##### Example response payload
```json-doc
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "updated_users": {
    "customers": {
      "added": [
        // array of "User > Customer" objects
      ],
      "removed_ids": []
    },
    "agents": {
      "added": [
        // array of "User > Agent" objects
      ],
      "removed_ids": ["75a90b82-e6a4-4ded-b3eb-cb531741ee0d"]
    },
    "supervisors": {
      "added": [
        // array of "User > Supervisor" objects
      ],
      "removed_ids": ["85f3bfc9-06c1-434e-958b-2a5239b07de8"]
    }
  }
}
```

### Incoming event

| Action | Payload |
|--------|------------------|
| `incoming_event` |
|  | `chat_id` |
|  | `event` |

##### Example response payload
```json-doc
{
  "chat_id": "85f3bfc9-06c1-434e-958b-2a5239b07de8",
  "event": {
    // "Event" object
  }
}
```

### Event marked as seen

| Action | Payload |
|--------|------------------|
| `event_marked_as_seen` |
|  | `chat_id` |
|  | `event_id` |
|  | `user_id` |

##### Example response payload
```json-doc
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "event_id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d"
}
```

### Incoming typing indicator

| Action | Payload |
|--------|------------------|
| `incoming_typing_indicator` |
|  | `chat_id` |
|  | `typing_indicator` |

##### Example response payload
```json-doc
{
  "chat_id": "85f3bfc9-06c1-434e-958b-2a5239b07de8",
  "typing_indicator": {
    // "Typing indicator" object
  }
}
```

### Incoming sneak peek

| Action | Payload |
|--------|------------------|
| `incoming_sneak_peek` |
|  | `chat_id` |
|  | `sneak_peek` |

##### Example response payload
```json-doc
{
  "chat_id": "85f3bfc9-06c1-434e-958b-2a5239b07de8",
  "sneak_peek": {
    // "Sneak peek" object
  }
}
```

### Customer banned

| Action | Payload |
|--------|------------------|
| `customer_banned` |
|  | `customer_id` |
|  | `ban.days` |

##### Example response payload
```json-doc
{
 "customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
 "ban": {
  "days": 5
 }
}
```

### Customer unbanned

| Action | Payload |
|--------|------------------|
| `customer_unbanned` |
|  | `customer_id` |

##### Example response payload
```json-doc
{
 "customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c"
}
```

### Thread closed

| Action | Payload |
|--------|------------------|
| `thread_closed` |
|  | `chat_id` |
|  | `thread_id` |
|  | `user_id` (optional) |

##### Example response payload
```json-doc
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "thread_id": "b0c22fdd-fb71-40b5-bfc6-a8a0bc3117f6",
  "user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d" // optional
}
```

### Customer updated

| Action | Payload |
|--------|------------------|
| `customer_updated` |
|  | `chat_id` |
|  | `customer` |

##### Example response payload
```json-doc
{
  "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
  "customer": {
    // "User > Customer" object
  }
}
```

### Agent updated

| Action | Payload |
|--------|------------------|
| `agent_updated` |
|  | `agent_id` |
|  | `routing_status` |

##### Example response payload
```json-doc
{
  "agent_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
  "routing_status": "accepting_chats"
}
```