import type { Route } from "./+types/home";
import Header from "~/components/header";
import ChatHistory from "~/components/chatHistory";
import { useEffect, useState } from "react";
import { connect, sendMessage } from "~/api";
import ChatInput from "~/components/chatInput";
import UsernameModal from "~/components/usernameModal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const MAX_CHAT_HISTORY = 200;

export default function Home() {
    const [chatHistory, updateChatHistory] = useState<MessageEvent<any>[]>([]);
    const [showUsernameModal, updateShowUsernameModal] = useState(true);

    function send(e: React.KeyboardEvent<HTMLInputElement>)
    {
        if (e.key == "Enter") 
        {
            sendMessage(e?.target.value);
            e.target.value = "";
        }
    }

    useEffect(() =>
    {
        connect((msg: MessageEvent) =>
        {
            if (chatHistory.length == MAX_CHAT_HISTORY)
            {
                chatHistory.shift()
            }
    
            chatHistory.push(msg);
            updateChatHistory([...chatHistory, msg]);
        });
    }, [])

    function startConnection()
    {
    }

    function onUsernameEntered(username: string)
    {

    }

    return <div>
        <Header />
        <ChatHistory chatHistory={chatHistory} />
        <ChatInput send={send} />
        {/* <UsernameModal onConfirm={onUsernameEntered} /> */}
    </div>
}
