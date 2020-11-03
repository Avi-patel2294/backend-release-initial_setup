exports.default = `
type Conversation{
    _id: ID
    advertizementId: Advertize
    users: [User]
    lastConversationDate: String
}

type Message{
    _id: ID
    receiverId: User
    senderId: User
    message: String
    sentDate: String
}

type Subscription {
    newConversationMessage(conversationId: ID!): Message
  }

type Query{
    getConversations(userId: ID) : [Conversation]
    getSpecificConversations(senderId: ID, receiverId: ID, advertizementId: ID) : [Conversation]
    getConversationMessages(conversationId: ID) : [Message]
}

type Mutation{
    sendMessage(receiverId: ID, senderId: ID!, conversationId: ID, advertizementId: ID, message: String!) : Message

    createConversation(advertizementId: ID!, senderId: ID!,receiverId: ID!) : Conversation
}
`;
