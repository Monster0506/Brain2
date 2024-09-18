// src/components/NoteForm.js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { supabase } from "../supabaseClient";

const NoteForm = ({ existingNote }) => {
  const [title, setTitle] = useState(existingNote ? existingNote.title : "");
  const [content, setContent] = useState(
    existingNote ? existingNote.content : "",
  );
  const [tags, setTags] = useState(existingNote ? existingNote.tags : []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... save note and tags
  };

  return (
    <form onSubmit={handleSubmit}>
      <ReactQuill value={content} onChange={setContent} />
      {/* ... form fields for title, content, tags */}
    </form>
  );
};

export default NoteForm;
