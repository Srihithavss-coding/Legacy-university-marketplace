import React from 'react';
import Chat from './Chat';

const ChatModal = ({ isOpen, onClose, listingId, sellerId }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Chat
                listingId={listingId}
                sellerId={sellerId}
                onClose={onClose}
            />
        </div>
    );
};

export default ChatModal;
