import React from 'react';

const MessageInput = ({ message, onMessageChange, onMessageSubmit }) => {
    return (
        <form onSubmit={onMessageSubmit} className="flex p-2 backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl w-full max-w-lg mx-auto">
            <input
                type="text"
                value={message}
                onChange={onMessageChange}
                placeholder="Tapez votre message ici..."
                className="flex-grow mr-2 p-2 border border-gray-300 rounded-3xl backdrop-blur-md bg-white/50 text-black"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600">
                Envoyer
            </button>
        </form>
    );
};

export default MessageInput;