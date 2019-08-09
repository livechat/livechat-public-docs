---
weight: 40
---

# Users

**Users** are another important data structure. Within this data structure type, we can distinguish:

- [Agent](#agent)
	* [Customer](#customer)
- [My profile](#my-profile)



## Agent

> A sample **Agent** data structure

```js
{
	"id": "agent1@example.com",
	"type": "agent",
	"name": "Support Team",
	"email": "agent1@example.com",
	"present": true,
	"last_seen_timestamp": 1473433500,
	"avatar": "cdn.livechatinc.com/avatars/1.png",
	"routing_status": "accepting_chats"
}
```

| Field  |      Req./Opt.     |  Note |
|----------|:-------------:|------:|
| `routing_status` |  optional | returned only if the agent's currently logged in |

### My profile

> A sample **My profile** data structure

```js
{
	"id": "agent1@example.com",
	"type": "agent",
	"name": "Support Team",
	"email": "agent1@example.com",
	"present": true,
	"last_seen_timestamp": 1473433500,
	"avatar": "cdn.livechatinc.com/avatars/1.png",
	"routing_status": "accepting_chats",
	"permission": "administrator"
}
```

## Customer

> A sample **Customer** data structure

```js
{
	"id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"type": "customer",
	"name": "John Smith",
	"email": "agent1@example.com",
	"avatar": "domain.com/avatars/1.png",
	"last_visit": {
		"started_at": "2017-10-12T15:19:21.010200Z",
		"referrer": "http://www.google.com/",
		"ip": "194.181.146.130",
		"user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36",
		"geolocation": {
			"country": "Poland",
			"country_code": "PL",
			"region": "Dolnoslaskie",
			"city": "Wroclaw",
			"timezone": "Europe/Warsaw"
		},
		"last_pages": [{
			"opened_at": "2017-10-12T15:19:21.010200Z",
			"url": "https://www.livechatinc.com/",
			"title": "LiveChat - Homepage"
		}, {
			"opened_at": "2017-10-12T15:19:21.010200Z",
			"url": "https://www.livechatinc.com/tour",
			"title": "LiveChat - Tour"
		}]
	},
	"fields": {
		"custom field name": "custom field value"
	},
	"statistics": {
		"chats_count": 3,
		"threads_count": 9,
		"visits_count": 5
	},
	"__priv_lc2_customer_id": "S1525771305.dafea66e5c", //old, lc2 customer_id
	"agent_last_event_created_at": "2017-10-12T15:19:21.010200Z",
	"customer_last_event_created_at": "2017-10-12T15:19:21.010200Z",
	"created_at": "2017-10-11T15:19:21.010200Z",
	"present": true, // optional, applies only to customer located in chat object
	"last_seen_timestamp": 1473433500 // optional, applies only to customer located in chat object
}
```



| Field  |      Req./Opt.     |  Note |
|----------|:-------------:|------:|
| `agent_last_event_created_at` |  optional | - |
| `avatar` |    optional   |  -  |
| `customer_last_event_created_at` | optional |   -  |
| `created_at` |  optional | - |
| `email` |  optional | - |
| `fields` |  optional | not present when the chat is archived |
| `name`  |  optional | - |
| `last_seen_timestamp` |  optional | - |
| `last_visit` |  optional | - |
| `present` |  optional | - |
| `statistics` |  optional | - |



