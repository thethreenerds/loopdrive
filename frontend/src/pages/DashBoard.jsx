import React, { useState, useEffect } from "react";
import UploadSample from "../components/UploadSample";
import MyUploads from "../components/MyUploads";
import API from "../api";
import LogoutButton from "../components/LogoutButton";

function Dashboard(){

    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchUploads();
    }, []);
 
    return (
        <div>
            <h1>Dashboard</h1>
            <LogoutButton />
            <UploadSample onUploadSuccess={fetchUploads} />
            <MyUploads uploads={uploads} loading={loading} />
        </div>
    )
}

export default Dashboard;