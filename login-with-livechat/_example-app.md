# Example app
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body>

<h1>Hello, world!</h1>
<div class="livechat-login-button"></div>
<div id="license"></div>

<script src="//cdn.livechatinc.com/accounts/accounts-sdk.min.js"></script>
<script>
AccountsSDK.init({
  clientId: '<your_client_id>',
  onIdentityFetched: function(error, data) {
    if (data) {
      document.getElementById('license').innerText = data.license;
    }
  }
});
</script>
</body>
</html>
```
This example app displays LiveChat user's license number when user clicks the "Sign in with LiveChat" button.
