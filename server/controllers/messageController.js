import Message from "../models/Message.js";
import Listing from "../models/Listing.js";
import User from "../models/User.js";

// Send Message : /api/message/send
export const sendMessage = async (req, res) => {
    try {
        const { listingId, senderId, receiverId, message } = req.body;

        if (!listingId || !senderId || !receiverId || !message) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const newMessage = await Message.create({
            listingId,
            senderId,
            receiverId,
            message
        });

        res.json({ success: true, message: "Message sent", data: newMessage });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get Messages for a listing : /api/message/listing/:listingId
export const getMessagesByListing = async (req, res) => {
    try {
        const { listingId } = req.params;
        const messages = await Message.find({ listingId })
            .sort({ createdAt: 1 })
            .populate('senderId', 'name email')
            .populate('receiverId', 'name email');

        res.json({ success: true, messages });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get conversation between two users : /api/message/conversation
export const getConversation = async (req, res) => {
    try {
        const { userId1, userId2 } = req.body;

        const messages = await Message.find({
            $or: [
                { senderId: userId1, receiverId: userId2 },
                { senderId: userId2, receiverId: userId1 }
            ]
        })
        .sort({ createdAt: 1 })
        .populate('listingId', 'name')
        .populate('senderId', 'name email')
        .populate('receiverId', 'name email');

        res.json({ success: true, messages });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get all conversations for a user : /api/message/user-conversations
export const getUserConversations = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find all messages where user is either sender or receiver
        const messages = await Message.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        })
        .sort({ createdAt: -1 })
        .populate('listingId', 'name image')
        .populate('senderId', 'name email')
        .populate('receiverId', 'name email');

        // Group messages by conversation (unique combination of listing + other user)
        const conversations = [];
        const seenConversations = new Set();

        for (const msg of messages) {
            const otherUserId = msg.senderId._id.toString() === userId
                ? msg.receiverId._id.toString()
                : msg.senderId._id.toString();

            const conversationKey = `${msg.listingId._id.toString()}-${otherUserId}`;

            if (!seenConversations.has(conversationKey)) {
                seenConversations.add(conversationKey);

                const otherUser = msg.senderId._id.toString() === userId
                    ? msg.receiverId
                    : msg.senderId;

                conversations.push({
                    _id: conversationKey,
                    listingId: msg.listingId._id.toString(),
                    listingName: msg.listingId.name,
                    listingImage: msg.listingId.image[0],
                    otherUser: {
                        _id: otherUser._id.toString(),
                        name: otherUser.name,
                        email: otherUser.email
                    },
                    lastMessage: msg.message,
                    lastMessageTime: msg.createdAt,
                    isRead: msg.isRead,
                    unreadCount: msg.isRead === false && msg.receiverId._id.toString() === userId ? 1 : 0
                });
            }
        }

        res.json({ success: true, conversations });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Mark message as read : /api/message/read/:messageId
export const markAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        await Message.findByIdAndUpdate(messageId, { isRead: true });

        res.json({ success: true, message: "Message marked as read" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
