// backend/controllers/remindersController.js
const supabase = require("../supabaseClient");

exports.getReminders = async (req, res) => {
  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.createReminder = async (req, res) => {
  const { noteId, remindAt } = req.body;

  const { data, error } = await supabase
    .from("reminders")
    .insert([{ note_id: noteId, remind_at: remindAt }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};
