export default function chatInput(
    {
        send
    }: 
    {
        send: (e: React.KeyboardEvent<HTMLInputElement>) => void
    }) {
    return <div className="chatInput">
        <input onKeyDown={send} placeholder="Type a message. Hit Enter to send" />
    </div>
}