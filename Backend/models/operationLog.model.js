import mongoose from "mongoose";

const operationSchema = new mongoose.Schema({
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
  operation: {
    type: Object, // Slate.js operation object
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  version: {
    type: Number,
    required: true,
  },
  sessionId: {
    type: String, // socket ID or session ID
    required: true,
  },
  transformedAgainst: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operation", // references other operation _ids
    },
  ],
  originalOperation: {
    type: Object, // operation before transformation
  },
});

export const Operation = mongoose.model("Operation", operationSchema);
