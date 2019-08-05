---
weight: 40
---

# Setters

Various data can be sent over to the LiveChat integration to be used by your Agents.
For more information, you can read these articles in our help center: https://www.livechatinc.com/help/custom-variables-configuration/

Available setters:

- [Set session variables](#set-session-variables)
- [Update session variables](#update-session-variables)
- [Set visitor name](#set-visitor-name)
- [Set visitor email](#set-visitor-email)

## Set session variables

Creates new session variables, or replaces the ones set previously.

`LiveChatWidget.call('set_session_variables', { cart_value:'450' })`

## Update session variables

Changes values for your session variables.
Please note that this will include new session variables with those previously set, instead of replacing them.

#### Example

`LiveChatWidget.call('update_session_variables', { cart_value: '450' })`

## Set visitor name

Sets the Visitor name

#### Example

`LiveChatWidget.call('set_visitor_name', 'John Doe')`

## Set visitor email

Sets the Visitor e-mail address

#### Example

`LiveChatWidget.call('set_visitor_email', 'john@example.com')`
