import React, { useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import API from "../api";

export default function MyUploads({ uploads = [], loading, onUpdate }) {
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
      is_public: sample.is_public,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/uploads/${id}`, editData);
      if (onUpdate) {
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
      await API.delete("/uploads/batch", { data: { ids: selectedIds } });
      setSelectedIds([]);
      if (onUpdate) {
        onUpdate((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
      }
    } catch (err) {
      console.error("Failed to delete samples", err);
    }
  };

  return (
    <div>
      <h2>My Uploads</h2>
      {selectedIds.length > 0 && (
        <Button variant="danger" className="mb-3" onClick={deleteSelected}>
          Delete Selected ({selectedIds.length})
        </Button>
      )}

      {uploads.length === 0 ? (
        <p>No uploads yet.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-3">
          {uploads.map((sample) => (
            <Col key={sample.id}>
              <Card
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("audioUrl", sample.file_url);
                e.dataTransfer.effectAllowed = "copy";
              }}>
                <Card.Body>
                  <Form.Check
                    type="checkbox"
                    checked={selectedIds.includes(sample.id)}
                    onChange={() => toggleSelect(sample.id)}
                    className="mb-2"
                  />

                  {editingId === sample.id ? (
                    <div>
                      <Form.Control
                        name="genre"
                        value={editData.genre}
                        onChange={handleChange}
                        placeholder="Genre"
                        className="mb-2"
                      />
                      <Form.Control
                        name="bpm"
                        value={editData.bpm}
                        onChange={handleChange}
                        placeholder="BPM"
                        className="mb-2"
                      />
                      <Form.Control
                        name="sample_key"
                        value={editData.sample_key}
                        onChange={handleChange}
                        placeholder="Key"
                        className="mb-2"
                      />
                      <Form.Control
                        name="tags"
                        value={editData.tags}
                        onChange={handleChange}
                        placeholder="Tags"
                        className="mb-2"
                      />
                      <Form.Check
                        type="checkbox"
                        name="is_public"
                        label="Public?"
                        checked={editData.is_public}
                        onChange={handleChange}
                        className="mb-2"
                      />
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => saveEdit(sample.id)}
                        className="me-2"
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Card.Title>{sample.original_name}</Card.Title>
                      <Card.Text>
                        Genre: {sample.genre || "N/A"} <br />
                        BPM: {sample.bpm || "N/A"} <br />
                        Key: {sample.sample_key || "N/A"} <br />
                        Tags: {sample.tags || "N/A"}
                      </Card.Text>
                      <audio controls src={sample.file_url} className="w-100" />
                      <div className="mt-2">
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => startEditing(sample)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
