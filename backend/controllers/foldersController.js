// backend/controllers/foldersController.js
const supabase = require("../supabaseClient");

exports.getFolders = async (req, res) => {
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.createFolder = async (req, res) => {
  const { name } = req.body;

  const { data, error } = await supabase
    .from("folders")
    .insert([{ name, user_id: req.user.id }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.getFolderById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("folders")
    .select("*, notes(*)")
    .eq("id", id)
    .eq("user_id", req.user.id)
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
