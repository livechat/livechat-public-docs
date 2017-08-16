# Introduction

## User flow

"Sign in with LiveChat" flow is the easiest way to get access to basic information about LiveChat users. It allows you to quickly build an app that can access different parts of LiveChat account.

User starts the flow by clicking the following button:

<img src="../__images/sign-in-with-livechat/flow-1.png" width="400" style="margin-top: 20px; border: 1px solid #ddd;"/>

If user is not signed in to LiveChat, he is asked to sign in:

<img src="../__images/sign-in-with-livechat/flow-2.png" width="690" style="margin-top: 20px; border: 1px solid #ddd;"/>

Then, user must allow the app to access some parts of his account:

<img src="../__images/sign-in-with-livechat/flow-3.png" width="690" style="margin-top: 20px; border: 1px solid #ddd;"/>

Finally, the app receives `access_token` that lets it perform REST API calls, limited to what the user agreed on. For example, you can display LiveChat tracking code which already includes user's account number:

<img src="../__images/sign-in-with-livechat/flow-4.png" width="490" style="margin-top: 20px; border: 1px solid #ddd;"/>

## Use cases

With "Sign in with LiveChat" flow, you can easily build an app which:

* has access to LiveChat user's email or license number,
* will receive `access_token` that can be used to make different <a href="/rest-api">REST API</a> calls.
