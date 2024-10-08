import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setNotes(data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Notes</h1>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 bg-white rounded-lg shadow">
            <Link
              to={`/notes/${note.id}`}
              className="text-xl font-semibold text-indigo-600 hover:underline"
            >
              {note.title}
            </Link>
            <p className="text-gray-600 mt-2">
              {new Date(note.created_at).toLocaleDateString()} -{" "}
              {note.tags.join(", ")}
            </p>
            <p className="mt-4 text-gray-800">
              {note.content.replace(/(<([^>]+)>)/gi, "").substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link
          to="/notes/new"
          className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          Create New Note
        </Link>
      </div>
    </div>
  );
};

export default NotesList;
