---
weight: 20
---

# Methods

You can use the following methods to change the visibility of the Chat Widget.

Available methods:

- [Maximize](#maximize)
- [Minimize](#minimize)
- [Hide](#hide)
- [Destroy](#destroy)

## Maximize

Maximizes the Chat Widget.

#### Example

`LiveChatWidget.call('maximize')`

## Minimize

Minimizes the Chat Widget.

#### Example

`LiveChatWidget.call('minimize')`

## Hide

Hides the Chat Widget from the site.
You will need to use another API call to show it afterwards.

#### Example

`LiveChatWidget.call('hide')`

## Destroy

Destroys the Chat Widget.
It won't be available for further actions until the window is refreshed.

#### Example

`LiveChatWidget.call('destroy')`
