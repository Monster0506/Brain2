import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NoteForm = () => {
  const { id } = useParams(); // For editing an existing note
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNote = async (id) => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      setError(error.message);
    } else {
      setTitle(data.title);
      setContent(data.content);
      setTags(data.tags.join(", ")); // assuming tags are stored as an array
    }
  };
  useEffect(() => {
    if (id) {
      fetchNote();
    }
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const tagList = tags.split(",").map((tag) => tag.trim());

    if (id) {
      // Update existing note
      const { error } = await supabase
        .from("notes")
        .update({ title, content, tags: tagList, updated_at: new Date() })
        .eq("id", id);

      if (error) {
        setError(error.message);
      } else {
        navigate("/");
      }
    } else {
      // Create a new note
      const { error } = await supabase
        .from("notes")
        .insert([{ title, content, tags: tagList }]);

      if (error) {
        setError(error.message);
      } else {
        navigate("/");
      }
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Note" : "New Note"}
      </h1>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <ReactQuill value={content} onChange={setContent} />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Saving..." : id ? "Update Note" : "Create Note"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
