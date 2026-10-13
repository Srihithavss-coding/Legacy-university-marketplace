import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import ChatModal from '../components/ChatModal';
import toast from 'react-hot-toast';

const Messages = () => {
    const { user, axios } = useAppContext();
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        fetchConversations();
    }, [user]);

    const fetchConversations = async () => {
        try {
            // For now, we'll just show a placeholder since we need to implement a conversations endpoint
            // This would typically fetch all unique conversations for the user
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load conversations');
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="mt-16 flex flex-col items-center">
                <p className="text-2xl font-medium">My Messages</p>
                <p className="text-gray-500 mt-4">Please log in to view your messages.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="mt-16 flex items-center justify-center">
                <p className="text-gray-500">Loading messages...</p>
            </div>
        );
    }

    return (
        <div className="mt-16">
            <div className="flex flex-col items-end w-max">
                <p className="text-2xl font-medium uppercase">My Messages</p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>

            <div className="mt-8 max-w-4xl w-full">
                {conversations.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-500">No messages yet.</p>
                        <p className="text-sm text-gray-400 mt-2">
                            Start a conversation by clicking "Contact Seller" on any listing.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dull transition"
                        >
                            Browse Listings
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {conversations.map((conv) => (
                            <div
                                key={conv._id}
                                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/50 cursor-pointer transition"
                                onClick={() => setSelectedChat(conv)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{conv.listingName}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {conv.lastMessage}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {new Date(conv.lastMessageTime).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedChat && (
                <ChatModal
                    isOpen={!!selectedChat}
                    onClose={() => setSelectedChat(null)}
                    listingId={selectedChat.listingId}
                    sellerId={selectedChat.sellerId}
                />
            )}
        </div>
    );
};

export default Messages;
