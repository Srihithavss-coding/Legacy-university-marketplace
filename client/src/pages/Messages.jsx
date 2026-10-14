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
            const { data } = await axios.post('/api/message/user-conversations', {
                userId: user._id
            });

            if (data.success) {
                setConversations(data.conversations);
            } else {
                toast.error(data.message);
            }
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
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
                                            {conv.otherUser.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium">{conv.listingName}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Chat with {conv.otherUser.name}
                                            </p>
                                            <p className="text-sm text-gray-400 mt-1 truncate max-w-md">
                                                {conv.lastMessage}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-gray-400 block">
                                            {new Date(conv.lastMessageTime).toLocaleDateString()}
                                        </span>
                                        {conv.unreadCount > 0 && (
                                            <span className="inline-block mt-1 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                                                {conv.unreadCount}
                                            </span>
                                        )}
                                    </div>
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
                    listingName={selectedChat.listingName}
                    listingImage={selectedChat.listingImage}
                    otherUserId={selectedChat.otherUser._id}
                    otherUserName={selectedChat.otherUser.name}
                />
            )}
        </div>
    );
};

export default Messages;
