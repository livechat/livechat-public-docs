---
weight: 20
---

# Agents

Use this API method to **manage** your [Agents](https://www.livechatinc.com/kb/livechat-roles-owner-administrators-and-agents/) and to **get information** about their activities.

## Available paths {#agents-available-paths}

| Methods       | Path      |
|--------------|-----------|
| `GET`, `POST` | `/agents` |
| `GET`, `PUT`, `DELETE` |   `/agents/<LOGIN>` | 
| `POST` |   `/agents/<LOGIN>/reset_api_key` | 

## List all agents

>Path

```
GET https://api.livechatinc.com/agents
```

>Sample request

```shell
curl "https://api.livechatinc.com/agents" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

>Sample response

```json
[
  {
    "name": "John Doe",
    "permission": "owner",
    "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
    "login": "john.doe@mycompany.com",
    "status": "accepting chats"
  },
  ...
]
```

Returns all LiveChat agents list. Optional parameters:

*   `status` - returns the agents with one of the following statuses: `accepting chats`, `not accepting chats` or `offline`.

Additional info:

`status` can be: `accepting chats`, `not accepting chats` or `offline`.  
`permission` can take the following values: `owner`, `administrator`, `normal`.


## Get a single agent details

Returns complete details of the agent for the given `LOGIN`.

>Path

```shell
GET https://api.livechatinc.com/agents/<LOGIN>
```

>Sample request

```shell
curl "https://api.livechatinc.com/agents/john.doe@mycompany.com" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

>Sample response

```json
{
  "login": "john.doe@mycompany.com",
  "name": "John Doe",
  "login_status": "accepting chats",
  "permission": "owner",
  "daily_summary": 1,
  "job_title": "Support Agent",
  "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
  "notifications": {
    "new_visitor": 1,
    "returning_visitor": 1,
    "queued_visitor": 1,
    "visitor_is_typing": 0,
    "new_goal": 1
  },
  "max_chats_count": 6,
  "groups": [
    {
      "id": 1,
      "name": "Sales"
    },
    {
      "id": 2,
      "name": "Technical Support"
    }
  ],
  "status": "accepting chats",
  "last_logout": 1358427204,
  "api_key": "6ed8580f2cc160ce98d16389a0ede2c0"
}
```

#### Properties

| Property | Description |
|---------|----------------------------|
| `login` | the agent's e-mail address |
| `name` | the agent's name |
| `login_status` | possible values: `accepting chats`, `not accepting chats`; defines the default status for an agent right after the login |
| `permission` | possible values: `owner`, `administrator`, `normal` |
| `daily_summary` | whether or not the agent receives a daily summary |
| `job_title` | defaults to: `Support Agent` |
| `avatar` | path to the image on Amazon s3 |
| `notifications` | whether or not the specific notification is enabled |
| `max_chats_count` | limit of the concurrent chats |
| `groups[]` | list of groups the agent is a member of |
| `status` | possible values: `accepting chats`, `not accepting chats`, `offline`; current status of an agent |
| `last_logout` | timestamp of the agent's last logout |
| `api_key` | the agent's API key (note: agents can access their own API keys only) |



## Create a new agent

>Path

```
POST https://api.livechatinc.com/agents
```

>Sample request

```shell
curl "https://api.livechatinc.com/agents" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -d "login=jenny.doe@mycompany.com&\
name=Jenny+Doe&\
permission=administrator&\
groups[]=1&\
groups[]=2&\"
```

>Sample JSON request

```shell
curl "https://api.livechatinc.com/agents" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -d '{
        "login":"jenny.doe@mycompany.com",
        "name":"Jenny Doe",
        "permission":"administrator",
        "groups":[1,2]
     }'
```

>Sample response

```json
{
  "login": "jenny.doe@mycompany.com",
  "name": "Jenny Doe",
  "login_status": "accepting chats",
  "permission": "administrator",
  "daily_summary": 1,
  "job_title": "Support Agent",
  "avatar": "livechat.s3.amazonaws.com/default/avatars/45bcb5f592dbf5aac8f88dcfd6bc937c.png",
  "notifications": {
    "new_visitor": 1,
    "returning_visitor": 1,
    "queued_visitor": 1,
    "visitor_is_typing": 0,
    "new_goal": 1
  },
  "max_chats_count": 6,
  "groups": [
    {
      "id": 1,
      "name": "Sales"
    },
    {
      "id": 2,
      "name": "Technical Support"
    }
  ],
  "status": "offline",
  "last_logout": 0,
  "api_key": "441e519f755db8a51a4e232a31fe6249"
}
```

Creates a new agent in your license.

#### Required properties

| Property | Description |
|----------|----------------------------|
| `login` | must be a correct e-mail address |
| `name` | string |


#### Optional properties

| Property | Description |
|----------|----------------------------|
| `job_title` | defaults to: `Support Agent` |
| `login_status` | possible values: `accepting chats`, `not accepting chats`; defines the default status for an agent right after the login |
| `password` | the minimum length is 5 (if not provided, an email with the activation link will be sent) |
| `permission` | `administrator`, `normal` (default) |
| `groups[]` | list of group IDs |
| `notifications` | object (required keys: `new_visitor`, `incoming_chat`, `returning_visitor`, `queued_visitor`, `visitor_is_typing`, `new_goal`, accepted values: `0` or `1`) |
| `daily_summary` | `0` or `1` (default) |
| `max_chats_count` | defaults to `6` |


## Update an agent

> Path

```
PUT https://api.livechatinc.com/agents/<LOGIN>
```

>Sample request

```shell
curl "https://api.livechatinc.com/agents/jenny.doe@mycompany.com" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X PUT \
  -d "status=not+accepting+chats&\
max_chats_count=2"
```

>Sample JSON request

```shell
curl "https://api.livechatinc.com/agents/jenny.doe@mycompany.com" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -H Content-type:application/json \
  -X PUT \
  -d '{
        "status":"not accepting chats",
        "max_chats_count":2
     }'
```

>Sample response

```json
{
  "login": "jenny.doe@mycompany.com",
  "name": "Jenny Doe",
  "login_status": "not accepting chats",
  "permission": "administrator",
  "daily_summary": 1,
  "job_title": "Support Agent",
  "avatar": "livechat.s3.amazonaws.com/default/avatars/45bcb5f592dbf5aac8f88dcfd6bc937c.png",
  "notifications": {
    "new_visitor": 1,
    "returning_visitor": 1,
    "queued_visitor": 1,
    "visitor_is_typing": 0,
    "new_goal": 1
  },
  "max_chats_count": 2,
  "work_scheduler":{
    "sunday":{
      "enabled":0,
      "start":"11:00",
      "end":"17:00"
    },
    "monday":{
      "enabled":1,
      "start":"09:00",
      "end":"17:00"
    },
    ...
    "saturday":{
      "enabled":0,
      "start":"09:00",
      "end":"17:00"
    }
  },
  "groups": [
    {
      "id": 1,
      "name": "Sales"
    },
    {
      "id": 2,
      "name": "Technical Support"
    }
  ],
  "status": "not accepting chats",
  "last_logout": 0,
  "api_key": "441e519f755db8a51a4e232a31fe6249",
}
```

Updates the specified agent by setting the values of the parameters passed. Any parameters not provided will be left unchanged.

#### Optional properties

| Property | Description |
|----------|----------------------------|
| `job_title` | |
| `name` | | 
| `login_status` | possible values: `accepting chats`, `not accepting chats`; defines the default status for agent right after login |
| `password` | the password you want to change | This can be either your own password or the password of another agent | It has to be at least 5 characters long |
| `current_password` | when changing the password for yourself or for another agent, you need to provide your current password |
| `permission` | `administrator`, `normal` (default) |
| `status` | `accepting chats`, `not accepting chats`, `offline` | - change agent's status or log agent out | Ignored when previous agent's status is `offline` |
| `groups[]` | list of group IDs |
| `notifications` | object (allowed keys: `new_visitor`, `returning_visitor`, `queued_visitor`, `visitor_is_typing`, allowed values: `0` or `1`) |
| `daily_summary` | `0` or `1` |
| `max_chats_count` | |
| `work_scheduler` | available only for enterprise plan | Object with allowed keys: days of the week, e |g | `monday` | For each day of the week the valid keys are `start`, `end` or `enabled` | It is possible to pass all work scheduler keys at once | `start` and `end` should be passed in the 24h-hour clock format | `enable` accepted values are `1` or `0`|

The properties which an agent can edit in their own profile, without being an administrator:

*   `password`
*   `name`
*   `job_title`
*   `daily_summary`
*   `notifications`
*   `login_status`
*   `status`


## Reset an API key

Resets the API key for an agent with a given `LOGIN`.

> Path

```
POST https://api.livechatinc.com/agents/<LOGIN>/reset_api_key
```

> Sample request

```shell
curl "https://api.livechatinc.com/agents/jenny.doe@mycompany.com/reset_api_key" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X POST
```

> Sample response

> *The return format is the same as in the [update an agent](#update-an-agent) method.*


## Remove an agent

Removes an agent. Archived chats will not be removed, but all statistics will be lost. The agent will be notified by e-mail that the account has been deleted.

> Path

```
DELETE https://api.livechatinc.com/agents/<LOGIN>
```
> Sample request

```shell
curl "https://api.livechatinc.com/agents/jenny.doe@mycompany.com" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X DELETE
```

> Sample response

```json
{
  "result": "jenny.doe@mycompany.com removed successfully"
}
```
