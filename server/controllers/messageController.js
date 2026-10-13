import Message from "../models/Message.js";

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
