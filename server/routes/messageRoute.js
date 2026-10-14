import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getConversation, getMessagesByListing, getUserConversations, markAsRead, sendMessage } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.post('/send', authUser, sendMessage);
messageRouter.get('/listing/:listingId', authUser, getMessagesByListing);
messageRouter.post('/conversation', authUser, getConversation);
messageRouter.post('/user-conversations', authUser, getUserConversations);
messageRouter.post('/read/:messageId', authUser, markAsRead);

export default messageRouter;
