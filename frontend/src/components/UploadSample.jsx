import React, { useState } from "react";
import API from "../api";
import { Col, Card, Form, Button } from "react-bootstrap";

export default function UploadSample({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    tags: "",
    genre: "",
    bpm: "",
    sample_key: "",
    is_public: false,
  });
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("audio/")) {
      setFile(droppedFile);
    }
    setDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const data = new FormData();
    data.append("audio", file);
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const token = localStorage.getItem("token");
      await API.post("/uploads/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Upload Successful");
      if (onUploadSuccess) onUploadSuccess();

      setFile(null);
      setFormData({
        tags: "",
        genre: "",
        bpm: "",
        sample_key: "",
        is_public: false,
      });
    } catch (err) {
      console.error(err);
      alert("Upload Failed.");
    }
  };

  return (
    <Card
      style={{
        backgroundColor: "rgba(40, 40, 40, 0.85)", 
        color: "#fff",
        borderRadius: "0.75rem",
        boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
        backdropFilter: "blur(6px)",
        padding: "1rem",
      }}
    >
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            style={{
              border: "2px dashed rgba(255,255,255,0.4)",
              padding: "2rem",
              textAlign: "center",
              marginBottom: "1rem",
              backgroundColor: dragOver
                ? "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0.05)",
              cursor: "pointer",
              borderRadius: "0.5rem",
              transition: "background-color 0.2s",
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            {file ? <p>{file.name}</p> : <p>Drag & drop an audio file here or click to select</p>}
          </div>

          <input
            type="file"
            accept="audio/*"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {file && (
            <div style={{ marginBottom: "1rem" }}>
              <p>Preview:</p>
              <audio controls src={URL.createObjectURL(file)} className="w-100" />
            </div>
          )}

          <Form.Control
            name="tags"
            placeholder="Tags"
            onChange={handleChange}
            className="mb-2"
          />
          <Form.Control
            name="genre"
            placeholder="Genre"
            onChange={handleChange}
            className="mb-2"
          />
          <Form.Control
            name="bpm"
            placeholder="BPM"
            type="number"
            onChange={handleChange}
            className="mb-2"
          />
          <Form.Control
            name="sample_key"
            placeholder="Key"
            onChange={handleChange}
            className="mb-2"
          />

          <Form.Check
            type="checkbox"
            label="Public?"
            name="is_public"
            checked={formData.is_public}
            onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
            className="mb-3"
          />

          <Button type="submit" variant="light">
            Upload
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
