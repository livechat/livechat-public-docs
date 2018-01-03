# Tracking code

```js
<script type="text/javascript">
window.__lc = window.__lc || {};

/**
 * LiveChat license number
 */
window.__lc.license = 123456;

/**
 * Chat window group (defaults to "0").
 * You can divide LiveChat agents into different departments,
 * such as "Billing" or "Support".
 * For example, if this parameter will point to group "Billing",
 * all visitors entering the chat will talk with agents
 * from this group and not the "Support" group.
 *
 * Create your group in LiveChat app:
 * https://my.livechatinc.com/agents/groups
 */
window.__lc.group = 1;

/**
 * By default, visitor's browsing history is remembered
 * across different groups.
 *
 * If you don't want to display visitor's browsing history
 * across different groups, use the following code.
 *
 * Using this parameter is not recommended when 
 * using target field in the pre-chat survey.
 */
window.__lc.chat_between_groups = false;

/**
 * By default, our tracking code strores LiveChat related data
 * in the Google Analytics gaq - traditional asynchronous
 * code for Google Analytics. 
 *
 * If you are using a different type of Google Analytics,
 * you can decide which one LiveChat should track.
 *
 * The available options are:
 * ga – Universal Analytics;
 * gtm – Google Tag Manager;
 * gtag – Global Site Tag (gtag.js);
 * gaq – traditional asynchronous code for Google Analytics.
 */
window.__lc.ga_version = 'ga';

/**
 * Visitor's data. If your visitor is already logged in
 * to your system, you can pass his name and e-mail to LiveChat apps.
 * Agents will see the information on the "Visitors" list
 * and in the Archives.
 */
window.__lc.visitor = {
  name: 'Joe Public',
  email: 'joe.public@gmail.com'
};

/**
 * Custom variables sent to LiveChat applications.
 * These can be your visitor's account ID, login
 * or any other information that is important for
 * LiveChat agent during the chat.
 *
 * "name"  can be max 500 characters long.
 * "value" can be max 3500 characters long.
 */
window.__lc.params = [
  { name: 'Login', value: 'joe_public' },
  { name: 'Account ID', value: 'ABCD1234' },
  { name: 'Total order value', value: '$123' }
];

(function() {
  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
  lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();
</script>
```

LiveChat tracking code is available in the [LiveChat app](https://my.livechatinc.com/settings/code).

You can customize the tracking code to send additional information about your visitors to LiveChat applications.
