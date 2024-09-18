// backend/routes/folders.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const foldersController = require("../controllers/foldersController");

router.use(authMiddleware);

router.get("/", foldersController.getFolders);
router.post("/", foldersController.createFolder);
router.get("/:id", foldersController.getFolderById);

module.exports = router;
