import React from "react";

export default function MyUploads({ uploads, loading }) {

     return (
    <div>
      <h2>My Uploads</h2>
      {uploads.length === 0 ? (
        <p>No uploads yet.</p>
      ) : (
        <ul>
          {uploads.map((sample) => (
            <li key={sample.id} style={{ marginBottom: "1rem" }}>
              <p>Name: {sample.original_name}</p>
              <p>Genre: {sample.genre || "N/A"}</p>
              <p>BPM: {sample.BPM || "N/A"}</p>
              <p>Key: {sample.sample_key || "N/A"}</p>
              <p>Tags: {sample.tags || "N/A"}</p>
              <audio controls src={sample.file_url} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );

}