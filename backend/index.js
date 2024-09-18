// backend/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const foldersRoutes = require("./routes/folders");
const tagsRoutes = require("./routes/tags");
const versionsRoutes = require("./routes/versions");
const remindersRoutes = require("./routes/reminders");
const bookmarksRoutes = require("./routes/bookmarks");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
app.use("/folders", foldersRoutes);
app.use("/tags", tagsRoutes);
app.use("/versions", versionsRoutes);
app.use("/reminders", remindersRoutes);
app.use("/bookmarks", bookmarksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
