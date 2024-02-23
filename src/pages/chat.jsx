import React, { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, push, onValue, serverTimestamp } from 'firebase/database';
import app from './../../firebase-config'; // Ensure that this import path is correct
import './../styles/chatPage.css';

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {
        const db = getDatabase(app); // Use the initialized app instance
        const messagesRef = ref(db, 'messages/');

        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const loadedMessages = data ? Object.values(data) : [];
            setMessages(loadedMessages);
            // Scroll to bottom whenever the messages update
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        });

        // No dependency array is necessary here as we are only setting up the listener once
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        const db = getDatabase(app);
        push(ref(db, 'messages/'), {
            text: message,
            timestamp: serverTimestamp() // This ensures the messages are ordered correctly
        }).then(() => {
            console.log('Message sent successfully');
        }).catch((error) => {
            console.error('Error sending message:', error);
        });
        setMessage('');
    };

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <p key={index} className="message">{msg.text}</p>
                ))}
                {/* Anchor element for auto-scroll */}
                <div ref={bottomRef}></div>
            </div>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
};

export default ChatPage;
