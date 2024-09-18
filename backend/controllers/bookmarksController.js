// backend/controllers/bookmarksController.js
const supabase = require("../supabaseClient");

exports.getBookmarks = async (req, res) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", req.user.id)
    .eq("is_bookmarked", true);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.toggleBookmark = async (req, res) => {
  const { id } = req.params;

  // Get the current state of the bookmark
  const { data: note, error: fetchError } = await supabase
    .from("notes")
    .select("is_bookmarked")
    .eq("id", id)
    .eq("user_id", req.user.id)
    .single();

  if (fetchError) return res.status(400).json({ error: fetchError.message });

  // Toggle the bookmark
  const { data, error } = await supabase
    .from("notes")
    .update({ is_bookmarked: !note.is_bookmarked })
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};
