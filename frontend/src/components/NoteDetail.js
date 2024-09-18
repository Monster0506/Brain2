import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const fetchLinkedNotes = async () => {
  const { data: linkedNotes } = await supabase
    .from("links")
    .select("to_note(*)")
    .eq("from_note", note.id);

  const { data: backlinks } = await supabase
    .from("links")
    .select("from_note(*)")
    .eq("to_note", note.id);

  // ... set state for linkedNotes and backlinks
};
const fetchNotes = async (searchTerm) => {
  let query = supabase.from("notes").select("*");
  if (searchTerm) {
    query = query.ilike("title", `%${searchTerm}%`);
  }
  const { data, error } = await query;
  // ... handle data and error
};

const exports = { fetchLinkedNotes, fetchNotes };
export default exports;
