---
weight: 30
---

# Users

**Users** are another important data structure. Within this data structure type, we can distinguish:

- [Customer](#customer)
- [Agent](#agent)


## Customer

> A sample **Customer** data structure

```json
{
	"id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"type": "customer",
	"name": "John Smith",
	"email": "customer1@example.com",
	"avatar": "https://domain.com/avatars/1.jpg",
	"fields": {
		"custom field name": "custom field value"
	},
	"present": true,
	"last_seen_timestamp": 1473433500
}
```



| Field  |      Req./Opt.     |  Note |
|----------|:-------------:|------:|
| `avatar` |    optional   |  -  |
| `fields` |  optional | -  |


## Agent

> A sample **Agent** data structure

```json
{
	"id": "agent1@example.com",
	"type": "agent",
	"name": "Support Team",
 	"avatar": "cdn.livechatinc.com/avatars/1.png",
	"present": true,
	"last_seen_timestamp": 1473433500
}
```


