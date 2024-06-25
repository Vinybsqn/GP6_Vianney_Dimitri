import React, { useEffect } from 'react';

const MessageList = ({ messages, currentUserID, bottomRef }) => {
    useEffect(() => {
        // Déplacer automatiquement le focus vers le bas de la fenêtre de chat
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="messages-list mb-5 p-2 backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl h-72 overflow-y-scroll custom-scrollbar" style={{ width: '600px', margin: 'auto' }}>
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === currentUserID ? "justify-end" : "justify-start"} my-2`}>
                    <div className={`p-3 rounded-3xl max-w-xs ${msg.sender === currentUserID ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
}

export default MessageList;