exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, folderId } = req.body;

  // Create a new version before updating the note
  const { data: currentNote, error: fetchError } = await supabase
    .from("notes")
    .select("content")
    .eq("id", id)
    .eq("user_id", req.user.id)
    .single();

  if (fetchError) return res.status(400).json({ error: fetchError.message });

  // Insert the current version into the versions table
  await supabase
    .from("versions")
    .insert([{ note_id: id, content: currentNote.content }]);

  // Update the note
  const { data, error } = await supabase
    .from("notes")
    .update({ title, content, folder_id: folderId })
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ error: error.message });

  // Update tags
  if (tags) {
    // Clear existing tags
    await supabase.from("notes_tags").delete().eq("note_id", id);

    // Add new tags
    for (const tag of tags) {
      await supabase.from("notes_tags").insert([{ note_id: id, tag_id: tag }]);
    }
  }

  res.json(data[0]);
};
