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
        <Col md={6}>
          <Card
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)", 
              backdropFilter: "blur(5px)",                
              borderRadius: "0.75rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", 
            }}
          >
            <h2 className="text-center">Search/Filtering</h2>
            <Card.Body>
              <Form className="d-flex gap-2 flex-wrap">
                <Form.Control name="genre" placeholder="Genre" onChange={handleFilterChange} />
                <Form.Control name="bpm" placeholder="BPM" onChange={handleFilterChange} />
                <Form.Control name="sample_key" placeholder="Key" onChange={handleFilterChange} />
                <Form.Control name="tags" placeholder="Tags" onChange={handleFilterChange} />
                <Button onClick={fetchFilteredUploads}>Filter</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
          <Col md={6}>
           <UploadSample onUploadSuccess={fetchUploads} />
          </Col>
      </Row>

      <Row>
        <MyUploads uploads={uploads} onUpdate={setUploads} />
      </Row>

    </Container>
  );
}

export default Dashboard;
