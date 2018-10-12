# Changelog

## [v3.0] - dev preview

### Added
- Optional `timezone` to `login` request method
- Attach to last thread flag in `send_event` method
- New methods: `create_customer`, `get_customers`, `add_user_to_chat`,`remove_user_from_chat`, `grant_access`, `revoke_access`, `transfer_chat`, `set_access`, `logout` and `send_file`
- New push messages: `customer_created`, `customer_visit_started`, `customer_visit_ended`, `customer_page_updated`, `chat_user_added`, `chat_user_removed`, `access_granted`, `access_revoked`, `chat_transfered` and `event_properties_updated`
- optional `type` to `multicast` method and `incoming_multicast` push message
- New field `__priv_lc2_customer_id` to `customer` object
- New fields `thumbnail_url` and `thumbnail2x_url` in `file` event for images
- Support for `users` in `start_chat` request method
- Optional `website_last_activity` to `login` response method
- Fields `type` and `value` to `rich_message` button
- `text_vars` values added to `system_message` event

### Changed
- `update_customer` - requires valid UUID v4 customer id, new request format
- format of push message `customer_updated` has changed
- number of chats no longer affects how many push messages `customer_updated` are sent
- `monitoring` object in `customer` changed to `last_visit` and has new format
- `author_id` in `incoming_multicast` push message is optional
- format of `filled_form` event object

### Removed
- Removed `join_chat`, `remove_from_chat`, `update_chat_scopes` method
- Removed `chat_users_updated`, `chat_scopes_updated` push

### Fixed
- Sending `incoming_typing_indicator` push

## [v0.5] - 2018-01-12

### Added
- New chat event type - `rich_message`
- New method: `send_rich_message_postback` and push: `incoming_rich_message_postback`

## [v0.4] - 2017-12-04

### Added
- New method `multicast`
- `in_trial` to `license` object in `login` response

### Changed
- Push message `incoming_broadcast` changed to `incoming_multicast`
- `last_event_per_type` object is now a map of objects with a specific type of event, `thread_order` and `thread_id`
- `last_event_per_type` object contains the last events from a chat instead of a thread

### Removed
- Method `send_broadcast`, use `multicast` instead

### Fixed
- Support for `file` event in `last_event_per_type` for non-active chats
- Include different types of events in `last_event_per_type` for non-active chats

## [v0.3] - 2017-11-09

### Added
- Support for uploading images
- Support for sending messages as bots with `author_id`
- `creation_date` to `license` object in `login` response

### Changed
- Replace `properties` with `fields` in `customer` object
- Every validation error has user-friendly message with details

### Removed
- Method `send_message`, use `send_event` instead
- Method `supervise_chat` as well as `supervisor`/`supervisors` objects

### Fixed
 - `author_id` in `custom` event

## [v0.2] - 2017-09-01

### Added
- `monitoring` to `customer` object in `get_archives` response
- Support for chat scopes
- Support for managing auto chat scopes configuration
- Support for sending broadcast to agents
- New chat event type - `custom`

### Changed
- Move `license_id` and `plan` to `license` object in `login` response

### Removed
- Active chats from `login` response
- `firebase_token` param from `login` request

## [v0.1] - 2017-04-24

- First release
