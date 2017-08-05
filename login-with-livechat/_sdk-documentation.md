# SDK documentation

| Method name | Properties list | Description |
|-------------|-----------------|-------------|
| `init` | `client_id`   | You can get your `client_id` from the [Developers Console](https://developers.livechatinc.com/console/) where you must create the app with `livechat_login_app` type. |
| | `onIdentityFetched(error, data)` | This method is called when user's identity is fetched.<br><br>If the user is not logged in to LiveChat, `data` param will be `null` and `error` param will include the following properties:<ul><li>**identity_exception** - error description. Possible values: ``invalid_request``, ``unauthorized``, ``server_error``, ``access_denied``, ``identity_lost``, ``credentials_login_disabled``</li></ul><br><br>If the user is logged in, `error` param will be null and `data` param will include the following data: <ul><li>**access_token** - used for authorization in REST API calls</li><li>**scopes** - array of scopes that ``access_token`` has access to</li><li>**expires_in** - number of seconds from now ``access_token`` is valid</li><li>**entity_id** - LiveChat's user email</li><li>**license** - LiveChat license number</li></ul> |
| `openPopup` | | Binds `onclick` param for custom HTML `<a>` element that replaces the "Login with LiveChat" button. |
| `displayButtons` | | Renders "Login with LiveChat" buttons once again in the pag DOM. Helpful when you reload the app's state and DOM is cleared.<br><br>This method is automatically invoked by the `init` method. |
