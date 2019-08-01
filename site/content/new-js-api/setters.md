--
weight: 40
--

## Setters

### Set session variables

Creates new session variables, or replaces the ones set previously.

`LiveChatWidget.call('set_session_variables', { cart_value:'450' })`

### update session variables

Changes values for your session variables.
Please note that this will include new session variables with those previously set, instead of replacing them.

#### Example

`LiveChatWidget.call('udpate_session_variables', { cart_value: '450' })`

### set visitor name

Sets the Visitor name

#### Example

`LiveChatWidget.call('set_visitor_name', 'John Doe')`

### set visitor email

Sets the Visitor e-mail address

#### Example

`LiveChatWidget.call('set_visitor_email', 'john@example.com')`
