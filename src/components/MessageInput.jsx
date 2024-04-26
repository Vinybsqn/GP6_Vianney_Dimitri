import React from 'react';

const MessageInput = ({ message, onMessageChange, onMessageSubmit }) => {
    return (
        <form onSubmit={onMessageSubmit} className="flex p-2">
            <input
                type="text"
                value={message}
                onChange={onMessageChange}
                placeholder="Tapez votre message ici..."
                className="flex-grow mr-2 p-2 border rounded"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Envoyer
            </button>
        </form>
    );
};

export default MessageInput;
