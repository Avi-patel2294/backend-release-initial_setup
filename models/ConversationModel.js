const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  advertizementId: {
    type: Schema.Types.ObjectId,
    ref: "Advertize"
  },
  users: {
    type: [Schema.Types.ObjectId],
    ref: "User"
  },
  lastConversationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Conversation", ConversationSchema);
