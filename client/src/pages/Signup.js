import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      login(data);
      navigate("/events");
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;