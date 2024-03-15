import React, { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, push, onValue, serverTimestamp } from 'firebase/database';
import app from './../../firebase-config'; // Assurez-vous que ce chemin d'importation est correct

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {
        const db = getDatabase(app);
        const messagesRef = ref(db, 'messages/');

        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const loadedMessages = data ? Object.values(data) : [];
            setMessages(loadedMessages);
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        const db = getDatabase(app);
        push(ref(db, 'messages/'), {
            text: message,
            timestamp: serverTimestamp(),
            sender: 'user'
        }).then(() => {
            console.log('Message envoyé avec succès');
        }).catch((error) => {
            console.error('Erreur lors de l\'envoi du message :', error);
        });
        setMessage('');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-bleu to-violet p-4">
            <div className="w-full max-w-lg h-80 overflow-auto mb-4 backdrop-filter backdrop-blur-lg bg-white/10 rounded-lg shadow-md">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex justify-${msg.sender === 'user' ? 'start' : 'end'} mb-2`}>
                        <div className={`bg-${msg.sender === 'user' ? 'bleu' : 'gray-200'} text-${msg.sender === 'user' ? 'white' : 'gray-800'} bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-lg p-4 max-w-sm shadow-md`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef}></div>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-lg overflow-auto mb-4 backdrop-filter backdrop-blur-lg bg-white/10 rounded-lg shadow-md">
                <input
                    type="text"
                    className="message-input flex-grow rounded-full p-4 bg-gray-100 focus:outline-none placeholder-gray-500 text-black/80"
                    placeholder="Tapez votre message ici..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="send-button bg-bleu text-white rounded-full px-6 py-3 hover:bg-blue-600 transition-colors">Envoyer</button>
            </form>
        </div>
    );
};

export default ChatPage;
