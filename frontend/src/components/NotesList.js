// src/components/NotesList.js
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    let { data, error } = await supabase.from("notes").select("*");
    if (error) console.log("Error:", error);
    else setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Your Notes</h1>
      {/* ... display notes */}
      {notes.map((note) => (
        <div key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
