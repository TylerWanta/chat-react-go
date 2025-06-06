const socket = new WebSocket("ws://localhost:8080/ws")

export function connect(callback: (message: MessageEvent) => void)
{
    console.log("Attempting Connection...");

    socket.onopen = () =>
    {
        console.log("Successfully Connected");
    };

    socket.onmessage = (msg: MessageEvent) => 
    {
        console.log(msg);
        callback(msg);
    };

    socket.onclose = (e: CloseEvent) => 
    {
        console.log("Socket Closed Connection: ", e);
    };

    socket.onerror = (e: Event) =>
    {
        console.log("Socket Error: ", e);
    };
}

export function sendMessage(message: string)
{
    console.log("Sending Message: ", message);
    socket.send(message);
} 