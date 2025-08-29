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
              <p>{sample.original_name}</p>
              <audio controls src={sample.file_url} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );

}