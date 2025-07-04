package websocket

import "fmt"

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of the Connection Pool: ", len(pool.Clients))

			for client := range pool.Clients {
				fmt.Println(client)
				err := client.Conn.WriteJSON(Message{Type: 1, Body: "New User Joined..."})

				if err != nil {
					fmt.Println("Error when notifying new user", err)
				}
			}
			break
		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))

			for client := range pool.Clients {
				err := client.Conn.WriteJSON(Message{Type: 1, Body: "User Disconnected..."})

				if err != nil {
					fmt.Println("Error when notifying removed user", err)
				}
			}
			break
		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all clients in Pool")

			for client := range pool.Clients {
				err := client.Conn.WriteJSON(message)

				if err != nil {
					fmt.Println("Error when broadcasting message: ", err)
				}
			}
		}
	}
}
