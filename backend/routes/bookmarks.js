// backend/routes/bookmarks.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const bookmarksController = require('../controllers/bookmarksController');

router.use(authMiddleware);

router.get('/', bookmarksController.getBookmarks);
router.post('/:id', bookmarksController.toggleBookmark);

module.exports = router;

