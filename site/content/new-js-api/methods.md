---
weight: 20
---

# Methods

To change the visibility of the Chat Widget, you can use the following methods:

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

It hides the Chat Widget on the site.
You will need to use either 'maximize' or 'minimze' API calls to show it afterwards.

#### Example

`LiveChatWidget.call('hide')`

## Destroy

Destroys the Chat Widget.
It won't be available for further actions until the window is refreshed.

#### Example

`LiveChatWidget.call('destroy')`
