// backend/routes/reminders.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const remindersController = require("../controllers/remindersController");

router.use(authMiddleware);

router.get("/", remindersController.getReminders);
router.post("/", remindersController.createReminder);

module.exports = router;
