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


Here's the list of all system messages:


| Name  |  Content    |  Generated when |
|----------|:-------------:|------:|
| `agent_added` |  _%initiator% added %agent% to the chat_ | agent was added to chat via `add_user_to_chat` request and is not the first agent ever in the chat |
| `agent_joined` |  _%agent% joined the chat_ | agent added themselves to chat via `add_user_to_chat` request and is not the first agent ever in the chat |
| `agent_left` | _%agent%  left the chat_ | agent removed themselves from chat via `remove_user_from_chat` request |

## Rich message

> A sample **Rich message** event:

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