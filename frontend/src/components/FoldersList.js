import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const FoldersList = () => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const { data, error } = await supabase
      .from("folders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setFolders(data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Folders</h1>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders.map((folder) => (
          <div key={folder.id} className="p-4 bg-white rounded-lg shadow">
            <Link
              to={`/folders/${folder.id}`}
              className="text-xl font-semibold text-indigo-600 hover:underline"
            >
              {folder.name}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link
          to="/folders/new"
          className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          Create New Folder
        </Link>
      </div>
    </div>
  );
};

export default FoldersList;
