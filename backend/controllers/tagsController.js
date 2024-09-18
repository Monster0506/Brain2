// backend/controllers/tagsController.js
const supabase = require("../supabaseClient");

exports.getTags = async (req, res) => {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.createTag = async (req, res) => {
  const { name } = req.body;

  const { data, error } = await supabase
    .from("tags")
    .insert([{ name, user_id: req.user.id }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};
