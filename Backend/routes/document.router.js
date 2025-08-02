import e, { Router } from "express";
import { 
  createDocument, 
  getDocumentById, 
  getAllDocuments, 
  updateDocument, 
  deleteDocument
} from "../controllers/document.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const documentRouter = Router();

// Route to create a new document
documentRouter.post("/", verifyToken, createDocument);

// Route to get all documents for the user
documentRouter.get("/", verifyToken, getAllDocuments);

// Route to get, update, or delete a specific document
documentRouter.get("/:id", verifyToken, getDocumentById);
documentRouter.put("/:id", verifyToken, updateDocument);
documentRouter.delete("/:id", verifyToken, deleteDocument);

export default documentRouter;