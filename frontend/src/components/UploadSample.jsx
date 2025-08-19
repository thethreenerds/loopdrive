import React, { useState } from "react";
import API from "../api";

export default function UploadSample() {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        tags: "",
        genre: "",
        bpm: "",
        sample_key: "",
        is_public: false
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("audio", file);
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        try {
            const token = localStorage.getItem("token");
            await API.post("/uploads/upload", data, {
                headers: { "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                 }
            });
            alert("Upload Successful");

        }catch (err) {
            console.error(err);
            alert("Upload Failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept="audio/*" onChange={handleFileChange} required/>
            
            {/* Preview before upload */}
            {file && (
                <div style ={{marginTop: "1rem" }}>
                    <p>Preview:</p>
                    <audio controls src ={URL.createObjectURL(file)} />
                </div>
            )}

            <input name="tags" placeholder="Tags" onChange={handleChange} />
            <input name="genre" placeholder="Genre" onChange={handleChange} />
            <input name="bpm" placeholder="BPM" type="number" onChange={handleChange} />
            <input name="sample_key" placeholder="Key" onChange={handleChange} />
            <label>
                Public?
                <input type="checkbox" name="is_public" onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })} />
            </label>
            <button type="submit">Upload</button>

        </form>
    )
}