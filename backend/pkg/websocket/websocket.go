package websocket

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func Upgrade(rw http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	webSocket, err := upgrader.Upgrade(rw, r, nil)

	if err != nil {
		log.Println(err)
		return webSocket, err
	}

	return webSocket, nil
}
