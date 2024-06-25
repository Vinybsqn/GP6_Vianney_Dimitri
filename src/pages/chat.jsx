import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './../../firebase-config';
import MessageList from './../components/MessageList';
import MessageInput from './../components/MessageInput';

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [currentUserID, setCurrentUserID] = useState('');
    const [otherUserName, setOtherUserName] = useState('');
    const bottomRef = useRef(null);
    const { conversationId } = useParams();
    const db = getFirestore(app);
    const auth = getAuth(app);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUserID(user.uid);
            }
        });
    }, [auth]);

    useEffect(() => {
        if (!conversationId || !currentUserID) return;

        const fetchMessages = async () => {
            const q = query(collection(db, `messages/${conversationId}/messages`), orderBy("timestamp"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const loadedMessages = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setMessages(loadedMessages);
                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            });
            return () => unsubscribe();
        };

        const fetchOtherUserName = async () => {
            const conversationRef = doc(db, 'conversations', conversationId);
            const conversationSnapshot = await getDoc(conversationRef);
            if (conversationSnapshot.exists()) {
                const otherUserID = conversationSnapshot.data().users.find(id => id !== currentUserID);
                if (otherUserID) {
                    const userRef = doc(db, 'utilisateurs', otherUserID);
                    const userSnapshot = await getDoc(userRef);
                    if (userSnapshot.exists()) {
                        setOtherUserName(userSnapshot.data().displayName);
                    }
                }
            }
        };

        fetchMessages();
        fetchOtherUserName();
    }, [conversationId, currentUserID, db]);

    const handleMessageChange = (event) => setMessage(event.target.value);
    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        if (!message.trim()) return console.error('Le message ne peut pas être vide.');

        try {
            await addDoc(collection(db, `messages/${conversationId}/messages`), {
                text: message,
                timestamp: serverTimestamp(),
                sender: currentUserID,
            });
            setMessage('');
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-gray-500">
            {/* Back Button */}
            <div className="p-4 text-white">
                <button onClick={() => navigate(-1)} className="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="ml-2">Retour</span>
                </button>
            </div>

            {/* Conversation Title */}
            <div className="p-4 text-center text-white">
                {otherUserName && <h2 className="text-lg font-bold">Discussion avec {otherUserName}</h2>}
            </div>

            {/* Message List and Input */}
            <div className="flex-auto flex flex-col justify-between px-4 py-2">
                <MessageList messages={messages} currentUserID={currentUserID} bottomRef={bottomRef} />
                <MessageInput message={message} onMessageChange={handleMessageChange} onMessageSubmit={handleMessageSubmit} />
            </div>
        </div>
    );
};

export default ChatPage;