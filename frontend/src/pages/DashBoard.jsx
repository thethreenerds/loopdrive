import React from "react";
import UploadSample from "../components/UploadSample";
import myUploads from "../components/MyUploads";

function Dashboard(){
    return (
        <div>
            <h1>Dashboard</h1>
            <UploadSample />
            <MyUploads />
        </div>
    )
}

export default Dashboard;