import React from 'react';

const MessageList = ({ messages, currentUserID, bottomRef }) => {
    return (
        <div className="messages-list mb-5 p-2.5 border rounded h-72 overflow-y-scroll">
            {messages.map((msg) => (
                <div key={msg.id} className={`my-2.5 ${msg.sender === currentUserID ? "text-right" : "text-left"}`}>
                    <span className="p-2.5 bg-gray-200 rounded-full">{msg.text}</span>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
}

export default MessageList;