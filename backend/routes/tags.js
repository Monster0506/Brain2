// backend/routes/tags.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const tagsController = require("../controllers/tagsController");

router.use(authMiddleware);

router.get("/", tagsController.getTags);
router.post("/", tagsController.createTag);

module.exports = router;
