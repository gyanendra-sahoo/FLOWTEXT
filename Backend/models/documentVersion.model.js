import mongoose from "mongoose";

const documentVersionSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
  content: {
    nodes: {
      type: Array, // Slate.js nodes snapshot
      default: [],
    },
    wordCount: {
      type: Number,
      default: 0,
    },
    characterCount: {
      type: Number,
      default: 0,
    },
  },
  changes: {
    type: {
      type: String,
      enum: ["manual_save", "auto_save", "ai_suggestion", "collaboration"],
      required: true,
    },
    description: String,
    operations: {
      type: Array, // Slate.js operations array
      default: [],
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Optional diff-based tracking
  parentVersion: {
    type: Number,
  },
  delta: {
    type: mongoose.Schema.Types.Mixed, // Use Mixed for flexible diff format
  },
});

export const DocumentVersion = mongoose.model(
  "DocumentVersion",
  documentVersionSchema
);
