import React, { useEffect } from 'react';

const MessageList = ({ messages, currentUserID, bottomRef }) => {
    useEffect(() => {
        // Déplacer automatiquement le focus vers le bas de la fenêtre de chat
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="messages-list mb-5 p-2 border border-purple-300 bg-purple-200 rounded h-72 overflow-y-scroll" style={{ width: '600px', margin: 'auto' }}>
            {messages.map((msg) => (
                <div key={msg.id} className={`my-2.5 ${msg.sender === currentUserID ? "text-right" : "text-left"}`}>
                    <span className={`p-2.5 rounded-full ${msg.sender === currentUserID ? "bg-purple-800" : "bg-purple-400"}`}>{msg.text}</span>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
}

export default MessageList;
