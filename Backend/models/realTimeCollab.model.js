import mongoose from "mongoose";

const collaborationSchema = new mongoose.Schema(
  {
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
    socketId: {
      type: String,
      required: true,
    },
    cursor: {
      position: {
        type: Number,
        default: 0,
      },
      selection: {
        anchor: {
          type: Number,
          default: 0,
        },
        focus: {
          type: Number,
          default: 0,
        },
      },
    },
    isTyping: {
      type: Boolean,
      default: false,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    userInfo: {
      username: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        default: "",
      },
      avatar: {
        type: String,
        default: "",
      },
      color: {
        type: String,
        default: "#000000",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Collaboration = mongoose.model(
  "Collaboration",
  collaborationSchema
);
