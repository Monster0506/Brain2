// backend/controllers/notesController.js
const supabase = require("../supabaseClient");

exports.getNotes = async (req, res) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Implement other controller methods similarly
