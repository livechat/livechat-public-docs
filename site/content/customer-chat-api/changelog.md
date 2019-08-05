# Changelog

## [v3.1] - dev preview

## [v3.0] - 2018-04-19

### Added
- New fields `has_active_thread` to `login` response
- Attach to last thread flag in `send_event` method
- New push messages: `customer_page_updated`, `chat_user_added`, `chat_user_removed` and `event_properties_updated`
- New methods: `update_customer_page`, `get_groups_status`, `get_predicted_agent`, `get_url_details` and `update_event_properties`
- New fields `thumbnail_url` and `thumbnail2x_url` to `file` event for images
- New field `customer_side_storage` to `login` method and new push `customer_side_storage_updated`
- Added `__priv_lc2_customer_id` field to customer object
- New private object `__priv_dynamic_config` to `login` response
- Added `job_title` to `User > Agent` object
- `text_vars` values added to `system_message` event
- Fields `type` and `value` to `rich_message` button

### Changed
- format of push message `customer_updated` and method `update_customer`
- number of chats no longer affects how many push messages `customer_updated` are sent
- format of login request message
- format of `filled_form` event object
- `scopes` (part of `chat` and `thread` object) changed to `access`

### Removed
- `chat_users_updated`, `chat_scopes_updated` push
-  `update_chat_scopes` method
- `static_config_path` from `login` response

## [v0.5] - 2018-01-12

### Added
- New chat event type - `rich_message`
- New method `send_rich_message_postback` and push `incoming_rich_message_postback`


## [v0.4] - 2017-12-04

### Added
- New push `incoming_multicast`

### Changed
- `last_event_per_type` object is now map of objects with specific type of event, `thread_order` and `thread_id`
- `last_event_per_type` object contains last events from chat instead of thread

### Fixed
- Support for `file` event in `last_event_per_type` for non-active chats

## [v0.3] - 2017-11-09

### Added
- New method `get_chats_summary`
- New reasons in `customer_disconnected` push
- Short guide for RTM API and Web API to docs
- Total events to `threads_summary` object

### Changed
- Require customer to authorize with `token` param instead of cookies in `login` request
- Expect `offset` and `limit` params instead of `pagination` object in `get_chat_threads_summary` request
- Always use `offset` for pagination instead of `page`
- Return `total` results rather than `pagination` object
- Replace `properties` with `fields` in `customer` object
- Update error handling
- Every validation error has user-friendly message with details

### Removed
- `last_chats_limit` and `last_threads_limit` params from `login` request
- Customer's chats in `login` response

### Fixed
 - `author_id` in `custom` event

## [v0.2] - 2017-09-01

### Added
- Support for chat scopes
- New chat event type - `custom`

### Changed
- Pushes with empty list of updated properties will no longer be sent

### Removed
- Method `send_message` in RTM API

## [v0.1] - 2017-04-24

:sparkles:
