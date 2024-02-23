import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/chatPage.css'; // Assurez-vous que le chemin est correct

// Établir une connexion socket en dehors du composant pour éviter des reconnexions à chaque re-render
const socket = io('http://localhost:5173/chat'); // Remplacez 'http://localhost:3001' par l'URL de votre serveur

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Écouter les messages entrants
        socket.on('chat message', (msg) => {
            setMessages((msgs) => [...msgs, msg]);
        });

        // Nettoyer l'effet en se désabonnant de l'événement
        return () => {
            socket.off('chat message');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        socket.emit('chat message', message); // Envoyer le message au serveur
        setMessage('');
    };

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <p key={index} className="message">{msg}</p>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    className="message-input"
                    placeholder="Tapez votre message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="send-button">Envoyer</button>
            </form>
        </div>
    );
};

export default ChatPage;
