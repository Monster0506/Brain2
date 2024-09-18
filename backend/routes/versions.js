// backend/routes/versions.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const versionsController = require("../controllers/versionsController");

router.use(authMiddleware);

// Get all versions of a note
router.get("/:noteId", versionsController.getVersionsByNote);

// Revert to a specific version
router.post("/revert/:versionId", versionsController.revertToVersion);

module.exports = router;
