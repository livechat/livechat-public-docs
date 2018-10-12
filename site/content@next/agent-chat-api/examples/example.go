package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
)

var (
	apiURL       string        = "wss://api.livechatinc.com/agent/v3.0/rtm/ws"
	pingInterval time.Duration = time.Second * 30
	accessToken  string        = "Bearer <ACCESS_TOKEN>"
)

func main() {
	log.Printf("Connecting to %s", apiURL)

	c, _, err := websocket.DefaultDialer.Dial(apiURL, nil)
	if err != nil {
		log.Fatalf("Dial error: %s", err)
	}
	defer c.Close()

	go pinger(c)

	if err := apiLogin(c, accessToken); err != nil {
		log.Fatalf("Send message error: %s", err)
	}

	for {
		_, raw, err := c.ReadMessage()
		if err != nil {
			log.Fatalf("Read message error: %s", err)
		}

		if err := handleMessage(c, raw); err != nil {
			log.Fatalf("Handle message error: %s", err)
		}
	}
}

func pinger(c *websocket.Conn) {
	t := time.NewTimer(pingInterval)
	for {
		<-t.C
		c.WriteMessage(websocket.PingMessage, []byte{})
		t.Reset(pingInterval)
	}
}

func handleMessage(c *websocket.Conn, raw []byte) error {
	type protocolResponse struct {
		RequestID string          `json:"request_id,omitempty"`
		Action    string          `json:"action"`
		Type      string          `json:"type"`
		Payload   json.RawMessage `json:"payload"`
		Success   *bool           `json:"success"`
	}

	log.Printf("Received message: %s", raw)

	msg := &protocolResponse{}
	if err := json.Unmarshal(raw, msg); err != nil {
		return err
	}

	if msg.Type != "response" {
		return nil
	}

	if msg.Success != nil && !*msg.Success {
		return errors.New(fmt.Sprintf("Message %s failed", msg.Action))
	}

	switch msg.Action {
	case "login":
		return handleMessageLogin(c, msg.Payload)
	case "start_chat":
		return handleMessageStartChat(c, msg.Payload)
	}

	return nil
}

func handleMessageLogin(c *websocket.Conn, raw []byte) error {
	return apiStartChat(c)
}

func handleMessageStartChat(c *websocket.Conn, raw []byte) error {
	type startChatResponse struct {
		Chat *struct {
			ID string `json:"id"`
		} `json:"chat"`
	}

	payload := &startChatResponse{}

	if err := json.Unmarshal(raw, payload); err != nil {
		return err
	}

	return apiSendChatMessage(c, payload.Chat.ID)
}

func apiLogin(c *websocket.Conn, token string) error {
	type loginRequest struct {
		Token string `json:"token"`
	}

	payload := &loginRequest{
		Token: token,
	}
	return sendMessage(c, "login", payload)
}

func apiStartChat(c *websocket.Conn) error {
	return sendMessage(c, "start_chat", nil)
}

func apiSendChatMessage(c *websocket.Conn, chatID string) error {
	type event struct {
		Type string `json:"type"`
		Text string `json:"text"`
	}

	type sendEventRequest struct {
		ChatID string `json:"chat_id"`
		Event  *event `json:"event"`
	}

	payload := &sendEventRequest{
		ChatID: chatID,
		Event: &event{
			Type: "message",
			Text: "Hello World",
		},
	}
	return sendMessage(c, "send_event", payload)
}

func sendMessage(c *websocket.Conn, action string, payload interface{}) error {
	type protocolRequest struct {
		Action    string      `json:"action"`
		RequestID string      `json:"request_id"`
		Payload   interface{} `json:"payload"`
	}

	msg := protocolRequest{
		Action:    action,
		RequestID: strconv.Itoa(rand.Int()),
		Payload:   payload,
	}

	raw, err := json.Marshal(msg)
	if err != nil {
		return err
	}

	if err := c.WriteMessage(websocket.TextMessage, raw); err != nil {
		return err
	}

	log.Printf("Sent message: %s", raw)
	return nil
}
