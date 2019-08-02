---
weight: 30
---

# Events

One of the data structures are **events**. They are sent to a chat via the `send_event` method. 
Apart from events, there are also [properties](#property), [users](#user), [thread](#thread), and [other data structures](#other-data-structures). 

----------------------------------------------------------------------------------------------------------------------------------------

These are the available **event types**:

- [Custom](#custom)
- [File](#file) 
- [Filled form](#filled-form)
- [Message](#message) 
- [Rich message](#rich-message) 
- [System message](#system-message) 


## Custom

>  A sample **Custom** event

``` js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "31-0C-1C-07-DB-16",
	"order": 1, // generated server-side
	"type": "custom",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"content": {
		"custom": {
			"nested": "json"
		}
	},
	"recipients": "all",
	"properties": {
		// "Properties" object
	}
}
```
**an event with customizable payload**

----------------------------------

| Field  |      Req./Opt.     |  Note |
|----------|:-------------:|------:|
| `custom_id` |  optional | - |
| `properties` | optional |   -  |
| `recipients` |    required   |  can take the following values: `all` (default), `agents` |


## File

> A sample **File** event

``` js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "31-0C-1C-07-DB-16",
	"order": 1, // generated server-side
	"type": "file",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"recipients": "all",
	"properties": {
		// "Properties" object
	},
	"name": "image25.png",
	"url": "https://domain.com/asdsfdsf.png",
	"thumbnail_url": "https://domain.com/thumbnail.png",
	"thumbnail2x_url": "https://domain.com/thumbnail2x.png",
	"content_type": "image/png",
	"size": 123444,
	"width": 640,
	"height": 480
}
```

**informs about a file upload**

----------------------------------

| Field  |      Req./Opt.     |  Note |
|----------|:-------------:|------:|
| `content_type` | required | supported image types: `image/png`, `image/jpeg`, `image/gif` |
| `custom_id` |  optional | - |
| `properties` |  optional | - |
| `recipients` |    required   |  can take the following values: `all` (default), `agents` |
| `system_message_type` | required |   -  |
| `width`, `height`, `thumbnail_url`, `thumbnail2x_url`| optional | only for images |



## Filled form

> A sample **Filled form** event

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "31-0C-1C-07-DB-16",
	"order": 4, // generated server-side
	"type": "filled_form",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"recipients": "all",
	"properties": {
		// "Properties" object
	},
	"form_id": "1473433500211",
	"fields": [{
		"type": "name",
		"id": "154417206262603539",
		"label": "Your name",
		"answer": "John Doe"
	}, {
		"type": "email",
		"id": "154417206262601584",
		"label": "Your email",
		"answer": "customer1@example.com"
	}, {
		"type": "radio",
		"id": "154417206262602571",
		"label": "Chat purpose",
		"answer": {
				"id": "0",
				"label": "Support"
		}
	}, {
		"type": "checkbox",
		"id": "154417206262604640",
		"label": "Company industry",
		"answers": [{
			"id": "0"
			"label": "automotive"
		}, {
			"id": "1"
			"label": "it"
		}]
	}, {
		"type": "group_chooser",
		"id": "154417206262605324",
		"label": "Choose department",
		"answer": {
			"group_id": 1,
			"label": "Marketing"
		}
	}]
}
```

**an event containing data from a form**

----------------------------------


| Field  |      Req./Opt  |  Note|
|----------|:-------------:|------:|
| `custom_id`  |    optional   | -   |
| `properties` | optional |   -  |
| `recipients` |  required | can take the following values: `all` (default), `agents` |
| `name`, `email`, `question`, `textarea`|optional | for open questions (text answer) |
| `radio`, `select`  |    optional   | for single-choice questions |
| `checkbox` | optional  | for multiple-choice questions |
| `group_chooser` | optional  | for group-choice questions |



## Message

> A sample **Message** event

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "31-0C-1C-07-DB-16",
	"order": 1, // generated server-side
	"type": "message",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"text": "hello there",
	"postback": {
		"id": "action_call",
		"thread_id": "K600PKZON8",
		"event_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
		"type": "phone",
		"value": "790034890"
	},
	"recipients": "all",
	"properties": {
		// "Properties" object
	}
}
```

**sending a text message to other chat users**

----------------------------------

| Field  |      Req./Opt.   |  Note |
|----------|:-------------:|------:|
| `custom_id` | optional |   -  |
| `postback` |    optional  |  -  |
| `postback.type` | required | required only if `postback.value` is present |
| `postback.value`| required | required only if `postback.type` is present |
| `properties` | optional |   -  |
| `recipients` |  required | can take the following values: `all` (default), `agents` |
| `text` | required | max. raw text size is 16 KB (one UTF-8 char like emoji 😁 can use up to 4 B); to send more, split text into several messages |


## System message

> A sample **System message** event

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "31-0C-1C-07-DB-16",
	"order": 1, // generated server-side
	"type": "system_message",
	"timestamp": 1473433500, // generated server-side
	"text": "hello there",
	"system_message_type": "routing.assigned",
	"text_vars": {
		"agent": "John Doe"
	}
}
```

**an event generated by the chat router**

----------------------------------

| Field  |      Req./Opt.     |  Note |
|----------|:-------------:|------:|
| `custom_id` |  optional | - |
| `recipients` |    required   |  can take the following values: `all` (default for system events), `agents` (for events sent via send_event)  |
| `system_message_type` | required |   -  |


Here's the list of all system messages you might come across:

#### `agent_added`
|  Content    |  Generated when |
|:-------------:|------:|
|  _%initiator% added %agent% to the chat_ | agent was added to chat via `add_user_to_chat` request and is not the first agent ever in the chat |

#### `agent_joined` 
|  Content    |  Generated when |
|:-------------:|------:|
| _%agent% joined the chat_  | agent added themselves to chat via `add_user_to_chat` request and is not the first agent ever in the chat |

#### `agent_removed`
|  Content    |  Generated when |
|:-------------:|------:|
| _%initiator% removed %agent% from the chat_ | agent was removed from chat via the `remove_user_from_chat` request |


#### `archived_customer_disconnected`
|  Content    |  Generated when |
|:-------------:|------:|
| _%customer% left the chat_ | chat ended after customer left the website |

#### `chat_transferred`
|  Content    |  Generated when |
|:-------------:|------:|
| _%initiator% transferred the chat to %targets%_ | chat was transferred via the `transfer_chat` request |

#### `customer_added`
|  Content    |  Generated when |
|:-------------:|------:|
| _%initiator% added %customer% to the chat_ | customer was added to chat via `add_user_to_chat` request |

#### `customer_banned`
|  Content    |  Generated when |
|:-------------:|------:|
| _Chat archived because customer was banned by %agent% for %duration% day(s)_ | chat ended because customer was banned via the `ban_customer` request |

#### `customer_removed`
|  Content    |  Generated when |
|:-------------:|------:|
| _%initiator% removed %customer% from the chat_ | customer was removed from chat via `remove_user_from_chat` request|

#### `manual_archived_agent`
|  Content    |  Generated when |
|:-------------:|------:|
| _%agent% archived the chat_ | agent closed chat via close_thread request |

#### `manual_archived_customer`
|  Content    |  Generated when |
|:-------------:|------:|
| _%customer% archived the chat_ | customer closed chat via close_thread request |

#### `rating.chat_commented`
|  Content    |  Generated when |
|:-------------:|------:|
| _%customer% left the following comment: %comment%_ | chat was commented by customer |

#### `rating.chat_rated`
|  Content    |  Generated when |
|:-------------:|------:|
| _%customer% rated the chat as %score%_ | chat was rated by customer |

#### `rating.chat_rating_canceled`
|  Content    |  Generated when |
|:-------------:|------:|
| _%customer% canceled the chat rating_ | chat rating was cancelled by customer |

#### `routing.archived_deleted`
|  Content    |  Generated when |
|:-------------:|------:|
| _The chat was closed because %agent% account had been deleted_ | chat was archived after agent was removed from license, no other agent could be selected and queues were disabled |

#### `routing.archived_disconnected`
|  Content    |  Generated when |
|:-------------:|------:|
| _The chat was closed because %agent% had lost internet connection_ | chat was archived after agent unexpectedly loses connection, no other agent could be selected and queues were disabled |

<!-- ####
|  Content    |  Generated when |
|:-------------:|------:|
|   |  | -->

<!-- | Name  |  Content    |  Generated when |
|----------|:-------------:|------:|
| `agent_added` |  _%initiator% added %agent% to the chat_ | agent was added to chat via `add_user_to_chat` request and is not the first agent ever in the chat |
| `agent_joined` |  _%agent% joined the chat_ | agent added themselves to chat via `add_user_to_chat` request and is not the first agent ever in the chat |
| `agent_left` | _%agent%  left the chat_ | agent removed themselves from chat via `remove_user_from_chat` request |
| `agent_removed` | _%initiator% removed %agent% from the chat_ | agent was removed from chat via the `remove_user_from_chat` request |
| `archived_customer_disconnected` | _%customer% left the chat_ | chat ended after customer left the website |
| `chat_transferred` | _%initiator% transferred the chat to %targets%_ | chat was transferred via the `transfer_chat` request |
| `customer_added` | _%initiator% added %customer% to the chat_ | customer was added to chat via `add_user_to_chat` request |
| `customer_banned` | _Chat archived because customer was banned by %agent% for %duration% day(s)_ | chat ended because customer was banned via the `ban_customer` request |
| `customer_removed` | _%initiator% removed %customer% from the chat_ | customer was removed from chat via `remove_user_from_chat` request|
| `manual_archived_agent` | _%agent% archived the chat_ | agent closed chat via close_thread request |
| `manual_archived_customer` | _%customer% archived the chat_ | customer closed chat via close_thread request |
| `rating.chat_commented` | _%customer% left the following comment: %comment%_ | chat was commented by customer |
| `rating.chat_rated` | _%customer% rated the chat as %score%_ | chat was rated by customer |
| `rating.chat_rating_canceled` | _%customer% canceled the chat rating_ | chat rating was cancelled by customer |
| `routing.archived_deleted` | _The chat was closed because %agent% account had been deleted_ | chat was archived after agent was removed from license, no other agent could be selected and queues were disabled |
| `routing.archived_disconnected` | _The chat was closed because %agent% had lost internet connection_ | chat was archived after agent unexpectedly loses connection, no other agent could be selected and queues were disabled |
| `routing.archived_inactive` | _Chat archived due to %duration% minutes of inactivity_ | no new messages were posted for a prolonged time |
| `routing.archived_offline` | _Chat archived due to no available agents_ | no agent could be selected after chat was placed in queue |
| `routing.archived_other` | _The chat was closed_ | chat was archived after agent was removed from chat for other reasons, no other agent could be selected and queues were disabled |
| `routing.archived_remotely_signed_out` | _The chat was closed because %agent% had been remotely signed out_ | chat was archived after agent was logged out, no other agent could be selected and queues were disabled |
| `routing.archived_signed_out` | _The chat was closed because %agent% had signed out_ | chat was archived after agent logged out, no other agent could be selected and queues were disabled |
| `routing.assigned_deleted` | _Chat assigned to %addedAgent% because %removedAgent% account had been deleted_ | chat was assigned to new agent after previous one was removed from license |
| `routing.assigned_disconnected` | _Chat assigned to %addedAgent% because %removedAgent% had lost internet connection_ | chat was assigned to new agent after previous one unexpectedly lost connection |
| `routing.assigned_inactive` | _Chat assigned to %agent_added% because %agent_removed% hasn't replied in %duration% minutes_ | chat was assigned to new agent after previous one failed to response in a timely manner |
| `routing.assigned_other` | _The chat was closed_ | chat was archived after agent was removed from chat for other reasons, no other agent could be selected and queues were disabled |
| `routing.assigned_remotely_signed_out` | _Chat assigned to %addedAgent% because %removedAgent% had been remotely signed out
_ | chat was assigned to new agent after previous one was logged out |
| `routing.assigned_signed_out` | _Chat assigned to %addedAgent% because %removedAgent% had signed out_ | chat was assigned to new agent after previous one logged out |
| `routing.idle` | _Chat is idle due to %duration% minutes of inactivity_ | no new messages were posted for a prolonged time |
| `routing.unassigned_deleted` | _Customer was queued because %agent% account has been deleted_ | chat was queued after agent was removed from license |
| `routing.unassigned_disconnected` | _Customer was queued because %agent% had lost internet connection_ | chat was queued after agent unexpectedly lost connection |
| `routing.unassigned_other` | _Chat is unassigned_ | chat was queued after agent was removed from chat for other reasons |
| `routing.unassigned_remotely_signed_out` | _Customer was queued because %agent% had been remotely signed out_ | chat was queued after agent was logged out |
| `routing.unassigned_signed_out` | _Customer was queued because %agent% had signed out_ | chat was queued after agent logged out |
| `system_archived` | _Chat archived_ | license was moved to another lc_serv instance while there were still active chats |
| `transcript_requested` | _%customer% requested the chat transcript to be sent to %email%_ | customer enables transcript |
| `transcript_sent` | _%customer% sent the chat transcript to %email%_ | achat ended with transcript enabled by customer | -->



## Rich message

> A sample **Rich message** event

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "31-0C-1C-07-DB-16",
	"order": 1, // generated server-side
	"type": "rich_message",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"recipients": "all",
	"properties": {
		// "Properties" object
	},
	"template_id": "cards",
	"elements": [{
		"title": "Lorem ipsum dolor.",
		"subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		"image": {
			"name": "image25.png",
			"url": "https://domain.com/asdsfdsf.png",
			"content_type": "image/png",
			"size": 123444,
			"width": 640,
			"height": 480
		},
		"buttons": [{
			"text": "yes",
			"postback_id": "action_yes",
			"user_ids": ["b7eff798-f8df-4364-8059-649c35c9ed0c"]
		}, {
			"text": "no",
			"postback_id": "action_no",
			"user_ids": []
		}, {
			"type": "phone",
			"text": "value",
			"value": "790034890",
			"webview_height": "tall", // optional, one of compact, tall, full
			"postback_id": "action_call",
			"user_ids": []
		}]
	}, {
		"title": "Lorem ipsum dolor 2."
	}]
}
```

**sending a rich message**

----------------------------------


| Field  |      Req./Opt.   |  Note |
|----------|:-------------:|------:|
| `custom_id` | optional |   -  |
| `elements` |    optional  | can contain 1 - 10 `element` objects |
| `elements.buttons` | optional | `buttons` can contain 1 - 11 `button` objects |
| `elements.buttons.postback_id` | ? | describes the action sent via `send_rich_message_postback`; multiple buttons (even from different elements) can contain the same `postback_id`; calling `send_rich_message_postback` with this id will add a user to all those buttons at once |
| `elements.buttons.user_ids` | ? | describes users that sent the postback with `"toggled": true` |
| `elements.image`| optional | `image` properties are optional: `name`, `url`, `content_type`, `size`, `width`, `height` |
| `elements.subtitle`| optional |  |
| `elements.title`| optional |  |
| `properties` | optional |   -  |
| `recipients` |  required | can take the following values: `all` (default), `agents` |
| `template_id` | ? | describes how the event should be presented in an app |