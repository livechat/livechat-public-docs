#!/usr/bin/python

import websocket
import thread
import time
import json
import random

sso_access_token = 'Bearer <ACCESS_TOKEN>'
api_url = "wss://api.livechatinc.com/agent/v3.0/rtm/ws"

#websocket.enableTrace(True)

def get_random_request_id():
	return "{0}".format(random.randint(1, 9999999999))

def api_login(ws):
	login_request = {
		"request_id": get_random_request_id(),
		"action": "login",
		"payload": {
			"token": sso_access_token,
			"application": {
				"name": "python_example"
			}
		}
	}
	ws.send(json.dumps(login_request))

def api_start_chat(ws):
	start_chat_request = {
		"request_id": get_random_request_id(),
		"action": "start_chat",
		"payload": {
		}
	}
	ws.send(json.dumps(start_chat_request))

def api_send_chat_message(ws, chat_id, message):
	send_message_request = {
		"request_id": get_random_request_id(),
		"action": "send_event",
		"payload": {
			"chat_id": chat_id,
			"event": {
				"type": "message",
				"text": message,
				"recipients": "all"
			}
		}
	}
	ws.send(json.dumps(send_message_request))

def on_message_login(ws, received_message):
	if received_message['success']:
		print "Login succeeded"
	
		print "Starting a new chat..."
		api_start_chat(ws)
	else:
		print "Login failed"

def on_message_start_chat(ws, received_message):
	chat_id = received_message['payload']['chat']['id']
	print "Chat started, chat_id: {0}".format(chat_id)
	print "Sedning welcome message to the chat..."
	api_send_chat_message(ws, chat_id, "Hello, I am example python script :)")

def on_message(ws, message):
	received_message = json.loads(message)
	
	print "on_message: {0}".format(received_message)

	switcher = {
		'login': on_message_login,
		'start_chat': on_message_start_chat
	}

	on_message_handler = switcher.get(received_message['action'], lambda: "")
	on_message_handler(ws, received_message)

def on_error(ws, error):
	print "Error: {0}".format(error)

def on_close(ws):
	print "Closed"

def on_open(ws):
	print "Connected"
	
	# it's required to send login before start sending
	# any other protocol messages. Login message subscribe
	# connection for receiving server push messages.
	print "Logging in..."
	api_login(ws)

def send(action, payload):
	ws.send(protocolMessage)

# Start websocket connection
print "Connecting to {0}...".format(api_url)
ws = websocket.WebSocketApp(api_url,
							on_message = on_message,
							on_error = on_error,
							on_close = on_close,
							on_open = on_open)

ws.run_forever(ping_interval=30)
