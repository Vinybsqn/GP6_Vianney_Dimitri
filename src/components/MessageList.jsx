import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages, currentUserID }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Faire défiler automatiquement le conteneur de messages vers le bas
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <style jsx>{`
                .custom-scrollbar {
                    -ms-overflow-style: none;  /* Internet Explorer 10+ */
                    scrollbar-width: none;  /* Firefox */
                }
                .custom-scrollbar::-webkit-scrollbar {
                    display: none;  /* Safari and Chrome */
                }
                .message-content {
                    word-wrap: break-word; /* Permet de revenir à la ligne si le mot est trop long */
                    overflow-wrap: break-word; /* Permet de revenir à la ligne pour les longues chaînes de caractères */
                    max-width: 70%; /* Ajuster la largeur maximale des messages */
                }
                .message-container {
                    display: flex;
                    margin: 0.5rem 0;
                }
                .message-container.current-user {
                    justify-content: flex-end;
                    margin-left: auto;
                }
                .message-container.other-user {
                    justify-content: flex-start;
                    margin-right: auto;
                }
            `}</style>
            <div className="messages-list flex-grow mb-5 p-2 backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl overflow-y-auto custom-scrollbar w-full max-w-full md:max-w-lg lg:max-w-2xl mx-auto h-72">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-container ${msg.sender === currentUserID ? "current-user" : "other-user"}`}>
                        <div className={`p-3 rounded-3xl ${msg.sender === currentUserID ? "bg-blue-500 text-white" : "bg-gray-300 text-black"} message-content`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </>
    );
}

export default MessageList;