import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  // Position in document using Slate.js paths
  anchor: {
    path: [{ type: Number }],
    offset: Number,
  },
  focus: {
    path: [{ type: Number }],
    offset: Number,
  },

  // Threading
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  status: {
    type: String,
    enum: ["open", "resolved", "deleted"],
    default: "open",
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  resolvedAt: {
    type: Date,
  },

  // Mentions
  mentions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
