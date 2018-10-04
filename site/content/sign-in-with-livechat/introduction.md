---
weight: 10
---

# Introduction

## User flow

"Sign in with LiveChat" flow is the easiest way to get access to basic information in LiveChat accounts. It allows you to quickly build an app that can access this information.

User starts the flow by clicking the "Sign in with LiveChat" button:

<img src="../assets/images/sign-in-with-livechat/flow-1.png" width="400" style="margin-top: 20px; border: 1px solid #ddd;"/>

If user is not signed in to LiveChat, he is asked to do that:

<img src="../assets/images/sign-in-with-livechat/flow-2.png" width="690" style="margin-top: 20px; border: 1px solid #ddd;"/>

Then, user must allow the app to access specified parts of his LiveChat account:

<img src="../assets/images/sign-in-with-livechat/flow-3.png" width="690" style="margin-top: 20px; border: 1px solid #ddd;"/>

Finally, the app receives an `access_token` that allows it perform REST API calls, limited to what the user agreed to in the prompt.

For example, you can display LiveChat tracking code which already includes the user's account number:

<img src="../assets/images/sign-in-with-livechat/flow-4.png" width="490" style="margin-top: 20px; border: 1px solid #ddd;"/>

## Use cases

With the "Sign in with LiveChat" flow, you can easily build an app which:

* obtains access to LiveChat user's email or license number,
* will receive an `access_token` that can be used to perform different <a href="/rest-api">REST API</a> calls.
