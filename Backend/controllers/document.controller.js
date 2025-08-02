import { Document } from "../models/documents.model.js";
import { ResponseHandler } from "../utils/ResponseHandler.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

// Helper: Permission check
const checkDocumentPermissions = (document, userId) => {
  const ownerId = document.owner._id || document.owner;
  const isOwner = ownerId.toString() === userId.toString();
  const isCollaborator = document.collaborators?.some(
    (collab) => collab.userId.toString() === userId.toString()
  );
  return isOwner || isCollaborator;
};

// Create a document
const createDocument = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const newDoc = await Document.create({
      title: "Untitled Document",
      owner: userId,
      lastEditedBy: userId,
      content: { nodes: [{ type: "paragraph", children: [{ text: "" }] }] },
    });
    res
      .status(201)
      .json(new ResponseHandler(201, newDoc, "Document created successfully"));
  } catch (error) {
    next(new ErrorHandler(500, "Failed to create document", [error.message]));
  }
};

// Get a document by ID
const getDocumentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const document = await Document.findById(id).populate("owner", "username");
    if (!document) {
      return next(new ErrorHandler(404, "Document not found"));
    }
    if (!checkDocumentPermissions(document, userId)) {
      return next(new ErrorHandler(403, "Unauthorized access"));
    }
    res.status(200).json(new ResponseHandler(200, document));
  } catch (error) {
    next(new ErrorHandler(500, "Failed to fetch document", [error.message]));
  }
};

// Get all documents for user
const getAllDocuments = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const documents = await Document.find({
      $or: [{ owner: userId }, { "collaborators.userId": userId }],
      status: { $ne: "deleted" },
    }).sort({ updatedAt: -1 });
    res
      .status(200)
      .json(new ResponseHandler(200, documents, "Documents fetched"));
  } catch (error) {
    next(new ErrorHandler(500, "Failed to fetch documents", [error.message]));
  }
};

// Update a document
const updateDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, metadata } = req.body;
    const userId = req.user._id;
    const document = await Document.findById(id);
    if (!document) {
      return next(new ErrorHandler(404, "Document not found"));
    }
    const isOwner = document.owner.toString() === userId.toString();
    const isEditor = document.collaborators?.some(
      (c) => c.userId.toString() === userId.toString() && c.role === "editor"
    );
    if (!isOwner && !isEditor) {
      return next(new ErrorHandler(403, "Unauthorized to edit this document"));
    }
    const updateData = { lastEditedBy: userId };
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (metadata !== undefined) updateData.metadata = metadata;

    const updatedDocument = await Document.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res
      .status(200)
      .json(new ResponseHandler(200, updatedDocument, "Document updated"));
  } catch (error) {
    next(new ErrorHandler(500, "Failed to update document", [error.message]));
  }
};

// Soft delete a document
const deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const document = await Document.findById(id);
    if (!document) {
      return next(new ErrorHandler(404, "Document not found"));
    }
    const isOwner = document.owner.toString() === userId.toString();
    if (!isOwner) {
      return next(new ErrorHandler(403, "Unauthorized"));
    }
    document.status = "deleted";
    await document.save();
    res
      .status(200)
      .json(new ResponseHandler(200, null, "Document moved to trash"));
  } catch (error) {
    next(new ErrorHandler(500, "Failed to delete document", [error.message]));
  }
};

export {
  createDocument,
  getDocumentById,
  getAllDocuments,
  updateDocument,
  deleteDocument,
};
