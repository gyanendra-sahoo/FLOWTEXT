import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Nested folder structure
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null, // Root folder
  },
  path: {
    type: String,
    default: "/", // e.g. "/Work/Reports/Q1"
  },

  // Permissions
  collaborators: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: {
        type: String,
        enum: ["viewer", "editor", "admin"],
        default: "viewer",
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  // UI Metadata
  color: {
    type: String,
    default: "#ffffff", // Default white color
  },
  icon: {
    type: String,
    default: "folder", // Optional icon identifier
  },

  // Soft deletion
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Folder = mongoose.model("Folder", folderSchema);
