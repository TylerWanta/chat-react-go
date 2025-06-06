import { useState } from "react";

export default function Message({message}: {message: MessageEvent<any>}) {
    const [msg, updateMsg] = useState(message);

    return <div className="message">
        {JSON.parse(msg.data).body}
    </div>
}