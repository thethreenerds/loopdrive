import React, { useState, useEffect } from "react";
import UploadSample from "../components/UploadSample";
import MyUploads from "../components/MyUploads";
import API from "../api";
import LogoutButton from "../components/LogoutButton";

function Dashboard(){

    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        genre: "",
        bpm: "",
        sample_key: "",
        tags: ""
    });

    const fetchUploads = async () => {
        try {
            setLoading(true);
            const res = await API.get("/uploads/my-uploads");
            setUploads(res.data);
        } catch (err) {
            console.error("Failed to fetch uploads", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchFilteredUploads = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams(filters).toString();
            const res = await API.get(`/uploads/search?${query}`);
            setUploads(res.data);
        } catch (err) {
            console.error("Failed to fetch filtered upload data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUploads();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <LogoutButton />
            {/* Filter UI */}
            <div style={{ marginBottom: "1 rem"}}>
                <input name="genre" placeholder="Genre" onChange={handleFilterChange} />
                <input name="bpm" placeholder="BPM" onChange={handleFilterChange} />
                <input name="sample_key" placeholder="Key" onChange={handleFilterChange} />
                <input name="tags" placeholder="Tags" onChange={handleFilterChange} />
                <button onClick={fetchFilteredUploads}>Filter</button>
            </div>
            <UploadSample onUploadSuccess={fetchUploads} />
            <MyUploads uploads={uploads} loading={loading} onUpdate={setUploads} />
        </div>
    )
}

export default Dashboard;