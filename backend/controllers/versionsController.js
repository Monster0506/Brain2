// backend/controllers/versionsController.js
const supabase = require("../supabaseClient");

exports.getVersionsByNote = async (req, res) => {
  const { noteId } = req.params;

  // Fetch all versions of a specific note
  const { data, error } = await supabase
    .from("versions")
    .select("*")
    .eq("note_id", noteId)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.revertToVersion = async (req, res) => {
  const { versionId } = req.params;

  // Fetch the specified version
  const { data: version, error: fetchError } = await supabase
    .from("versions")
    .select("*")
    .eq("id", versionId)
    .single();

  if (fetchError) return res.status(400).json({ error: fetchError.message });

  // Update the note's content with the version's content
  const { data: updatedNote, error: updateError } = await supabase
    .from("notes")
    .update({ content: version.content })
    .eq("id", version.note_id)
    .eq("user_id", req.user.id);

  if (updateError) return res.status(400).json({ error: updateError.message });

  // Insert the current content of the note as a new version before reverting
  const { data: newVersion, error: versionError } = await supabase
    .from("versions")
    .insert([{ note_id: version.note_id, content: updatedNote[0].content }]);

  if (versionError)
    return res.status(400).json({ error: versionError.message });

  res.json(updatedNote[0]);
};
