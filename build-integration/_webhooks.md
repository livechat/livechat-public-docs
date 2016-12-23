# Webhooks

You can configure LiveChat to be immediately notified about particular events. Such a notification is called a **webhook** – it’s just a simple HTTP request that LiveChat sends to your server when a particular event occurs. Check the basic auth example on the right.

## Setting up the webhooks

> Go to **Settings > Integrations > Webhooks** and set up your webhook URLs
> <img src="https://cdn.livechatinc.com/website/uploads/2015/03/finalizing-webhook-creation.jpg" alt="Finalizing web hook creation" width="500"/>

You can enable your webhooks in the web application: [https://my.livechatinc.com/settings/webhooks](https://my.livechatinc.com/settings/webhooks).

Each webhook consists of the following properties:

*   **Event** – determines when the webhook is sent to your web server.
*   **Data type** – includes additional information in the webhook.
*   **Target URL** – address of your web server the webhook will be sent to.

## HTTP Basic Auth

> File contents: .htaccess

```shell
AuthType Basic
AuthName "My Protected Area"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

> File contents: .htpasswd

```
livechat:$apr1$G9iXatUK$gPJLrKQsoWWkFCY/SXO/H.
```

> Example webhook url

```
https://livechat:password@www.my-website.com
```

For security reasons it's recommended to use HTTP basic authentication. Credentials should be passed in this format: `https://user:password@www.my-website.com`. We recommend using https:// in webhook url.


## Example integrations

Here are some ideas for using LiveChat webhooks:

*   read additional information about your visitors from your database and send it back to the LiveChat app,
*   display a warning message on your internal statusboard when your website visitors start queueing before the chat,
*   save each chat transcript in the external system.

### Displaying visitor details in LiveChat apps

> Example script – additional visitor details

```php
<?php

// read the webhook sent by LiveChat
$data = file_get_contents('php://input');
$data = json_decode($data);

// make sure the "chat_started" event occured
if ($data->event_type === 'chat_started')
{
    // read additional information about your visitor
    // from your internal database
	$email = $data->visitor->email;
	$visitorDetails = $MyDatabase->query($email);

	// send this information to LiveChat apps
	$fields = array();
	$fields[] = (object)array(
		'name' => 'Age',
		'value' => $visitorDetails['age']
	);
	$fields[] = (object)array(
		'name' => 'Position',
		'value' => $visitorDetails['position']
	);

	$curlFields = http_build_query(array(
		'license_id' => $data->license_id,
		'token' => $data->token,
		'id' => 'my-integration',

		// Do not enter "http" prefix in the icon URL.
		// Your server must be able to serve the icon
		// using both https:// and http:// protocols.
		'icon' => 'example.com/ico-64.png',

		'fields' => $fields
	));

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'https://api.livechatinc.com/visitors/'.$data->visitor->id.'/details');
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $curlFields);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-API-Version: 2'));
	$result = curl_exec($ch);
	curl_close($ch);
}
```

You may want to query your database based on your visitor’s e-mail address and display additional visitor information to your agents. You can do this by activating a webhook with `chat_started` event.

Every time a chat is started, your script will receive a webhook including visitor’s e-mail address. You can then look up your own database and send additional information to LiveChat apps.

Upload the example script (displayed in the right column) to your web server and set up a webhook to send `chat_started` event to this script. As a result, your agents will see additional information during a chat:

<img src="https://cdn.livechatinc.com/website/uploads/2013/02/visitor-details1.png" alt="Visitor details in LiveChat"/>

You can read a more detailed documentation in [Visitors API](/rest-api/#add-custom-visitor-details).

### Notifying internal statusboard about a queued visitor

> Example script – notifications

```php
<?php

// read the webhook sent by LiveChat
$data = file_get_contents('php://input');
$data = json_decode($data);

// make sure the "visitor_queued" event occured
if ($data->event_type === 'visitor_queued')
{
    // BAM! Play a sound on your internal statusboard
    // $Statusboard->play();
}
```

Let’s say you want to be notified with a sound on your internal company statusboard every time a visitor is queued before the chat.

Upload an example script (displayed in the right column) to your web server and set up a webhook to send `visitor_queued` event to this script.

## Webhook format

> Example webhook

```json-doc
{
  "event_type": "chat_started",
  "token": "27f41c8da685c81a890f9e5f8ce48387",
  "license_id": "1025707"
}
```

Each webhook is a HTTP POST request made to the URL that you provide in the web app. The request's POST body contains webhook information in JSON format.

Each webhook contains the following properties:

*   `event_type` – tells you the event that triggered the webhook. Possible values: `chat_started`, `chat_ended`, `visitor_queued`.
*   `token` and `license_id` – your authentication credentials that let you call LiveChat’s REST API methods. You won’t need to use them unless you want to make a call to LiveChat’s API right when you receive a webhook. In that case, you just need to pass these `token` and `license_id` credentials in your API call. [Here’s an example](/rest-api/#add-custom-visitor-details).
*   additional information – please read the [Webhook data types](#webhook-data-types) section.

When your server receives a webhook from LiveChat, it should respond with `HTTP 200` response. Otherwise, LiveChat will retry sending the webhook to your service for a number of times unless it receives the correct `HTTP 200` response.

Note: LiveChat webhooks are sent with `Content-Type: application/json` header, so please make sure that your service can handle such requests.

Note: `chat_changed` event type is sent only when the tag list for a particular chat was changed, no matter if the chat is pending or not.

## Webhook data types

> Example webhook including visitor information

```json-doc
{
  "event_type": "chat_started",
  "token": "27f41c8da685c81a890f9e5f8ce48387",
  "license_id": "1025707",
  "visitor": {
    "id": "S1354547427.0c151b0e1b",
    "name": "John",
    "email": "john.smith@gmail.com"
  }
}
```

In some cases, you may want to get some additional information when the particular event occurs.

For example, when the chat starts, you may want to know the exact chat start time along with the visitor's name and e-mail provided in the pre-chat survey. To get this information, you can add some **data types** that will be sent to your webserver along with each webhook.


| Event type | Supported data types |
|------------|----------------------|
| `visitor_queued` | `visitor` |
| `chat_started` | `chat`, `visitor`, `pre_chat_survey` |
| `chat_ended` | `chat`, `visitor`, `pre_chat_survey` |
| `chat_changed` | `chat`, `visitor` |
| `ticket_created` | `ticket` |


### Data type: chat

```json-doc
{
  "chat":{
    "id":"MH022RD0K5",
    "started_timestamp":1358937653,
    "ended_timestamp":1358939109,
    "messages":[
      {
        "user_type":"agent",
        "author_name":"John Doe",
        "agent_id":"john.doe@mycompany.com",
        "text":"Hello",
        "timestamp":1358937653
      },
      {
        "user_type":"supervisor",
        "author_name":"James Doe",
        "agent_id":"james@mycompany.com",
        "text":"This is whispered message.",
        "timestamp":1358937658
      },
      {
        "user_type":"visitor",
        "author_name":"Mary Brown",
        "text":"How are you?",
        "timestamp":1358937661
      }
    ],
    "tags":[
      "sales",
      "support",
      "feedback"
    ]
  }
}
```

Include this data type if you need to know chat start and end time or the full chat transcript.

### Data type: visitor

```json-doc
"visitor": {
	"id": "S126126161.O136OJPO1",
	"name": "Mary Brown",
	"email": "mary.brown@email.com",
	"custom_variables": [
		{
			"key": "Customer ID",
			"value": "POQ51023XZA"
		}
	]
}
```

This data type includes visitor’s name and e-mail address.

### Data type: pre_chat_survey

```json-doc
"pre_chat_survey": [
{
  "id": "135963440121804757",
  "type": "name",
  "label": "Your name",
  "answer": "Mary Brown"
},
{
  "id": "135963440121802531",
  "type": "email",
  "label": "Your e-mail",
  "answer": "mary.brown@email.com"
},
{
  "id": "135963613764705707",
  "type": "checkbox",
  "label": "What are your favourite music bands?",
  "answers": [{
    "label": "Deep Purple",
    "chosen": true
  },
  {
    "label": "Iron Maiden",
    "chosen": false
  },
  {
    "label": "Guns N' Roses",
    "chosen": true
  }]
}
]
```

Include this data type if you need to know the exact results of the pre-chat survey that was filled in by the visitor.

<aside class="notice">When the pre-chat survey is omitted (for example, when chat is started after an automated greeting), the <code>pre_chat_survey</code> will contain an empty array. You don't need to write additional code to handle edge cases.</aside>

### Data type: ticket

```json-doc
"ticket":{
  "assignee":{
    "id":"agent.gregory@email.com",
    "name":"Gregory"
  },
  "events":[
    {
      "author":{
        "id":"mary.brown@email.com",
        "name":"agent4",
        "type":"agent"
      },
      "date":"2014-08-18T10:05:05Z",
      "is_private":false,
      "message":"How are you?",
      "source":{
        "type":"agent-app-manual",
        "url":null
      },
      "type":"message"
    }
  ],
  "groups":[
    {
      "id":0,
      "name":"All operators"
    }
  ],
  "id":"CCWWM",
  "requester":{
    "mail":"mary.brown@email.com",
    "name":"Mary Brown"
  },
  "status":"open",
  "subject":"Welcome",
  "tags":['support'],
  "source":{
    "type":"lc2",
    "url":null,
    "id":"NO4Y5FAERW"
  }
}
```

This data type includes ticket details.