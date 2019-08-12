---
weight: 40
---

# Setters

Various data can be sent over to the LiveChat integration so that your Agents can use it.
For more information, you can read these articles in our Help Center: https://www.livechatinc.com/help/custom-variables-configuration/

Available setters:

- [Set session variables](#set-session-variables)
- [Update session variables](#update-session-variables)
- [Set visitor name](#set-visitor-name)
- [Set visitor email](#set-visitor-email)

## Set session variables

Creates new session variables, or replaces the ones set previously.

`LiveChatWidget.call('set_session_variables', { username: 'john.doe', cart_value:'450' })`

## Update session variables

Changes the values of your session variables.
Please note that the existing variables won't be replaced. The new session variables will be included together with the ones set previously.

#### Example

`LiveChatWidget.call('update_session_variables', { username: 'j.doe', cart_value:'400' })`

## Set visitor name

Sets the Visitor's name.

#### Example

`LiveChatWidget.call('set_visitor_name', 'John Doe')`

## Set visitor email

Sets the Visitor's e-mail address.

#### Example

`LiveChatWidget.call('set_visitor_email', 'john@example.com')`
