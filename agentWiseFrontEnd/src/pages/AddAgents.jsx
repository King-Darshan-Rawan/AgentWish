import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddAgent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, mobile, password } = formData;
  
    if (!name || !email || !mobile || !password) {
      setError("Please fill all fields");
      return;
    }
  
    axios.post("http://localhost:5000/api/agents", formData)
      .then(() => {
        alert("Agent added successfully!");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to add agent. Please try again.");
      });
  };
  

  return (
    <>
    <div className="container mt-3">
  <button
    className="btn btn-outline-secondary d-flex align-items-center"
    onClick={() => navigate("/dashboard")}
  >
    <img
      src="https://cdn-icons-png.flaticon.com/512/93/93634.png" // Back arrow icon (or use your own logo)
      alt="Back"
      style={{ width: "20px", marginRight: "8px" }}
    />
    Back to Dashboard
  </button>
</div>
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Add New Agent</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="agentName"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="agentName">
            Name
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="email"
            id="agentEmail"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="agentEmail">
            Email
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="tel"
            id="agentMobile"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="+91xxxxxxxxxx"
          />
          <label className="form-label" htmlFor="agentMobile">
            Mobile Number (with country code)
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="agentPassword"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="agentPassword">
            Password
          </label>
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Add Agent
        </button>
      </form>
    </div>
    
    </>
  );
}
