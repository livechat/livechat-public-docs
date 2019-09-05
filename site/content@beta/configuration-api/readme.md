---
title: "Configuration API Guide"
weight: 10
---

# Introduction

Configuration API is a service for storing configuration of license. You can set
up here different types of features such as properties or webhooks.

## URL

Configuration API is available under URL
`api.livechatinc.com/<version>/configuration/{endpoint}`.

## Versioning

There are several API versions available, for example: `v0.3` or `v0.4`. If you want to use the latest version,
you should use `api.livechatinc.com/configuration/{endpoint}` URL, but it is not
recommended.

## Authentication

Authentication is done via `Authorization` header. In each request you should
add `Authorization` header with Bearer token.

```
curl -v api.livechatinc.com/v3.0/configuration/agents/get_bot_agent_details -H "Authorization: Bearer fra-7XNqYbjTS4ux1uSdp1ig8w" -X POST -d '{"bot_agent_id":"9a1829e224aea210da3a3f46a7074e28"}'
```

## Propagation delay

All configurations set by this API will have action in system after max 2
minutes. This delay will be removed in future.

# Bot Agent

- Bot Agent enables writing integrations using agent-api to communicate in chats
  as a regular Agent.

- Logged in Bot Agent is connected to agent SSO access token that
  creates/updates the Bot and is being logged out when the access token is
  revoked.

- Each Bot Agent is a resource owned by an application in developers platform
  identified by `client_id`. By "My Bot Agents" the Bots owned by application
  with given `client_id` is meant.

## Differences from regular Agent

- you can not log in using Bot Agent account
- you can not set password for Bot Agent account
- Bot Agent does not have an email - agent_id is a random hash

## Test property namespace

For each license there are added some test properties.

| Namespace | Property                    | Type               | Access                     |
| --------- | --------------------------- | ------------------ | -------------------------- |
| `test`    | `bool_property`             | `bool`             | rw for everyone everywhere |
| `test`    | `int_property`              | `int`              | rw for everyone everywhere |
| `test`    | `string_property`           | `string`           | rw for everyone everywhere |
| `test`    | `tokenized_string_property` | `tokenized_string` | rw for everyone everywhere |

Note: `tokenized_string` is similar to `string` type, except values of it are splitted into tokens to enable search of each word.

## Methods

#### Create Bot Agent

**Endpoint**: `/agents/create_bot_agent`

**Permissions**:

- `agents-bot--my:rw` - to create my bot agents

| Request object                       | Type       | Required | Notes                                                                |
| ------------------------------------ | ---------- | -------- | -------------------------------------------------------------------- |
| `name`                               | `string`   | Yes      | display name                                                         |
| `avatar`                             | `string`   | No       | avatar URL                                                           |
| `status`                             | `string`   | Yes      | agent status                                                         |
| `max_chats_count`                    | `int`      | No       | maximum incoming chats that can be routed to the agent, by default 6 |
| `groups`                             | `object[]` | No       | groups the agent belongs to                                          |
| `groups[].id`                        | `uint`     | Yes      | group ID                                                             |
| `groups[].priority`                  | `string`   | Yes      | agent priority in group                                              |
| `webhooks`                           | `object`   | No       | webhooks sent to the agent                                           |
| `webhooks.url`                       | `string`   | Yes      | destination URL for webhooks                                         |
| `webhooks.secret_key`                | `string`   | Yes      | secret sent in webhooks to verify webhook source                     |
| `webhooks.actions`                   | `object[]` | Yes      | triggering actions                                                   |
| `webhooks.actions[].name`            | `string`   | Yes      | triggering action name                                               |
| `webhooks.actions[].filters`         | `object`   | No       | filters to check if webhook should be triggered                      |
| `webhooks.actions[].additional_data` | `string[]` | No       | Additional data that will arrive with webhook                        |

#### Example request payload

```js
{
    "name": "John Doe",
    "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
    "status": "accepting chats",
    "max_chats_count": 6,
    "groups": [{
        "id": 0,
        "priority": "normal"
    }, {
        "id": 1,
        "priority": "normal"
    }, {
        "id": 2,
        "priority": "first"
    }],
    "webhooks": {
      "url": "http://myservice.com/webhooks",
      "secret_key": "JSauw0Aks8l-asAa",
      "actions": [{
        "name": "incoming_chat_thread"
      },{
        "name": "incoming_event",
        "additional_data": ["chat_properties"]
      }]
    }
}
```

