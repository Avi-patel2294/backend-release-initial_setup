const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Advertize"
  },
  message: {
    type: String,
    ref: "User"
  },
  sentDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Message", MessageSchema);
