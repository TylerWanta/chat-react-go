package main

import (
	"backend/pkg/websocket"
	"fmt"
	"log"
	"net/http"
)

func main() {
	setupRoutes()
	err := http.ListenAndServe(":8080", nil)

	if err != nil {
		fmt.Printf("Error when setting up server: %v", err)
	}
}

func setupRoutes() {
	pool := websocket.NewPool()

	go pool.Start()

	http.HandleFunc("/ws", func(rw http.ResponseWriter, r *http.Request) {
		createNewWebSocket(pool, rw, r)
	})
}

func createNewWebSocket(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		log.Println(err)
	}

	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}
