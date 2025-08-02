import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },

  event: {
    type: String,
    enum: [
      "document_created",
      "ai_used",
      "collaboration_started",
      "document_opened",
      "document_edited",
      "comment_added",
    ],
    required: true,
  },

  eventData: {
    aiFeature: {
      type: String,
      enum: ["completion", "rewrite", "summary"],
      default: null,
    },
    collaboratorCount: {
      type: Number,
      default: null,
    },
    sessionDuration: {
      type: Number, // in seconds
      default: null,
    },
    wordsTyped: {
      type: Number,
      default: null,
    },
    aiSuggestionsAccepted: {
      type: Number,
      default: null,
    },
    aiSuggestionsRejected: {
      type: Number,
      default: null,
    },
  },

  sessionId: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
  },
  ipAddress: {
    type: String,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Analytics = mongoose.model("Analytics", analyticsSchema);
