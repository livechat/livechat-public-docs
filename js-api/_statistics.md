# Statistics

## Get last visit timestamp

```js
var timestamp = LC_API.get_last_visit_timestamp();
```

Returns timestamp (in seconds) of the previous user’s visit on the website.

## Get visits number

```js
var visits = LC_API.get_visits_number();
```

Returns total number of user’s visit on the website.

## Get page views number

```js
var pageviews = LC_API.get_page_views_number();
```

Returns total number of user’s page views (including past visits).

## Get chats number

```js
var chats = LC_API.get_chats_number();
```

Returns total number of user’s chats.


## Get visitor’s ID

```js
var visitor_id = LC_API.get_visitor_id();
```

Returns the unique identificator of the current visitor.

## Get current chat ID

```js
var chat_id = LC_API.get_chat_id();
```

Returns the unique identificator of the current chat.

The chat ID is remembered even when the chat ends until the page is refreshed. Returns `null` if chat ID is unknown (e.g. chat has not yet started).