import { useState } from "react";

export default function UsernameModal({ onConfirm }: {onConfirm: (username: string) => void}) {
    const [username, setUsername] = useState("");

    function updateUsername(e: React.ChangeEvent<HTMLInputElement>)
    {
        setUsername(e.target.value);
    }

    function doOnConfirm()
    {
        onConfirm(username)
    }

    return <div className="enterUsernameModal">
        <h2>Enter your username</h2>
        <input onChange={updateUsername} placeholder="Username" />
        <button onClick={doOnConfirm}>Confirm</button>
    </div>
}