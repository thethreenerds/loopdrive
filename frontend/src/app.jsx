import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadSample from "./components/UploadSample";
import Dashboard from "./pages/DashBoard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/upload" element={<UploadSample />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;