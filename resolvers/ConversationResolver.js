const { PubSub, withFilter } = require('graphql-subscriptions');
const pubsub = new PubSub();

const NEW_CONVERSATION_MESSAGE = 'NEW_CONVERSATION_MESSAGE';

const Conversation = require('../models/ConversationModel');
const User = require('../models/UserModel');
const Message = require('../models/MessageModel');

exports.default = {
	Subscription: {
		newConversationMessage: {
			subscribe: withFilter(
				() => pubsub.asyncIterator(NEW_CONVERSATION_MESSAGE),
				(payload, args) => payload.conversationId === args.conversationId
			)
		}
	},
	Query: {
		getConversations: async (root, { userId }) => {
			const userConversations = await Conversation.find({
				users: userId
			})
				.sort({ lastConversationDate: 'desc' })
				.populate('advertizementId')
				.populate({ path: 'users', model: User });

			return userConversations;
		},
		getSpecificConversations: async (
			root,
			{ senderId, receiverId, advertizementId }
		) => {
			const userConversations = await Conversation.find({
				$and: [
					{ users: senderId },
					{ users: receiverId },
					{ advertizementId: advertizementId }
				]
			}).populate('advertizementId');

			return userConversations;
		},
		getConversationMessages: async (root, { conversationId }) => {
			const conversationMessages = await Message.find({
				conversationId: conversationId
			})
				.populate('senderId')
				.populate('receiverId');

			return conversationMessages;
		}
	},
	Mutation: {
		createConversation: async (
			root,
			{ advertizementId, senderId, receiverId }
		) => {
			const newConversation = Conversation({
				advertizementId,
				users: [senderId, receiverId]
			}).save();
			return newConversation;
		},
		sendMessage: async (
			root,
			{ receiverId, senderId, conversationId, advertizementId, message },
			{ Message, Conversation }
		) => {
			let convId = conversationId;
			let recvId = receiverId;
			if (typeof receiverId === 'undefined' || receiverId == null) {
				getConversation = await Conversation.findById(conversationId);
				getConversation.users.map(user => {
					if (user != senderId) {
						recvId = user;
					}
				});
			}
			if (typeof conversationId === 'undefined' || conversationId == null) {
				const getConversation = await Conversation.findOne({
					$and: [
						{ users: senderId },
						{ users: receiverId },
						{ advertizementId: advertizementId }
					]
				});
				if (getConversation == null) {
					const newConversation = Conversation({
						advertizementId,
						users: [senderId, receiverId]
					}).save();
					convId = newConversation._id;
				} else {
					convId = getConversation._id;
				}
			}
			const newMessage = await new Message({
				receiverId: recvId,
				senderId,
				conversationId: convId,
				message
			}).save();
			const messageDetails = Message.findById(newMessage._id)
				.populate('receiverId')
				.populate('senderId');
			const updateConversation = await Conversation.findByIdAndUpdate(convId, {
				lastConversationDate: newMessage.sentDate
			});

			pubsub.publish(NEW_CONVERSATION_MESSAGE, {
				conversationId: convId,
				newConversationMessage: messageDetails
			});
			//console.log(messageDetails);
			return messageDetails;
		}
	}
};
