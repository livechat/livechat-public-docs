# Agent

name: Agent Smith

email: smith@example.com (agent's id in Agent Chat API)
When there's more than 1 agent, the other one is: agent@example.com

id:  bbb67d600796e9f277e360e842418833 (agent's id in Customer Chat API)

# Customer

name: Thomas Anderson

email: t.anderson@example.com

id: b7eff798-f8df-4364-8059-649c35c9ed0c

# Authorization

access_token: dal:test_DQTRHGbZCFkAoss4Q (in Authorization docs) or <access_token> (in Agent and Configuration APIs), <customer_access_token> (in Customer Chat API)

code: dal:test_tnlRmy73mg9eaFESA

client_secret: test_d7MEp1YYo3

refresh_token: dal:test_gfalskcakg2347o8326

client_id: 9cbf3a968289727cb3cdfe83ab1d9836 or 0805e283233042b37f460ed8fbf22160

license_id: 104130623

ip: <ip> or <customer_ip>

# Data structures

chat_id - PJ0MRSHTDG

thread_id - K600PKZON8

If there's more chats/threads in an example, increment those ids by 1 (PJ0MRSHTDH, PJ0MRSHTDI, and so on.)

## Properties

```json
     "properties": {
          "0805e283233042b37f460ed8fbf22160": {
              "string_property": "string_value"
              }
          }
```

or more generically:

```json
     "properties": {
          "property_namespace": {
              "property_key": "property_value"
              }
          }
```
