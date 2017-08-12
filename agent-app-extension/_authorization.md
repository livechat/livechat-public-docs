# Authorization

If you need to somehow authorize the user of your extension, you can follow the following flow.

> <b>1.</b> First, the extension content is requested by the Agent App. A basic HTTPS GET request is sent.

> <b>2.</b> Within the body of your extension, you should call the `LiveChat.init();` method once the extension is loaded. This will tell the Agent App to start the initialization.

> <b>3.</b> In return, the Agent App sends a HTTPS POST request to `https://your_ext_url/authorize/`. Note that this path is non-configurable. Within the body of the post, you'll find two keys:

```json-doc
{
    "login": agent@email.com,    // current LiveChat user email address
    "api_key": <agent_api_key>   // current LiveChat API key
}
```

> <b>4.</b> You can now create a custom authorization logic (e.g. request external services, define scopes for your user, etc.)

> <b>5.</b> In order to complete the flow, you should respond with a JSON response:

```json-doc
{
    "session_id": 12345          // any string or value
}

```

<img src="../__images/agent-app-extension-auth-1.svg" width="450" style="margin-top: 20px;"/>

When the basic authorization flow is completed, you can use the `LiveChat.on("event", ... )` method to catch the incoming events.

> After a successful initialization, the Agent App should remove the spinner, display the content of your extension and push an `authorize` event via postMessage.

> You can listen to `authorize` and `authorize_error` to catch the result of the authorization flow and, for instance, to display adequate information.

> You should now receive events from the Agent App. Check out the [JavaScript API events](#events).

<img src="../__images/agent-app-extension-auth-2.svg" width="450" style="margin-top: 20px;"/>