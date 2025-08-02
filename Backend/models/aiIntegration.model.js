import mongoose from "mongoose";

const aiInteractionSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: [
      "completion",
      "rewrite",
      "summary",
      "grammar_check",
      "voice_transcription",
    ],
    required: true,
  },
  input: {
    text: { type: String },
    context: { type: String },
    selection: {
      start: Number,
      end: Number,
    },
    audioFile: { type: String }, // URL or file path
  },
  output: {
    text: { type: String },
    suggestions: [String],
    confidence: { type: Number },
    metadata: {
      model: { type: String },
      tokens_used: { type: Number },
      processing_time: { type: Number }, // milliseconds
      language_detected: { type: String },
    },
  },
  userAction: {
    type: String,
    enum: ["accepted", "rejected", "modified", "pending"],
    default: "pending",
  },
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  processedAt: {
    type: Date,
  },
});

export const AIInteraction = mongoose.model(
  "AIInteraction",
  aiInteractionSchema
);
