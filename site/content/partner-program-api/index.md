---
seo_title: "API — LiveChat Partner Program"
seo_description: "Getting started with LiveChat Partners API. See our API documentation to make the best use of the partnership."
title: "API"
---
# About
LiveChat Partner Program API allows you to build your own tools that will help you make a better use of your data. It’s 100% open, so it’s up to you what you create.

#### URL
`https://api.livechatinc.com`

#### Status
`GET /v2/partners/status` - check if API is running

#### Response
* `200 - OK`
* everything else - API has some issues

## Authorization

>Request example:

```shell
curl --request GET \
    --url https://api.livechatinc.com/v2/partners \
    --header 'Authorization: Bearer <YOUR_API_TOKEN>'
```

Each API request requires authorization header to identify the Partner. Authorization is provided by unique API token.

You can create your token in the [API tokens section](https://partners.livechatinc.com/dashboard/account/tokens) in Dashboard.

# Account

## Get Profile

>Response example:

```json
{
    "partner_id": "xyz",
    "login": "joe@email.com",
    "first_name": "Joe",
    "last_name": "Doe",
    "contact_name": "Jane Doe",
    "contact_email": "jane@email.com",
    "send_monthly_summary": true,
    "send_newsletter": true,
    "send_notifications": true,
    "send_reseller_weekly_summary": true,
    "affiliate": {
        "livechat": {
            "url": "https://www.livechatinc.com/?a=xyz&utm_source=PP",
            "short_url": "https://lc.chat/zxc",
            "current_commission": {
                "percent": 20,
                "end_timestamp": ""
            },
        },
        "livechat_partner_program": {
            "url": "https://partners.livechatinc.com/?a=xyz&utm_source=PP",
            "short_url": "https://lc.chat/cxz",
            "current_commission": {
                "percent": 5,
                "end_timestamp": ""
            },
        }
    },
    "reseller": {
        "current_discount": {
            "percent": 20,
            "end_timestamp": ""
        }
    },
    "expert": {
        "status": "verified",
        "marketplace_position": 2
    },
    "properties": {
        "sales_kit_popup_closed": true,
        "pitch_deck_downloaded": true,
        "tier2_popup_closed": true
    }
}
```

`GET /v2/partners` - get profile info

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


## Update Profile
`PUT /v2/partners` - edit profile info

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Payload
* `first_name` - **required** - first name
* `last_name` - **required** - last name
* `contact_name` - **required** - contact name
* `contact_email` - **required** - contact email
* `send_monthly_summary` - optional - `boolean` value
* `send_reseller_weekly_summary` - optional - `boolean` value
* `send_newsletter` - optional - `boolean` value
* `send_notifications` - optional - `boolean` value

#### Response
* `200 - OK`
* `400 - Bad Request` - missing or incorrect payload parameters
* `401 - Unauthorized` - missing or incorrect authorization header


## Change Password
`PUT /v2/partners/password` - change password to your account

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Payload
* `current_password` - **required** - current password
* `new_password` - **required** - new password (min. 6 characters)

#### Response
* `200 - OK`
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - incorrect current password


## Get the Number of Active Licenses

>Response example:

```json
{
    "affiliate": {
        "livechat": {
            "trials": 231,
            "trials_cc": 45,
            "paid": 92
        },
        "livechat_partner_program": {
            "leads": 15,
            "trials": 120,
            "trials_cc": 84,
            "paid": 103
        }
    },
    "reseller": {
        "trials": 177,
        "trials_cc": 45,
        "paid": 59
    }
}
```

`GET /v2/partners/active-licenses` - **DEPRECATED**

`GET /v2/partners/stats` - get the number of active affiliate/reseller trials, trials with credit card and paid licenses


#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


## Get Earnings

>Response example:

```json
{
    "balance": 200,
    "blocked": 0,
    "commission_total": 7316,
    "commission_last_30_days": 1380,
    "withdrawals": 7116,
    "pending": 0,
    "affiliate": {
        "commission_total": 7316,
        "commission_last_30_days": 1380,
        "livechat": {
            "commission_total": 7316,
            "commission_last_30_days": 1380,
        },
        "livechat_partner_program": {
            "commission_total": 0,
            "commission_last_30_days": 0,
        }
    },
    "reseller": {
        "commission_total": 0,
        "commission_last_30_days": 0,
        "livechat": {
                "discount": 2060,
                "commission_total": 0,
                "commission_last_30_days": 0,
        }
    }
}
```

`GET /v2/partners/earnings` - get earnings (affiliate commission, balance, blocked amount, pending amount, withdrawals and total reseller discount)

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


## Create API Token

>Response example:

```json
{
    "id": 1,
    "token": "secret_token_qwerty...",
    "creation_timestamp": "2018-03-06 15:14:26",
    "label": "My first API token"
}
```

`POST /v2/partners/tokens` - create new API token

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Payload
* `label` - **required** - label for the token (min. 3 characters)

#### Response
* `201 - Created` - newly created token
* `400 - Bad Request` - incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `409 - Conflict` - given label was already taken

## Get API Token List

>Response example:

```json
{
    "result": [
        {
            "id": 2,
            "token": "secret_token_xyz...",
            "creation_timestamp": "2018-03-06 17:14:26",
            "label": "Token for my service"
        },
        {
            "id": 1,
            "token": "secret_token_qwerty...",
            "creation_timestamp": "2018-03-06 15:14:26",
            "label": "My first API token"
        }
    ]
}
```

`GET /v2/partners/tokens` - get list of active API tokens

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


## Revoke API Token
`DELETE /v2/partners/tokens/<id>` - revoke API token

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Parameters
* `<id>` - **required** - token ID

#### Response
* `200 - OK`
* `400 - Bad Request` - incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header


## Get Billing

>Response example:

```json
{
    "company": "Awesome Company",
    "vat": "123",
    "address": "Wall Street 123",
    "city": "New York",
    "zip_code": "10005",
    "country": "US",
    "paypal": "paypal@email.com",
    "type": "business"
}
```

`GET /v2/partners/affiliates/billing` - get affiliate billing information

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


## Update Billing
`PUT /v2/partners/affiliates/billing` - update affiliate billing information

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Payload
* `type` - **required** - `business` or `individual`
* `company` - **required** - company name (business) or full name (individual)
* `address` - **required**
* `city` - **required**
* `country` - **required** - country code, one of [these](https://api.livechatinc.com/v2/partners/data/countries)
* `paypal` - **required** - PayPal login (email)
* `zip_code` - optional - ZIP / Postal code
* `vat` - optional - VAT

#### Response
* `200 - OK`
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header

## Get Active Coupons

>Response example:

```json
{
    "result": [
        {
            "id": 1,
            "label": "30% off first payment"
        },
        {
            "id": 2,
            "label": "$25 discount"
        }
    ]
}
```

`GET /v2/partners/coupons` - get active coupons

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


# Affiliate Partner

## LiveChat

### Create Campaign

>Response example:

```json
{
    "name": "New campaign",
    "slug": "pp_new-campaign",
    "trial_duration": 45,
    "discount": "Active",
    "url": "https://www.livechatinc.com/features/?a=xyz&utm_campaign=pp_new-campaign",
    "short_url": "https://lc.chat/abc",
    "creation_timestamp": "2018-03-06 11:30:40"
}
```
>Note: **`slug`** is a URL-friendly campaign name with **`pp_`** prefix

`POST /v2/partners/affiliates/campaigns` - **DEPRECATED**

`POST /v2/partners/affiliates/livechat/campaigns` - create new campaign

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Payload
* `name` - **required** - campaign name (min. 5, max. 100 characters)
* `trial_duration` - **required** - days of trial period (min. 14, max. 60)
* `coupon_id` - optional - ID of the coupon assigned to partner (will apply a discount)
* `link` - optional - slug of LiveChat page. If you want the campaign to point end-user to https://www.livechatinc.com/features/, set `link` param to `features/` (we will add `https://www.livechatinc.com/` automatically)

#### Response
* `201 - Created` - newly created campaign
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - not allowed to use given `coupon_id`
* `409 - Conflict` - campaign with given name already exists


### Disable Campaign
`DELETE /v2/partners/affiliates/campaigns/<slug>` - **DEPRECATED**

`DELETE /v2/partners/affiliates/livechat/campaigns/<slug>` - disable campaign

#### Parameters
* `<slug>` - **required** - campaign's slug

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `400 - Bad Request` - incorrect parameter
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - given campaign doesn't exist or was already disabled


### Get Active Campaigns

>Response example:

```json
{
    "result": [
        {
            "name": "Hello World!",
            "slug": "pp_hello-world",
            "trial_duration": 14,
            "discount": "30% off first payment",
            "url": "https://www.livechatinc.com/pricing/?a=xyz&utm_campaign=pp_hello-world&utm_source=PP",
            "short_url": "https://lc.chat/abc",
            "creation_timestamp": "2018-03-06 23:42:19"
        },
        {
            "name": "Another campaign",
            "slug": "pp_another-campaign",
            "trial_duration": 45,
            "discount": "",
            "url": "https://www.livechatinc.com/?a=xyz&utm_campaign=pp_another-campaign&utm_source=PP",
            "short_url": "https://lc.chat/xyz",
            "creation_timestamp": "2018-03-05 14:03:31"
        }
    ]
}
```
>Note: **`slug`** is a URL-friendly campaign name with **`pp_`** prefix

`GET /v2/partners/affiliates/campaigns/active` - **DEPRECATED**

`GET /v2/partners/affiliates/livechat/campaigns/active` - get active campaigns

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


### Get Disabled Campaigns

>Response example:

```json
{
    "result": [
        {
            "name": "Another campaign",
            "slug": "pp_another-campaign",
            "trial_duration": 45,
            "discount": "",
            "creation_timestamp": "2018-02-02 08:12:17",
            "disabled_timestamp": "2018-03-01 17:07:46"
        }
    ]
}
```
>Note: **`slug`** is a URL-friendly campaign name with **`pp_`** prefix

`GET /v2/partners/affiliates/campaigns/disabled` - **DEPRECATED**

`GET /v2/partners/affiliates/livechat/campaigns/disabled` - get disabled campaigns

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


### Get Licenses List

>Response example:

```json
{
    "result": [
        {
            "client_email": "w...n@l...c",
            "creation_timestamp": "2018-03-01 16:11:26",
            "end_timestamp": "2018-03-30 16:11:25",
            "cc_added": false,
            "paid": false,
            "seats": 100,
            "plan": "team",
            "billing_cycle": "monthly",
            "chat_installed": false,
            "conversations": 0,
            "total_commission": 0,
            "commission_percent": 20,
            "utm_medium": "banner",
            "utm_content": "",
            "utm_term": "",
            "campaign_name": "default_link",
            "blocked": false
        },
        {
            "client_email": "j...e@e...m",
            "creation_timestamp": "2018-01-29 16:30:03",
            "end_timestamp": "2019-01-27 16:30:03",
            "cc_added": true,
            "paid": true,
            "seats": 10,
            "plan": "business",
            "billing_cycle": "annual",
            "chat_installed": true,
            "conversations": 10,
            "total_commission": 1200,
            "commission_percent": 20,
            "utm_medium": "header_link",
            "utm_content": "",
            "utm_term": "",
            "campaign_name": "promo_campaign",
            "blocked": false,
        }
    ]
}
```

`GET /v2/partners/affiliates/licenses` - **DEPRECATED**

`GET /v2/partners/affiliates/livechat/licenses` - get affiliates licenses

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Query parameters
* `date_from` - optional - get licenses created from a given date
* `date_to` - optional - get licenses created to a given date

**Note:** Date format: `YYYY-MM-DD`

#### Response
* `200 - OK`
* `400 - Bad Request` - incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header


### Get Performance Report

>Response example:

```json
{
    "result": [
        {
            "campaign": "My campaign",
            "medium": "banner",
            "content": "v29",
            "term": "",
            "clicks": 100,
            "trials": 50,
            "trial_percent": 50,
            "paid": 10,
            "paid_percent": 20,
            "commission": 178.45,
            "chat_installations": 34,
            "aha": 27
        },
        {
            "campaign": "My other campaign",
            "medium": "screenshot",
            "content": "v3",
            "term": "keyword",
            "clicks": 50,
            "trials": 20,
            "trial_percent": 40,
            "paid": 10,
            "paid_percent": 50,
            "commission": 35,
            "chat_installations": 16,
            "aha": 12
        }
    ]
}
```
>Note: **`chat_installations`** is a number of _Qualified Leads_ - trial licenses with code attached to websites (more likely to convert); **`aha`** is a number of _Qualified Leads_ that had at least 10 chats (very likely to convert - _AHA moment_).

`GET /v2/partners/affiliates/performance` - **DEPRECATED**

`GET /v2/partners/affiliates/livechat/performance` - get LiveChat affiliate performance report

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Query parameters
* `date_from` - optional - get report for licenses created from a given date
* `date_to` - optional - get report for licenses created to a given date

**Note:** Date format: `YYYY-MM-DD`

#### Response
* `200 - OK`
* `400 - Bad Request` - incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header


### Get Affiliate History

>Response example:

```json
{
    "result": [
        {
            "date": "2018-03",
            "trials": 11,
            "paid": 50,
            "commission": 501.6
        },
        {
            "date": "2018-02",
            "trials": 23,
            "paid": 32,
            "commission": 230.35
        },
        {
            "date": "2018-01",
            "trials": 35,
            "paid": 41,
            "commission": 124.8
        }
    ]
}
```

`GET /v2/partners/affiliates/history` - **DEPRECATED**

`GET /v2/partners/affiliates/livechat/history` - get historical stats for LiveChat affiliate activity (up to last 12 months)

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


## Partner Program

### Create Campaign

>Response example:

```json
{
    "name": "New campaign",
    "slug": "pp_new-campaign",
    "url": "https://partners.livechatinc.com/blog/?a=xyz&utm_campaign=pp_new-campaign&utm_source=PP",
    "short_url": "https://lc.chat/abc",
    "creation_timestamp": "2018-03-06 11:30:40"
}
```
>Note: **`slug`** is a URL-friendly campaign name with **`pp_`** prefix

`POST /v2/partners/affiliates/livechat-partner-program/campaigns` - create new campaign

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Payload
* `name` - **required** - campaign name (min. 5, max. 100 characters)
* `link` - optional - slug of Partner Program page. If you want the campaign to point end-user to https://partners.livechatinc.com/blog/, set `link` param to `blog/` (we will add `https://partners.livechatinc.com/` automatically)

#### Response
* `201 - Created` - newly created campaign
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `409 - Conflict` - campaign with given name already exists


### Disable Campaign

`DELETE /v2/partners/affiliates/livechat-partner-program/campaigns/<slug>` - disable campaign

#### Parameters
* `<slug>` - **required** - campaign's slug

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `400 - Bad Request` - incorrect parameter
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - given campaign doesn't exist or was already disabled


### Get Active Campaigns

>Response example:

```json
{
    "result": [
        {
            "name": "New campaign",
            "slug": "pp_new-campaign",
            "url": "https://partners.livechatinc.com/blog/?a=xyz&utm_campaign=pp_new-campaign&utm_source=PP",
            "short_url": "https://lc.chat/abc",
            "creation_timestamp": "2018-03-06 23:42:19"
        },
        {
            "name": "Another campaign",
            "slug": "pp_another-campaign",
            "url": "https://partners.livechatinc.com/?a=xyz&utm_campaign=pp_another-campaign&utm_source=PP",
            "short_url": "https://lc.chat/efg",
            "creation_timestamp": "2018-03-05 14:03:31"
        }
    ]
}
```
>Note: **`slug`** is a URL-friendly campaign name with **`pp_`** prefix

`GET /v2/partners/affiliates/livechat-partner-program/campaigns/active` - get active campaigns

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


### Get Disabled Campaigns

>Response example:

```json
{
    "result": [
        {
            "name": "Another campaign",
            "slug": "pp_another-campaign",
            "creation_timestamp": "2018-02-02 08:12:17",
            "disabled_timestamp": "2018-03-01 17:07:46"
        }
    ]
}
```
>Note: **`slug`** is a URL-friendly campaign name with **`pp_`** prefix

`GET /v2/partners/affiliates/livechat-partner-program/campaigns/disabled` - get disabled campaigns

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


### Get Leads List

>Response example:

```json
{
	"result": [
		{
			"partner_id": "xyz",
			"creation_timestamp": "2019-02-25 09:42:22",
			"medium": "medium",
			"content": "content",
			"term": "term",
			"campaign": "new-campaign",
			"active_trials": 0,
			"active_trials_cc_added": 0,
			"total_trials": 0,
			"active_paid": 0,
			"total_paid": 0,
			"commission": 0
		},
	    {
			"partner_id": "abc",
			"creation_timestamp": "2018-10-15 14:47:42",
			"medium": "",
			"content": "",
			"term": "",
			"campaign": "",
			"active_trials": 0,
			"active_trials_cc_added": 0,
			"total_trials": 2,
			"active_paid": 2,
			"total_paid": 2,
			"commission": 945.75
		}
	]
}
```

`GET /v2/partners/affiliates/livechat-partner-program/leads` - get Partner Program Leads' List

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


### Get Leads Licenses

>Response example:

```json
{
	"result": [
		{
			"creation_timestamp": "2018-12-14 13:21:21",
			"end_timestamp": "2019-06-13 23:59:59",
			"cc_added": true,
			"paid": true,
			"seats": 1,
			"plan": "team",
			"billing_cycle": "monthly",
			"chat_installed": false,
			"conversations": 0,
			"total_commission": 48.75,
			"commission_percent": 5,
			"blocked": false
		},
		{
			"creation_timestamp": "2018-10-15 14:58:58",
			"end_timestamp": "2018-11-14 12:58:57",
			"cc_added": false,
			"paid": false,
			"seats": 100,
			"plan": "team",
			"billing_cycle": "monthly",
			"chat_installed": false,
			"conversations": 0,
			"total_commission": 0,
			"commission_percent": 10,
			"blocked": false
		}
	]
}
```

`GET /v2/partners/affiliates/livechat-partner-program/licenses` - get Partner Program Leads' licenses

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Query parameters
* `date_from` - optional - get licenses created from a given date
* `date_to` - optional - get licenses created to a given date

**Note:** Date format: `YYYY-MM-DD`

#### Response
* `200 - OK`
* `400 - Bad Request` - incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header


### Get Performance Report

>Response example:

```json
{
    "result": [
        {
            "campaign": "",
            "medium": "",
            "content": "",
            "term": "",
            "clicks": 3,
            "leads": 3,
            "trials": 2,
            "paid": 2,
            "commission": 945.75
        },
        {
            "campaign": "",
            "medium": "medium",
            "content": "content",
            "term": "term",
            "clicks": 4,
            "leads": 1,
            "trials": 0,
            "paid": 0,
            "commission": 0
        },
    ]
}
```

`GET /v2/partners/affiliates/livechat-partner-program/performance` - get Partner Program affiliate performance report

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Query parameters
* `date_from` - optional - get report for licenses created from a given date
* `date_to` - optional - get report for licenses created to a given date

**Note:** Date format: `YYYY-MM-DD`

#### Response
* `200 - OK`
* `400 - Bad Request` - incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header


### Get Leads History

>Response example:

```json
{
    "result": [
        {
            "date": "2019-03",
            "trials": 13,
            "paid": 2,
            "commission": 454.50,
            "leads": 2
        },
        {
            "date": "2019-02",
            "trials": 4,
            "paid": 1,
            "commission": 157.95,
            "leads": 1
        },
        {
            "date": "2019-01",
            "trials": 1,
            "paid": 0,
            "commission": 0,
            "leads": 1
        }
    ]
}
```

`GET /v2/partners/affiliates/livechat-partner-program/history` - get historical stats for Partner Program Leads activity (up to last 12 months)

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


# Solution Partner

## Create License

>Response example:

```json
{
    "license": "123",
    "client_name": "Joe Doe",
    "client_email": "joe@example.com",
    "purchase_order": "Test license",
    "creation_timestamp": "2018-03-06 12:59:13",
    "end_timestamp": "2018-04-05 11:59:12",
    "cc_added": true,
    "paid": true,
    "seats": 100,
    "plan": "team",
    "billing_cycle": "monthly",
    "total_discount": 0,
    "discount_percent": 0,
    "expired": false,
    "blocked": false,
    "payment_origin": "client",
    "conversations": 403,
    "conversations_last_30_days": 195,
    "total_commission": 125,
    "commission_percent": 20,
    "data_center": "fra",
    "recurly": {
        "subscriber": false,
        "in_trial": true,
        "recurrent": false
    }
}
```

`POST /v2/partners/resellers/licenses` - **DEPRECATED**
`POST /v2/partners/solutions/licenses` - create new license for a client

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Payload
* `client_name` - **required** - client's full name (min. 5, max. 100 characters)
* `client_email` - **required** - client's email address
* `payment_origin` - **required** - subscription's payment management, one of `partner` or `client`
* `trial_duration` - optional - days of trial period (min. 14, max. 60), applied when `payment_origin="client"`
* `coupon_id` - optional - coupon id applied when `payment_origin="client"`
* `data_center` - optional - your client's data storage center, one of `dal` or `fra`
* `purchase_order` - optional - custom parameter

**Note:** Data center: `dal` - Dallas (US), `fra` - Frankfurt (EU). Default value of `data_center` is `dal`.

#### Response
* `201 - Created`
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - `coupon_id` is incorrect
* `409 - Conflict` - given `client_email` already has a LiveChat license


## Get License (Client) List

>Response example:

```json
{
    "result": [
        {
            "license": "123",
            "client_name": "Joe Doe",
            "client_email": "joe@example.com",
            "purchase_order": "Test license",
            "creation_timestamp": "2019-03-06 12:59:13",
            "end_timestamp": "2020-04-05 11:59:12",
            "cc_added": true,
            "paid": true,
            "seats": 12,
            "plan": "team",
            "billing_cycle": "monthly",
            "total_discount": 0,
            "discount_percent": 0,
            "expired": false,
            "blocked": false,
            "payment_origin": "client",
            "conversations": 403,
            "conversations_last_30_days": 195,
            "total_commission": 125,
            "commission_percent": 20,
            "data_center": "fra"
        }
    ]
}
```

`GET /v2/partners/resellers/licenses` - get license list

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Query parameters
* `date_from` - optional - get report for licenses created from a given date
* `date_to` - optional - get report for licenses created to a given date

**Note:** Date format: `YYYY-MM-DD`

#### Response
* `200 - OK`
* `400 - Bad Request` - incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header


## Get License Details

>Response example:

```json
{
    "license": "123",
    "client_name": "Joe Doe",
    "client_email": "joe@example.com",
    "purchase_order": "Test license",
    "creation_timestamp": "2019-03-06 12:59:13",
    "end_timestamp": "2020-04-05 11:59:12",
    "cc_added": true,
    "paid": true,
    "seats": 12,
    "plan": "team",
    "billing_cycle": "monthly",
    "total_discount": 0,
    "discount_percent": 0,
    "expired": false,
    "blocked": false,
    "payment_origin": "client",
    "conversations": 403,
    "conversations_last_30_days": 195,
    "total_commission": 125,
    "commission_percent": 20,
    "data_center": "fra",
    "recurly": {
        "subscriber": false,
        "in_trial": true,
        "recurrent": false
    }
}
```

`GET /v2/partners/resellers/licenses/<license_id>` - get license details

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Parameters
* `<license_id>` - **required** - license ID

#### Response
* `200 - OK`
* `400 - Bad Request` - missing or incorrect `license_id` parameter
* `401 - Unauthorized` - missing or incorrect authorization header
* `404 - Not Found` - license not found


## Get Licenses Invoice List

>Response example:

```json
{
    "result": [
        {
            "invoice_no": 123,
            "date": "2018-03-03 09:38:33",
            "plan": "team",
            "seats": 10,
            "billing_cycle": "monthly",
            "amount": 312,
            "status": "paid"
        },
        {
            "invoice_no": 122,
            "date": "2018-02-01 09:18:13",
            "plan": "team",
            "seats": 10,
            "billing_cycle": "monthly",
            "amount": 312,
            "status": "paid"
        }
    ]
}
```

`GET /v2/partners/resellers/licenses/<license_id>/invoices` - get license invoices

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Parameters
* `<license_id>` - **required** - license ID

#### Response
* `200 - OK`
* `400 - Bad Request` - missing or incorrect `license_id` parameter
* `401 - Unauthorized` - missing or incorrect authorization header
* `404 - Not Found` - license not found


## Get Licenses Invoice PDF
`GET /v2/partners/resellers/licenses/<license_id>/invoices/<invoice_no>` - get reseller's license invoices.

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Parameters
* `<license_id>` - **required** - license ID
* `<invoice_no>` - **required** - invoice number

#### Response
* `200 - OK` - PDF file (`Content-Type: application/pdf`)
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `404 - Not Found` - license or invoice not found


## Get Solution Partner History

>Response example:

```json
{
    "result": [
        {
            "date": "2018-03",
            "trials": 41,
            "paid": 27,
            "commission": 140
        },
        {
            "date": "2018-02",
            "trials": 35,
            "paid": 38,
            "commission": 250
        },
        {
            "date": "2018-01",
            "trials": 29,
            "paid": 48,
            "commission": 600

        }
    ]
}
```

`GET /v2/partners/resellers/history` - get historical stats for Solution Partner activity (up to last 12 months)

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header


## Create License Subscription
`POST /v2/partners/resellers/licenses/<license_id>/subscription` - create new subscription

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Parameters
* `<license_id>` - **required** - license ID

#### Payload
* `token` - **required** - Recurly token ([get](#get-recurly-token))
* `plan` - **required** - sales plan, one of `starter`, `team` or `business`
* `billing_cycle` - **required** - billing cycle, `monthly` or `annual`
* `seats` - **required** - seats number

#### Response
* `201 - Created`
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `404 - Not Found` - license not found
* `409 - Conflict` - subscription already exists


## Update License Subscription
`PUT /v2/partners/resellers/licenses/<license_id>/subscription` - update subscription

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Parameters
* `<license_id>` - **required** - license ID

#### Payload
* `plan` - **required** - sales plan, one of `starter`, `team` or `business`
* `billing_cycle` - **required** - billing cycle, `monthly` or `annual`
* `seats` - **required** - seats number

#### Response
* `200 - OK`
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `404 - Not Found` - license not found
* `409 - Conflict` - subscription doesn't exist


## Update License Billing
`PUT /v2/partners/resellers/licenses/<license_id>/billing` - update subscription billing information

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Parameters
* `<license_id>` - **required** - license ID

#### Payload
* `token` - **required** - Recurly token ([get](#get-recurly-token))

#### Response
* `200 - OK`
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `404 - Not Found` - license not found


## Get License Operators

>Response example:

```json
{
	"result": [
		{
			"login": "jane@example.com",
			"name": "Jane the Agent",
			"permission": "normal"
		},
		{
			"login": "joe@example.com",
			"name": "Joe",
			"permission": "administrator"
		},
		{
			"login": "john@example.com",
			"name": "John",
			"permission": "owner"
		}
	]
}
```

`GET /v2/partners/solutions/licenses/<license_id>/operators` - get license's owner, admins and agents (only for Solution Partner's licenses where Partner manages subscription)

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Parameters
* `<license_id>` - **required** - license ID

#### Response
* `200 - OK`
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - subscription is not managed by the Partner
* `404 - Not Found` - license not found


## Move License Subscription Management to the Client

>Response example:

```json
{
    "license": "123",
    "client_name": "Joe Doe",
    "client_email": "joe@example.com",
    "purchase_order": "Test license",
    "creation_timestamp": "2019-03-30 12:59:13",
    "end_timestamp": "2019-07-30 11:59:12",
    "cc_added": false,
    "paid": true,
    "seats": 12,
    "plan": "team",
    "billing_cycle": "monthly",
    "total_discount": 0,
    "discount_percent": 0,
    "expired": false,
    "blocked": false,
    "payment_origin": "client",
    "conversations": 403,
    "conversations_last_30_days": 195,
    "total_commission": 0,
    "commission_percent": 20,
    "data_center": "fra"
}
```

`POST /v2/partners/solutions/licenses/<license_id>/move` - move license's subscription management to the client

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Parameters
* `<license_id>` - **required** - license ID

#### Payload
* `new_owner` - **required** - login of desired license owner (one of [operators](#get-license-operators)) - please specify even if operator is already an owner

#### Response
* `200 - OK`
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - subscription is not managed by the Partner
* `404 - Not Found` - license not found


## Close License Subscription
`DELETE /v2/partners/resellers/licenses/<license_id>/subscription` - close subscription

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Parameters
* `<license_id>` - **required** - license ID

#### Payload
* `password` - **required** - password in LiveChat Partner Program
* `expire` - optional - `boolean` value (default: `false`). When closing subscription your license will expire at the end of its billing cycle. To expire your subscription immediately, set `expire` param to `true`.

#### Response
* `200 - OK`
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - password is incorrect
* `404 - Not Found` - license not found


## Get Recurly Token

>Response example:

```json
{
    "id": "B79ibIjbXbqSAhKjxQWERTY"
}
```

`GET https://api.recurly.com/js/v1/token` - get token from Recurly (token is required when creating new subscription or updating existing subscription with new billing info)

#### Parameters
* `key` - **required** - public key (`ewr1-QCXZap10wOSm13fxI4u5Jt`)
* `first_name` - **required** - first name
* `last_name` - **required** - last name
* `number` - **required** - credit card number
* `month` - **required** - credit card expiration month (format: `MM`)
* `year` - **required** - credit card expiration year (format: `YYYY`)
* `verification_value` - **required** - CVV code
* `address2` - **required** - address
* `city` - **required** - city
* `state` - **required** - state
* `zip` - **required** - ZIP/Postal code
* `country` - **required** - country code, one of [these](https://api.livechatinc.com/v2/partners/data/countries)
* `address1` - used as company name
* `vat_number` - company vat number

#### Response
* `200 - OK`
* everything else - missing or incorrect parameters (please read the error message)


# Expert

## Upload Logo

>Response example:

```json
{
    "result": "https://cdn.example.com/expert-logo.png"
}
```

`POST /v2/partners/experts/profile/logo` - upload Expert logo

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Body
* `.jpg` or `.png` image, min. 350x350px, max. 1000x1000px - **required**

#### Response
* `200 - OK` - URL of logo
* `400 - Bad Request` - incorrect file
* `403 - Forbidden` - missing or incorrect authorization token


## Create Expert Profile
`POST /v2/partners/experts/profile` - create Expert profile

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Payload
* `company` - **required** - company name (min. 4 characters)
* `phone` - **required** - phone number
* `description` - **required** - description visible in profile details (min. 10 characters)
* `short_description` - **required** - description visible in expert tile (min. 10 characters)
* `country` - **required** - country code, one of [these](https://api.livechatinc.com/v2/partners/data/countries)
* `website` - **required** - website URL
* `categories` - **required** - an array of categories (codes); [available categories](https://api.livechatinc.com/v2/partners/data/categories/expert)
* `projects` - **required** - an array of projects (URLs)
* `agents` - **required** if one of the categories is `outsourcing-customer-service` or `lead-generation` - number of agents, accepted values: `1-5`, `6-15`, `16-30`, `31-50`, `51+`
* `languages` - **required** if one of the categories is `outsourcing-customer-service` or `lead-generation` - an array of languages (codes); [available languages](https://api.livechatinc.com/v2/partners/data/languages)
* `hour_rate` - optional - minimal hourly rate
* `project_rate` - optional - minimal project rate
* `facebook` - optional - URL to Facebook page
* `twitter` - optional - URL to Twitter page
* `linkedin` - optional - URL to LinkedIn page
* `googleplus` - optional - URL to Google+ page

#### Response
* `200 - OK`
* `400 - Bad Request` - incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - missing logo


## Update Expert Profile
`PUT /v2/partners/experts/profile` - update Expert profile details

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Payload
* `company` - **required** - company name (min. 4 characters)
* `phone` - **required** - phone number
* `description` - **required** - description visible in profile details (min. 10 characters)
* `short_description` - **required** - description visible in expert tile (min. 10 characters)
* `country` - **required** - country code, one of [these](https://api.livechatinc.com/v2/partners/data/countries)
* `website` - **required** - website URL
* `categories` - **required** - an array of categories (codes); [available categories](https://api.livechatinc.com/v2/partners/data/categories/expert)
* `projects` - **required** - an array of projects (URLs)
* `agents` - **required** if one of the categories is `outsourcing-customer-service` or `lead-generation` - number of agents, accepted values: `1-5`, `6-15`, `16-30`, `31-50`, `51+`
* `languages` - **required** if one of the categories is `outsourcing-customer-service` or `lead-generation` - an array of languages (codes); [available languages](https://api.livechatinc.com/v2/partners/data/languages)
* `hour_rate` - optional - minimal hourly rate
* `project_rate` - optional - minimal project rate
* `facebook` - optional - URL to Facebook page
* `twitter` - optional - URL to Twitter page
* `linkedin` - optional - URL to LinkedIn page
* `googleplus` - optional - URL to Google+ page

#### Response
* `200 - OK`
* `400 - Bad Request` - incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - missing logo


## Get Expert Profile

>Response example:

```json
{
    "expert_id": "acme",
    "status": "verified",
    "company": "ACME",
    "phone": "123456789",
    "logo": "https://cdn.example.com/expert-logo.png",
    "description": "long description goes here",
    "short_description": "short description (visible in Marketplace tile)",
    "agents": "5+",
    "hour_rate": "50",
    "project_rate": "500",
    "country": "US",
    "website": "https://partners.livechatinc.com",
    "facebook": "",
    "twitter": "https://twitter/LiveChatProgram",
    "linkedin": "",
    "googleplus": "",
    "categories": [
        "api-and-integrations",
        "chat-customization",
        "chat-strategy-consultancy"
    ],
    "languages": [
        "EN",
        "ES",
        "PL"
    ],
    "projects": [
        "https://example.com",
    ]
}
```

`GET /v2/partners/experts/profile` - get Expert profile details

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `403 - Forbidden` - Partner is not an Expert
* `401 - Unauthorized` - missing or incorrect authorization header


## Get Comments

>Response example:

```json
{
    "result": [
        {
            "comment": "This Expert provides a valuable tool to any online business.",
            "author": "Joe",
            "creation_timestamp":"2018-03-06 10:21:50",
            "website": "https://example.com"
        },
        {
            "comment": "Great company and great people. The product itself is very easy to use. A brilliant service end to end.",
            "author": "Jane",
            "creation_timestamp": "2018-02-22 13:32:28",
            "website": ""
        }
    ]
}
```

`GET /v2/partners/experts/comments` - get comments on Expert's profile

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - Partner is not an Expert


## Get Stats

>Response example:

```json
{
    "position": 1,
    "comments": 18,
    "messages": 132
}
```

`GET /v2/partners/experts/stats` - get stats ([Experts Marketplace](https://www.livechatinc.com/experts-marketplace/) position, number of comments and messages) for Expert profile

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - partner is not an expert


## Get Expert History

>Response example:

```json
{
    "result": [
        {
            "date": "2018-03",
            "profile_views": 123
        },
        {
            "date": "2018-02",
            "profile_views": 212
        },
        {
            "date": "2018-01",
            "profile_views": 286
        }
    ]
}
```

`GET /v2/partners/experts/history` - get historical stats for Expert profile views (up to last 12 months)

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - Partner is not an Expert


# Withdrawals

## Request Withdrawal

>Response example:

```json
{
    "withdrawal_id": 1,
    "request_timestamp": "2019-03-06 12:24:42",
    "action_timestamp": "",
    "status": "pending",
    "amount": 1520,
    "invoice_id": "2019/2/xyz"
}
```

`POST /v2/partners/affiliates/withdrawals` - create withdrawal request

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `201 - Created`
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - not enough money to withdraw (min. $50)
* `409 - Conflict` - billing info not found, please [update billing](#update-billing)


## Get Withdrawal List

>Response example:

```json
{
    "result": [
        {
            "withdrawal_id": 1,
            "request_timestamp": "2018-03-06 12:24:42",
            "action_timestamp": "",
            "status": "pending",
            "amount": 1520,
            "invoice_id": "2019/2/xyz"
        },
        {
            "withdrawal_id": 2,
            "request_timestamp": "2018-02-02 11:43:37",
            "action_timestamp": "2018-02-02 12:04:11",
            "status": "paid",
            "amount": 1063.3,
            "invoice_id": "2018/9/xyz"
        }
    ]
}
```

`GET /v2/partners/affiliates/withdrawals` - get affiliate withdrawals

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Query parameters
* `date_from` - optional - get report for withdrawals from a given date
* `date_to` - optional - get report for withdrawals to a given date

**Note:** Date format: `YYYY-MM-DD`

#### Response
* `200 - OK`
* `400 - Bad Request` - incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header


## Get Withdrawal Invoice

>Response example:

```json
{
    "company": "Your Company",
    "address": "Street",
    "city": "City",
    "zip_code": "12345",
    "country": "Poland",
    "vat_id": "",
    "amount": 1500,
    "paypal": "jane@email.com",
    "lc_company": "LiveChat, Inc.",
    "lc_address": "One International Place, Suite 1400",
    "lc_city": "Boston, MA",
    "lc_zip_code": "02110",
    "lc_country": "United States of America"
}
```

`GET /v2/partners/affiliates/withdrawals/invoices/{invoice_id}` - get withdrawal`s invoice

**Note:** `invoice_id` format: `YYYY/M/{partner_id}`

#### Headers
* `Authorization` - **required** - `Bearer <YOUR_API_TOKEN>`

#### Response
* `200 - OK`
* `400 - Bad Request` - missing or incorrect parameters
* `401 - Unauthorized` - missing or incorrect authorization header
* `403 - Forbidden` - invoice not found
