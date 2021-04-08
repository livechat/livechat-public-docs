const request = require('request-promise-native');
const qs = require('qs')

// DEFINE YOUR AGENT ACCESS TOKEN
const agentAccessToken = "";

// DEFINE YOUR ANY REDIRECT URI
const redirectURI = "";

// DEFINE YOUR CLIENT ID
const clientID = ""

if (agentAccessToken === "") {
	return console.error("missing agent access token")
}

if (redirectURI === "") {
	return console.error("missing redirect URI")
}

if (clientID === "") {
	return console.error("missing client ID")
}

var query = {}

request.get(`https://accounts.livechat.com/info?code=${agentAccessToken}`)
	.then(JSON.parse)
	.then(function(token){
		if (clientID != token.client_id) {
			return console.error("defined client id is different in access token")
		}

		const scopes = token.scope.split(",")
		var found = false;

		for (s of scopes) {
			if (s === "customers.identity--manage") {
				found = true
				break
			}
		}

		if (!found) {
			return console.error("missing scope customers.identity--manage")
		}

		query = {
			client_id: clientID,
			redirect_uri: redirectURI,
			response_type: "token"
		}

	})
	.catch(function(e){
		console.error(e.message)
		console.error("probably access token is expired")
	})
	.then(function(){
		const body = {
			valid_for: 60
		}

		const options = {
			body: body,
			json: true,
			headers: {
				Authorization: `Bearer ${agentAccessToken}`
			}
		}

		return request.post(`https://accounts.livechat.com/customer/?${qs.stringify(query)}`,options)
	})
	.catch(function(err){
		console.error(err.message)
	})
	.then(function(token){
		console.log("access token for first call")
		console.log(token)
		return token
	})

	.then(function(token){
		const body = {
			valid_for: 70,
			customer_id: token.entity_id
		}

		const options = {
			body: body,
			json: true,
			headers: {
				Authorization: `Bearer ${agentAccessToken}`
			}
		}

		return request.post(`https://accounts.livechat.com/customer/?${qs.stringify(query)}`,options)
	})
	.catch(function(err){
		console.error(err.message)
	})
	.then(function(token){
		console.log("second access token for the same customer entity id")
		console.log(token)
	})
