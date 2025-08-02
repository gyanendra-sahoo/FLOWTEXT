import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Recipient of the notification
  },

  type: {
    type: String,
    enum: [
      "document_shared",
      "comment_added",
      "document_edited",
      "ai_suggestion",
    ],
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

  // Related entities
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  },
  triggeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // The user who triggered this notification
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },

  data: {
    type: Object, // Flexible metadata
    default: {},
  },

  // Read status
  isRead: {
    type: Boolean,
    default: false,
  },
  readAt: Date,

  // Delivery preferences
  channels: {
    inApp: {
      type: Boolean,
      default: true,
    },
    email: {
      type: Boolean,
      default: false,
    },
    push: {
      type: Boolean,
      default: false,
    },
  },

  emailSent: {
    type: Boolean,
    default: false,
  },
  emailSentAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Notification = mongoose.model("Notification", notificationSchema);
