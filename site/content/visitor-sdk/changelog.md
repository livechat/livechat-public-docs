---
weight: 50
---

# Changelog

Subscribe to [LiveChat Developers Newsletter](http://eepurl.com/V75-9) to be
notified about changes in Visitor SDK.

#### [v0.34.0] - 19.03.2018

##### Added

* Added getPredictedAgent method

##### Fixed

* Fixed getPrechatForm method documentation - error description

#### [v0.33.3] - 8.03.2018

##### Fixed

* Fix sendTicketForm method - incorrect data passed to request

#### [v0.33.2] - 6.03.2018

##### Fixed

* Fix sendPrechatForm method - incorrect answers bug

#### [v0.33.1] - 27.02.2018

##### Fixed

* Fix sendMessage method - reject promise if chat is offline

#### [v0.33.0] - 26.02.2018

##### Added

* Added getPrechatForm method
* Added sendPrechatForm method

#### [v0.32.0] - 16.02.2018

##### Added

* Added [new_invitation](https://www.livechatinc.com/features/engaging-customers/#Automatic-greetings) callback

##### Fixed

* Fix documentation - npm installation code snippet

#### [v0.31.3] - 31.01.2018

##### Fixed

* Fix fielsharing bug - use correct chat id after starting a new chat again

#### [v0.31.2] - 30.01.2018

##### Fixed

* Fix group init parameter

#### [v0.31.1] - 25.01.2018

##### Fixed

* sendFile method - correct server address
* fix URL rules - correct visitor's current URL detection

#### [v0.31.0] - 9.01.2018

##### Added

* Added sendFile method

#### [v0.30.0] - 3.01.2018

##### Added

* Support [Data Centers in Europe](https://www.livechatinc.com/features/security/data-center-in-europe/)

#### [v0.29.2] - 28.12.2017

##### Fixed

* Docs fix - correct date in changelog

#### [v0.29.0] - 28.12.2017

##### Added

* Added chat_rated callback
* Added [URL rules](https://www.livechatinc.com/kb/setting-up-url-rules-for-groups/) support

##### Fixed

* sendMessage parameter "customId" now parsed to string by default

#### [v0.28.4] - 27.11.2017

##### Fixed

* Fixed docs

#### [v0.28.3] - 22.11.2017

##### Fixed

* Fixed npm build Safari support

#### [v0.28.2] - 22.11.2017

##### Fixed

* Fixed iOS Safari support

##### Changed

* New reject type for setVisitorData method: "connection"

#### [v0.28.1] - 30.10.2017

##### Fixed

* Fixed npm build

#### [v0.28.0] - 30.10.2017

##### Added

* Added destroy method

##### Changed

* Added customId parameter to new_message callback's data

#### [v0.27.1] - 30.10.2017

##### Fixed

* Adjust docs according to
  [Docs Changelog Guidelines](https://github.com/livechat/docs-templates/blob/master/docs-changelog-guidelines.md)

#### [v0.27.0] - 16.10.2017

##### Added

* Added getVisitorData method

##### Changed

* setVisitorData method: Added possibility to set customProperties

#### [v0.0.26] - 13.10.2017

##### Added

* Added getTicketForm method
* Added sendTicketForm method

##### Fixed

* Fixed error handling

##### Changed

* setVistiorData method renamed to setVisitorData

#### [v0.0.25] - 03.10.2017

##### Added

* Added disconnect method

#### [v0.0.24] - 12.09.2017

##### Added

* Added iOS React Native sample app to Examples

#### [v0.0.23] - 11.09.2017

##### Added

* Added visitor_data callback

#### [v0.0.22] - 07.09.2017

##### Added

* Support for non-browser environments

#### [v0.0.21] - 06.09.2017

##### Added

* Added closeChat method

#### [v0.0.20] - 05.09.2017

##### Fixed

* Fix npm package - add all dependencies

#### [v0.0.19] - 31.08.2017

##### Added

* Added forwardChatTranscript method

#### [v0.0.18] - 30.08.2017

##### Added

* Added setSneakPeek method

#### [v0.0.17] - 29.08.2017

##### Added

* Added rateChat method
* Added changelog section

#### [v0.0.16] - 24.08.2017

##### Fixed

* Docs fixes - correct method names

#### [v0.0.15] - 24.08.2017

First public Release
