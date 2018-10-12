---
weight: 30
---

# Key Concepts

The LiveChat system is based on four basic types of entities - users, chats, events and
threads.

- chats consist of threads and threads consist of events
- threads are parts of chats,
- users can add events to chats, which then are automatically added to threads
- users can participate in many chats at the same time

Threads are a vital part of LiveChat architecture. They provide
continuous chat experience (i.e. they never end and you can always add to
them) and they group events in smaller logical chunks, e.g. for reporting and
caching purposes. However, threads tend to complicate handling
various operations like loading more history events. The good part is that you don't
have to worry about them most of the time and this SDK is doing the heavy lifting
behind the scenes for you. You will get notified about threads'
metadata only if you explicitly ask for it - most SDK methods expect only chat
IDs.

## User

```js
{
	id: 'ed9d4095-45d6-428d-5093-f8ec7f1f81b9',
	type: 'agent',
	name: 'Jane Doe',
	avatar: 'https://livechat-static.com/assets/images/livechat_logo.ae4271fe1a0a2db838dcf075388ee844.png',
}
```

## Chat

```js
{
	id: 'OU0V0P0OWT',
	users: [{
		id: 'ed9d4095-45d6-428d-5093-f8ec7f1f81b9',
		// ... more user properties
	}],
	lastSeenTimestamps: {
		'ed9d4095-45d6-428d-5093-f8ec7f1f81b9': 1503062591000, // might be null
	},
	threads: ['OU0V0U3IMN'],
}
```

## Event

```js
{
	type: 'message',
	text: 'hi!',
    author: 'ed9d4095-45d6-428d-5093-f8ec7f1f81b9', // assigned by server
	id: 'OU0V0U3IMN_1', // assigned by server
    timestamp: 1503062591000, // assigned by server
    customnId: '814.3316641404942', // optional
    thread: 'OU0V4R0OXP',
	properties: {},
}
```

## Threads

```js
{
	id: 'OU0V0U3IMN',
	active: true,
	order: 3,
	users: ['ed9d4095-45d6-428d-5093-f8ec7f1f81b9'],
	lastSeenTimestamps: {
		'ed9d4095-45d6-428d-5093-f8ec7f1f81b9': 1503062591000, // might be null
	},
	events: [ /* events */ ],
}
```
