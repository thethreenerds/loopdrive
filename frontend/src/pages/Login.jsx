import React, {useState} from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [form, setForm] = useState({ email: "", password: ""})
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            
            alert("Login Successful");
            navigate("/dashboard");
        }catch (err) {
            console.error(err);
            setError("Invalid email or password");
        }
    };

    return (
         <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>

    );
}