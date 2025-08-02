import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    nodes: {
      type: Array, // You can specify Schema.Types.Mixed if needed
      default: [],
    },
    version: {
      type: Number,
      default: 1,
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
  metadata: {
    description: String,
    tags: [String],
    category: String,
    language: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  collaborators: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: {
        type: String,
        enum: ["viewer", "commenter", "editor", "admin"],
        default: "viewer",
      },
      permissions: {
        canEdit: Boolean,
        canComment: Boolean,
        canShare: Boolean,
        canDelete: Boolean,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
      addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  sharing: {
    isPublic: {
      type: Boolean,
      default: false,
    },
    shareLink: String,
    linkExpiry: Date,
    allowAnonymous: {
      type: Boolean,
      default: false,
    },
    requirePassword: {
      type: Boolean,
      default: false,
    },
    password: String, // Store hashed password if required
  },
  status: {
    type: String,
    enum: ["draft", "published", "archived", "deleted"],
    default: "draft",
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
  lastEditedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lastEditedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  // AI-related fields
  aiSummary: String,
  aiTags: [String],
  aiInsights: {
    readabilityScore: Number,
    sentimentScore: Number,
    keyTopics: [String],
    suggestedImprovements: [String],
    lastAnalyzed: Date,
  },
});

export const Document = mongoose.model("Document", documentSchema);
