import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const BookmarksList = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("is_bookmarked", true)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setBookmarks(data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookmarks</h1>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="p-4 bg-white rounded-lg shadow">
            <Link
              to={`/notes/${bookmark.id}`}
              className="text-xl font-semibold text-indigo-600 hover:underline"
            >
              {bookmark.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarksList;
