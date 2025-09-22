import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import UploadSample from "../components/UploadSample";
import MyUploads from "../components/MyUploads";
import LogoutButton from "../components/LogoutButton";
import API from "../api";

function Dashboard() {
  const [uploads, setUploads] = useState([]);
  const [filters, setFilters] = useState({ genre: "", bpm: "", sample_key: "", tags: "" });

  const fetchUploads = async () => {
    const res = await API.get("/uploads/my-uploads");
    setUploads(res.data);
  };

  const fetchFilteredUploads = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await API.get(`/uploads/search?${query}`);
    setUploads(res.data);
  };

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  useEffect(() => {
    fetchUploads();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col><h1>Dashboard</h1></Col>
        <Col className="text-end"><LogoutButton /></Col>
      </Row>

      <Row className="mb-3">
        <Form className="d-flex gap-2">
          <Form.Control name="genre" placeholder="Genre" onChange={handleFilterChange} />
          <Form.Control name="bpm" placeholder="BPM" onChange={handleFilterChange} />
          <Form.Control name="sample_key" placeholder="Key" onChange={handleFilterChange} />
          <Form.Control name="tags" placeholder="Tags" onChange={handleFilterChange} />
          <Button onClick={fetchFilteredUploads}>Filter</Button>
        </Form>
      </Row>

      <Row className="mb-3">
        <UploadSample onUploadSuccess={fetchUploads} />
      </Row>

      <Row>
        <MyUploads uploads={uploads} onUpdate={setUploads} />
      </Row>

    </Container>
  );
}

export default Dashboard;
