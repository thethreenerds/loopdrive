import React, {useState} from "react";
import API from "../api";

export default function MyUploads({ uploads, loading, onUpdate }) {

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);

  const startEditing = (sample) => {
    setEditingId(sample.id);
    setEditData({
      genre: sample.genre || "",
      bpm: sample.bpm || "",
      sample_key: sample.sample_key || "",
      tags: sample.tags || "",
      is_public: sample.is_public
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked} = e.target;
    setEditData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value}));
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/uploads/${id}`, editData);
      if(onUpdate){
        onUpdate((prev) =>
          prev.map((s) => (s.id === id ? { ...s, ...editData } : s))
        
        );
      }
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update sample", err);
    }
  };

const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    try {
      await API.delete("/uploads/batch", { data: {ids: selectedIds }});
      setSelectedIds([]);
      onUpdate();
    }catch(err){
      console.error("Failed to delete samples", err);
    }
  };



  return (
    <div>
      <h2>My Uploads</h2>
      {selectedIds.length > 0 && (
        <button onClick={deleteSelected}>
          Delete Selected ({selectedIds.length})
        </button>
      )}
      {uploads.length === 0 ? (
        <p>No uploads yet.</p>
      ) : (
        <ul>
          {uploads.map((sample) => (
            <li key={sample.id} style={{ marginBottom: "1rem" }}>
              <input 
              type="checkbox"
              checked={selectedIds.includes(sample.id)}
              onChange={() => toggleSelect(sample.id)}
              style={{marginRight: "0.5rem" }}
              />
              
              {editingId === sample.id ? (
                //edit form
                <div>
                  <input name="genre" value={editData.genre} onChange={handleChange} placeholder="Genre" />
                  <input name="bpm" value={editData.bpm} onChange={handleChange} placeholder="BPM" />
                  <input name="sample_key" value={editData.sample_key} onChange={handleChange} placeholder="Key" />
                  <input name="tags" value={editData.tags} onChange={handleChange} placeholder="Tags" />
                  <label>
                    Public? <input type="checkbox" name="is_public" checked={editData.is_public} onChange={handleChange} />
                  </label>
                  <button onClick={() => saveEdit(sample.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                //existing read-only display + Edit button
                <div>
                  <p>Name: {sample.original_name}</p>
                  <p>Genre: {sample.genre || "N/A"}</p>
                  <p>BPM: {sample.bpm || "N/A"}</p>
                  <p>Key: {sample.sample_key || "N/A"}</p>
                  <p>Tags: {sample.tags || "N/A"}</p>
                  <audio controls src={sample.file_url} />
                  <button onClick={() => startEditing(sample)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}