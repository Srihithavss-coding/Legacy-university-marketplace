import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    listingId: {type: String, required: true, ref: 'listing'},
    senderId: {type: String, required: true, ref: 'user'},
    receiverId: {type: String, required: true, ref: 'user'},
    message: {type: String, required: true},
    isRead: {type: Boolean, default: false},
}, { timestamps: true })

const Message = mongoose.models.message || mongoose.model('message', messageSchema)

export default Message
