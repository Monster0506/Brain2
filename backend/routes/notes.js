// backend/routes/notes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const notesController = require("../controllers/notesController");

router.use(authMiddleware);

router.get("/", notesController.getNotes);
router.get("/:id", notesController.getNoteById);
router.post("/", notesController.createNote);
router.put("/:id", notesController.updateNote);
router.delete("/:id", notesController.deleteNote);

// ... routes for bookmarking, linking, etc.

module.exports = router;
