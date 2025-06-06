import { useState } from "react"
import Message from "./message"

export default function ChatHistory({ chatHistory }: { chatHistory: MessageEvent<any>[] }) {
    const [history, updateHistory] = useState(chatHistory)

    return <div className="chatHistory">
        <h2>Chat History</h2>
        {history.map((msg, index) => <Message key={index} message={msg} />)}
    </div>
}