- `status` possible values:
  - `accepting chats` - agent is logged in and chat router routes incoming chats
    to them
  - `not accepting chats` - agent is logged in but chat router does not route
    incoming chats to them
  - `offline` - agent is not logged in
- `groups[].priority` possible values:
  - `first` - the highest chat routing priority - agents with `first` priority
    get chats before the others from that group, eg Bots can get chats before
    normal agents.
  - `normal` - the middle chat routing priority - agents with `normal` priority
    get chats before the others with `last` priority when there are no agents
    with `first` priority available with free slots in that group
  - `last` - the lowest chat routing priority - agents with `last` priority get
    chats when there are no agents with `first` or `normal` priority available
    with free slots in that group
- `webhooks` - go [here](#webhooks) for possible actions values and payloads.

#### Example response payloads

##### Success

```js
{
    "bot_agent_id": "5c9871d5372c824cbf22d860a707a578"
}
```

#### Remove Bot Agent

**Endpoint**: `agents/remove_bot_agent`

**Permissions**:

- `agents-bot--my:rw` - to remove my bot agent
- `agents-bot--all:rw` - to remove any bot agent

| Request object | Type     | Required | Notes        |
| -------------- | -------- | -------- | ------------ |
| `bot_agent_id` | `string` | Yes      | Bot agent ID |

#### Example request payload

```js
{
    "bot_agent_id": "5c9871d5372c824cbf22d860a707a578"
}
```

#### Example response payloads

##### Success

```js
{
}
```

### Update Bot Agent

**Endpoint**: `agents/update_bot_agent`

**Permissions**:

- `agents-bot--my:rw` - to update my bot agent

| Request object                       | Type       | Required | Notes                                                  |
| ------------------------------------ | ---------- | -------- | ------------------------------------------------------ |
| `id`                                 | `string`   | Yes      | bot agent ID                                           |
| `name`                               | `string`   | No       | display name                                           |
| `avatar`                             | `string`   | No       | avatar URL                                             |
| `status`                             | `string`   | No       | agent status                                           |
| `max_chats_count`                    | `int`      | No       | maximum incoming chats that can be routed to the agent |
| `default_group_priority`             | `string`   | No       | Default routing priority for group without defined one |
| `groups`                             | `object[]` | No       | groups the agent belongs to                            |
| `groups[].id`                        | `uint`     | Yes      | group ID                                               |
| `groups[].priority`                  | `string`   | Yes      | agent priority in group                                |
| `webhooks`                           | `object`   | No       | webhooks sent to the agent                             |
| `webhooks.url`                       | `string`   | Yes      | destination URL for webhooks                           |
| `webhooks.secret_key`                | `string`   | Yes      | secret sent in webhooks to verify webhook source       |
| `webhooks.actions`                   | `object[]` | Yes      | triggering actions                                     |
| `webhooks.actions[].name`            | `string`   | Yes      | triggering action name                                 |
| `webhooks.actions[].filters`         | `object`   | No       | filters to check if webhook should be triggered        |
| `webhooks.actions[].additional_data` | `string[]` | No       | Additional data that will arrive with webhook          |

#### Example request payload

```js
{
    "id": "5c9871d5372c824cbf22d860a707a578",
    "status": "accepting chats",
    "max_chats_count": 6,
    "webhooks": {
      "url": "http://myservice.com/webhooks",
      "secret_key": "JSauw0Aks8l-asAa",
      "actions": [{
        "name": "incoming_chat_thread",
        "filters": {
            "chat_properties": {
                "source": {
                    "type": {
                         "values": ["facebook", "twitter"]
                     }
                }
            }
        }
      },{
        "name": "incoming_event"
      }]
    }
}
```

- `status` possible values:
  - `accepting chats` - agent is logged in and chat router routes incoming chats
    to them
  - `not accepting chats` - agent is logged in but chat router does not route
    incoming chats to them
  - `offline` - agent is not logged in
- `groups[].priority` possible values:
  - `first` - the highest chat routing priority - agents with `first` priority
    get chats before the others from that group, eg Bots can get chats before
    normal agents.
  - `normal` - the middle chat routing priority - agents with `normal` priority
    get chats before the others with `last` priority when there are no agents
    with `first` priority available with free slots in that group
  - `last` - the lowest chat routing priority - agents with `last` priority get
    chats when there are no agents with `first` or `normal` priority available
    with free slots in that group
- `default_group_priority` possible values:
  - `first` - Chats are assigned to bot before normal agents
  - `normal` - Chats are assigned with the same priority as it would for normal agents
  - `last` - If there is no agent available then, chat will be assigned to bot
  - `supervisor` - Bot works as `supervisor` so he/she will not be assigned to any chats
- `webhooks` - go [here](#webhooks) for possible actions values and payloads.

#### Example response payloads

##### Success

```js
{
}
```

### Get Bot Agents

**Endpoint**: `agents/get_bot_agents`

**Permissions**:

- `agents-bot--my:ro` - to get my bot agent
- `agents-bot--all:ro` - to get all bot agents

| Request object | Type   | Required | Notes                                                                                     |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------- |
| `all`          | `bool` | No       | Get all Bot Agents, if `false` returns only caller's Bot Agents, default value is `false` |

#### Example request payload

```js
{
    "all": false
}
```

#### Example response payloads

##### Success

```js
{
    "bot_agents": [{
        "id": "5c9871d5372c824cbf22d860a707a578",
        "name": "John Doe",
        "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
        "status": "accepting chats"
    }]
}
```

### Get Bot Agent details

**Endpoint**: `agents/get_bot_agent_details`

**Permissions**:

- `agents-bot--my:ro` - to get my bot agent details
- `agents-bot--all:ro` - to get any bot agent details

| Request object | Type     | Required | Notes        |
| -------------- | -------- | -------- | ------------ |
| `bot_agent_id` | `string` | Yes      | Bot Agent ID |

#### Example request payload

```js
{
    "bot_agent_id": "5c9871d5372c824cbf22d860a707a578"
}
```

#### Example response payloads

##### Success

```js
{
    "bot_agent": {
        "id": "5c9871d5372c824cbf22d860a707a578",
        "name": "John Doe",
        "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
        "status": "accepting chats",
        "application": {
            "client_id": "asXdesldiAJSq9padj"
        },
        "max_chats_count": 6,
        "groups": [{
            "id": 0,
            "priority": "normal"
        }, {
            "id": 1,
            "priority": "normal"
        }, {
            "id": 2,
            "priority": "first"
        }],
        "webhooks": {
            "url": "http://myservice.com/webhooks",
            "secret_key": "JSauw0Aks8l-asAa",
            "actions": [{
                "name": "incoming_chat_thread",
                "filters": {
                  "chat_properties": {
                     "source": {
                        "type": {
                           "values": ["facebook", "twitter"]
                        }
                      }
                  }
                }
            },{
                "name": "incoming_event",
                "additional_data": ["chat_properties"]
            }]
        }
    }
}
```

# Webhook data structure

## Webhook format

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<sekret_key>",
  "action": "<action>",
  "data": {
    // payload from push action
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

## Payload for actions derived from agent-api pushes:

- [`incoming_chat_thread`](https://developers.livechatinc.com/beta-docs/agent-chat-api/#incoming-chat-thread)
- [`incoming_event`](https://developers.livechatinc.com/beta-docs/agent-chat-api/#incoming-event)
- [`last_seen_timestamp_updated`](https://developers.livechatinc.com/beta-docs/agent-chat-api/#last-seen-timestamp-updated)
- [`thread_closed`](https://developers.livechatinc.com/beta-docs/agent-chat-api/#thread-closed)
- [`chat_properties_updated`](https://developers.livechatinc.com/beta-docs/agent-chat-api/#chat-properties-updated)
- [`chat_thread_properties_updated`](https://developers.livechatinc.com/beta-docs/agent-chat-api/#chat-thread-properties-updated)
- [`chat_user_added`](https://developers.livechatinc.com/beta-docs/agent-chat-api/#chat-user-added)
- [`chat_user_removed`](https://developers.livechatinc.com/beta-docs/agent-chat-api/#chat-chat-user-removed)

## Payload for another actions:

### `agent_status_changed`

```js
{
    "agent_id":"5c9871d5372c824cbf22d860a707a578",
    "status": "accepting chats"
}
```

possible status values:

- `accepting chats`
- `not accepting chats`
- `offline`

### `agent_deleted`

```js
{
    "agent_id": "5c9871d5372c824cbf22d860a707a578"
}
```


# Webhooks

### Register webhook

**Endpoint**: `webhooks/register_webhook`

**Permissions**:

- `webhooks--my:rw` - to register my webhook

| Request object                           | Type       | Required | Notes                                                                                    |
| ---------------------------------------- | ---------- | -------- | ---------------------------------------------------------------------------------------- |
| `url`                                    | `string`   | Yes      | Destination URL for webhook                                                              |
| `description`                            | `string`   | No       | Webhook description                                                                      |
| `action`                                 | `string`   | Yes      | Triggerring action                                                                       |
| `secret_key`                             | `string`   | Yes      | Secret sent in webhooks to verify webhook source                                         |
| `filters`                                | `object`   | No       | Filters to check if webhook should be triggered                                          |
| `filters.author_type`                    | `string`   | No       | Possible values: `customer`, `agent`                                                     |
| `filters.only_my_chats`                  | `bool`     | No       | Trigger webhooks only for chats with property `source.client_id` equal to my `client_id` |
| `filters.chat_member_ids`                | `object`   | No       | Only one filter (`agents_any` or `agents_exclude`) is allowed                            |
| `filters.chat_member_ids.agents_any`     | `[]string` | No       | If any specified agent is in chat, webhook will be triggered                             |
| `filters.chat_member_ids.agents_exclude` | `[]string` | No       | If any specified agent is in chat, webhook will not be triggered                         |
| `additional_data`                        | `[]string` | No       | Additional data that will arrive with webhook                                            |

- `action` possible values:
  - `incoming_chat_thread` - triggers on action
    [agent-api push](https://developers.livechatinc.com/beta-docs/agent-chat-api/#incoming-chat-thread),
    available filters for the action: `chat_member_ids`, `only_my_chats`
  - `incoming_event` - triggers on action
    [agent-api push](https://developers.livechatinc.com/beta-docs/agent-chat-api/#incoming-event),
    available filters for the action: `chat_member_ids` and `author_type`, `only_my_chats`
  - `incoming_rich_message_postback` - triggers on action
    [link to change](https://developers.livechatinc.com/beta-docs/agent-chat-api/#incoming-rich-message-postback),
    available filters for the action: `chat_member_ids`, `only_my_chats`
  - `last_seen_timestamp_updated` - triggers on action
    [agent-api push](https://developers.livechatinc.com/beta-docs/agent-chat-api/#last-seen-timestamp-updated),
    available filters for the action: `chat_member_ids`, `only_my_chats`
  - `thread_closed` - triggers on action
    [agent-api push](https://developers.livechatinc.com/beta-docs/agent-chat-api/#thread-closed),
    available filters for the action: `chat_member_ids`, `only_my_chats`
  - `chat_properties_updated` - triggers on action
    [agent-api push](https://developers.livechatinc.com/beta-docs/agent-chat-api/#chat-properties-updated),
    available filters for the action: `chat_member_ids`, `only_my_chats`
  - `chat_thread_properties_updated` - triggers on action
    [agent-api push](https://developers.livechatinc.com/beta-docs/agent-chat-api/#chat-thread-properties-updated),
    available filters for the action: `chat_member_ids`, `only_my_chats`
  - `chat_properties_deleted` - triggers on action
    [agent-api push](https://developers.livechatinc.com/beta-docs/agent-chat-api/#chat-properties-deleted),
    available filters for the action: `chat_member_ids`, `only_my_chats`
  - `chat_thread_properties_deleted` - triggers on action
    [agent-api push](https://developers.livechatinc.com/beta-docs/agent-chat-api/#chat-thread-properties-deleted),
    available filters for the action: `chat_member_ids`, `only_my_chats`
  - `chat_user_added` - triggers on action
    [agent-api push](https://developers.livechatinc.com/beta-docs/agent-chat-api/#chat-user-added),
    available filters for the action: `chat_member_ids`, `only_my_chats`
  - `chat_user_removed` - triggers on action
    [agent-api push](https://developers.livechatinc.com/beta-docs/agent-chat-api/#chat-user-removed),
    available filters for the action: `chat_member_ids`, `only_my_chats`
  - `chat_thread_tagged` - triggers on action
    [agent-api push](https://developers.livechatinc.com/beta-docs/agent-chat-api/#chat_thread_tagged),
    available filters for the action: `chat_member_ids`, `only_my_chats`
  - `chat_thread_untagged` - triggers on action
    [agent-api push](https://developers.livechatinc.com/beta-docs/agent-chat-api/#chat_thread_tagged),
    available filters for the action: `chat_member_ids`, `only_my_chats`
  - `agent_status_changed` - triggers when status of some agent is changed,
    available filters for the action: `chat_member_ids`
  - `agent_deleted` - triggers when some agent is deleted,
    available filters for the action: `chat_member_ids`
- `filters` possible filters:
  - `chat_member_ids` (only one of above is allowed)
    - `agents_any` (`string[]`) - array of agent ids. If any agent from this array is in chat, then webhook will be triggered.
    - `agents_exclude` (`string[]`) - array of agent ids. If any agent from this array is in chat, then webhook will not be triggered.
  - `author_type` - `customer` or `agent`, allowed only for `incoming_event` action
  - `only_my_chats` - `true` or `false`
- `additional_data` possible values in array:
  - `chat_properties` (available for every action except `agent_status_changed` and `agent_deleted`)
  - `access` (available only for actions: `incoming_event` and `chat_user_added`)
  - `thread_id` (available only for action `chat_user_added`)

#### Example request payload

```js
{
  "url": "http://myservice.com/webhooks",
  "description": "Test webhook",
  "action": "thread_closed",
  "secret_key": "laudla991lamda0pnoaa0",
  "filters": {
    "chat_member_ids": {
      "agents_any": ["johndoe@mail.com"]
    }
  },
  "additional_data": ["chat_properties"]
}
```

#### Example response payloads

##### Success

```js
{
  "webhook_id": "pqi8oasdjahuakndw9nsad9na"
}
```

### Get webhooks config

**Endpoint**: `webhooks/get_webhooks_config`

**Permissions**:

- `webhooks--my:ro` - to get my webhooks config
- `webhooks--all:ro` - to get all webhooks config

#### Example request payload

```js
{
}
```

#### Example response payloads

##### Success

```js
{
  "webhooks_config":[
    {
      "webhook_id": "pqi8oasdjahuakndw9nsad9na",
      "url": "http://myservice.com/webhooks",
      "description": "Test webhook",
      "action": "thread_closed",
      "secret_key": "laudla991lamda0pnoaa0",
      "filters": {
        "chat_member_ids": {
          "agents_any": ["johndoe@mail.com"]
        }
      },
      "owner_client_id": "asXdesldiAJSq9padj"
    }
  ]
}
```

### Unregister webhook

**Endpoint**: `webhooks/unregister_webhook`

**Permissions**:

- `webhooks--my:rw` - to unregister my webhook
- `webhooks--all:rw` - to unregister any webhook

| Request object | Type     | Required | Notes      |
| -------------- | -------- | -------- | ---------- |
| `webhook_id`   | `string` | Yes      | Webhook ID |

#### Example request payload

```js
{
  "webhook_id": "pqi8oasdjahuakndw9nsad9na"
}
```

#### Example response payloads

##### Success

```js
{
}
```


# Property data structure

## Property format

> Sample **properties**: 

```js
{
    "properties": {
        "routing": {
            "pinned": true,
            "count": 3
        }
    }
}
```

Properties are key-value storages. They can be set within a chat, a thread, or an event. 

In our example, `routing` is the namespace, while `pinned` and `count` are properties names.


## Configuration

You can create properties within a license and configure them using the Configuration API. Properties are grouped in namespaces, which helps distinguishing which property belongs to a given integration. Your namespace is always named after your `application id`.

You can configure the property [type](#property-types), [location](#property-locations), and [domain](#property-domain).

### Property types

There are four property types:

- `int` (int32)
- `bool`
- `string`
- `tokenized_string`

The `tokenized_string` type is a string split to tokens before indexing in our search engine. It can be useful for longer strings, such as messages. It should not be used for keywords.

### Property locations

Properties can be set for the following locations:

- chat
- thread
- event

You can configure access to properties within those locations. For example, you could create a property visible only to agents in a chat and thread, but not in an event. For more details, see [Properties](#properties).

### Property domain

The **property domain** is a set of values that a property can be assigned to.

Property domain can be configured in two ways:

- by defining a set of values explicitly allowed in this property (for example `[1, 2, 3]`).
- by defining a range. All values within the range are allowed in this property. It works only for numeric types (for example a range from `1` to `3`).

# Properties

### Create properties

**Endpoint**: `properties/create_properties`

**Permissions**:

- `properties--my:rw` - to create my properties (in my namespace)

| Request object                                             | Type       | Required              | Notes                                                                        |
| ---------------------------------------------------------- | ---------- | --------------------- | ---------------------------------------------------------------------------- |
| `<property_name>.type`                                     | `string`   | Yes                   | values allowed: `int`, `string`, `bool` and `tokenized_string`               |
| `<property_name>.description`                              | `string`   | No                    | property description                                                         |
| `<property_name>.locations`                                | `object`   | Yes                   |                                                                              |
| `<property_name>.locations.<location>`                     | `object`   | at least one location | `<location>` is one of these values: `chat`, `thread`, `event`               |
| `<property_name>.locations.<location>.access.<user>`       | `object`   | at least one user     | `<user>` is one of these values: `agent`, `customer`                         |
| `<property_name>.locations.<location>.access.<user>.read`  | `bool`     | Yes                   | if true, then `<user>` can read this property                                |
| `<property_name>.locations.<location>.access.<user>.write` | `bool`     | Yes                   | if true, then `<user>` can write to this property                            |
| `<property_name>.domain`                                   | `[<type>]` | No                    | this is array of values that properties can be set to                        |
| `<property_name>.range`                                    | `object`   | No                    | this is range of values that properties can be set to                        |
| `<property_name>.range.from`                               | `int`      | No                    | only values equal or greater than this parameter can be set to this property |
| `<property_name>.range.to`                                 | `int`      | No                    | only values equal or lower than this parameter can be set to this property   |

Note: only one of `domain` and `range` can be set in single property
Note: for more information about properties see [Properties Guide](https://developers.livechatinc.com/beta-docs/platform-overview/#properties)

#### Example request payload

```js
{
  "greeting":{
    "type":"string",
    "locations":{
      "chat":{
        "access":{
          "agent":{
            "read":true,
            "write":false
          },
          "customer":{
            "read":true,
            "write":true
          }
        }
      }
    }
    "domain": ["hello", "hi"]
  },
  "scoring":{
    "type":"int",
    "locations":{
      "event":{
        "access":{
          "agent":{
            "read":true,
            "write":true
          }
        }
      }
    },
    "range": {
      "from": 0,
      "to": 10
    }
  }
}
```

#### Example response payloads

##### Success

```js
{
}
```

### Get property configs

**Endpoint**: `properties/get_property_configs`

**Permissions**:

- `properties--my:ro` - to get my properties configs (my namespace)
- `properties--all:ro` - to get all properties configs (all namespaces)

| Request object | Type   | Required | Notes                                                     |
| -------------- | ------ | -------- | --------------------------------------------------------- |
| `all`          | `bool` | No       | if true returns all properties on license (default false) |

Note: for more information about properties see [Properties Guide](https://developers.livechatinc.com/beta-docs/platform-overview/#properties)

#### Example request payload

```js
{
  "all": true
}
```

#### Example response

##### Success

```js
{
  "58737b5829e65621a45d598aa6f2ed8e":{
    "greeting":{
    "type":"string",
    "locations":{
      "chat":{
        "access":{
          "agent":{
            "read":true,
            "write":false
          },
          "customer":{
            "read":true,
            "write":true
          }
        }
      }
    }
    "domain": ["hello", "hi"]
  },
  "scoring":{
    "type":"int",
    "locations":{
      "event":{
        "access":{
          "agent":{
            "read":true,
            "write":true
          }
        }
      }
    },
    "range": {
      "from": 0,
      "to": 10
    }
    //...
  },
  "other_namespace": {
    //
  }
  ...
}
```

