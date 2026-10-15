import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Chat = ({ listingId, listingName, listingImage, otherUserId, otherUserName, onClose }) => {
    const { user, axios } = useAppContext();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        fetchMessages();
        // Poll for new messages every 3 seconds
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [listingId, otherUserId]);

    const fetchMessages = async () => {
        try {
            const { data } = await axios.post('/api/message/conversation', {
                userId1: user._id,
                userId2: otherUserId
            });
            if (data.success) {
                // Filter messages for this specific listing
                const listingMessages = data.messages.filter(msg => msg.listingId._id === listingId);
                setMessages(listingMessages);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        console.log('Sending message with receiverId:', otherUserId);

        try {
            const { data } = await axios.post('/api/message/send', {
                listingId,
                senderId: user._id,
                receiverId: otherUserId,
                message: newMessage.trim(),
            });

            if (data.success) {
                setNewMessage('');
                fetchMessages();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const markAsRead = async (messageId) => {
        try {
            await axios.post(`/api/message/read/${messageId}`);
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-gray-500">Loading messages...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    {listingImage && (
                        <img src={listingImage} alt={listingName} className="w-10 h-10 object-cover rounded" />
                    )}
                    <div>
                        <h3 className="font-semibold text-lg">{listingName}</h3>
                        <p className="text-sm text-gray-500">Chat with {otherUserName}</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                    ×
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isOwnMessage = msg.senderId._id === user._id;
                        return (
                            <div
                                key={msg._id}
                                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-lg p-3 ${
                                        isOwnMessage
                                            ? 'bg-primary text-white'
                                            : 'bg-white border border-gray-200'
                                    }`}
                                >
                                    <p className="text-xs mb-1 opacity-75">
                                        {isOwnMessage ? 'You' : msg.senderId.name}
                                    </p>
                                    <p className="text-sm">{msg.message}</p>
                                    <p className="text-xs mt-1 opacity-60">
                                        {new Date(msg.createdAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chat;
