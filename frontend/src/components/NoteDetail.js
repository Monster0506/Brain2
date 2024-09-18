import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      setError(error.message);
    } else {
      setNote(data);
      setUpdatedContent(data.content);
    }
    setLoading(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("notes")
      .update({ content: updatedContent, updated_at: new Date() })
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      setNote({ ...note, content: updatedContent });
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>

      {isEditing ? (
        <ReactQuill value={updatedContent} onChange={setUpdatedContent} />
      ) : (
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
        </div>
      )}

      <div className="mt-6 flex space-x-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEditToggle}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteDetail;
