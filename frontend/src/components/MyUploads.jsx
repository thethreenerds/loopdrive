import React, { useEffect, useState } from "react";
import API from "../api";

export default function myUploads() {
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        const fetchUploads = async () => {
            try {
                const res = await API.get("/uploads/my-uploads");
                setUploads(res.data);
            } catch (err) {
                console.error("Failed to fetch uploads", err);
            }
        };

        fetchUploads();
    }, []);

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