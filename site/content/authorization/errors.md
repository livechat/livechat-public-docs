---
weight: 60
---

# Errors

All authorization errors redirect to error page (`https://accounts.livechatinc.com/ooops`) while authentication errors redirect to the login page (`https://accounts.livechatinc.com/`).

Errors codes are returned in the query strings, in form of `oauth_exception` param (for authorization errors) or `identity_exception` param (for authentication errors).

Additional `exception_details` may be passed with detailed information.

## Authorization errors

#### `invalid_request` 

The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed. Possible reasons:

* wrong HTTP method
* invalid HTTP body encoding

#### `unauthorized_client`

The client is not authorized to request a token using this method. Possible reasons:

* missing client id
* client id not found
* refresh token not found
* invalid client secret
* invalid redirect uri

#### `access_denied` 
The resource owner or authorization server denied the request. Possible reasons:

* requested scope include any scope not originally granted by the resource owner

#### `unsupported_response_type` 
The authorization server does not support obtaining a token using this method. Possible reasons:

* response type is not `code` or `token` 

#### `invalid_scope` 
The requested scope is invalid, insufficient, unknown or malformed. Possible reasons:

* scope not found
* scope name not found

#### `server_error` 
The authorization server encountered an unexpected condition that prevented it from fulfilling the request. Possible reasons:

* server down
* server storage down

#### `temporarily_unavailable` 
The authorization server is currently unable to handle the request due to a temporary overloading or maintenance of the server. Currently not used.

#### `unsupported_grant_type` 
The authorization grant type is not supported by the authorization server.

* using disabled authorization grant type, for example client credentials grant - https://tools.ietf.org/html/rfc6749#section-4.4

#### `invalid_grant` 
The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization  request, or was issued to another client. Possible reasons:

* refresh token expired
* access token expires

#### `invalid_client` 
Client authentication failed (e.g., unknown client, no client authentication included, or unsupported authentication method). Possible reasons:

* using refresh token with wrong client id

#### `missing_grant` 
The client is missing granted rights. Possible reasons:

* grants were rejected
* grants were never given
* client changed required grants

### Exception details

`client_id_not_found` - wrong client id, client id does not exists

`redirect_uri_not_set` - client misconfiguration, client has not set redirect uri

`invalid_redirect_uri` - redirect uri is not one of client's allowed redirects

`to_many_redirects` - server has detected redirect loop, client should not redirect to many times

## Authentication errors

#### `invalid_request`
The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.

#### `unauthorized`
The request is valid, but identity data is wrong or identity does not exists. If identity id is known, it's added to querystring as `entity_id`.

#### `server_error`
The server encountered an unexpected condition that prevented it from demermining identity.

#### `access_denied`
The identity is known, but access is denied because of bussiness reasons. For example identity can be banned, has wrong account version, etc.

#### `identity_lost`
The identity was removed due logout, password reset, remote logout, etc. 

#### `credentials_login_disabled`
Identity has disabled credentials login strategy. Identity should be verified with other stategies like Google Oauth or SAML.

