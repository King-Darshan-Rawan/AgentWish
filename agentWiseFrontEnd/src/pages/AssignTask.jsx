import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AssignTask() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/agents")
      .then(res => setAgents(res.data))
      .catch(console.error);
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const allowedTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel"
    ];

    if (!allowedTypes.includes(uploadedFile.type)) {
      alert("Only CSV, XLSX and XLS files are allowed!");
      return;
    }

    setFile(uploadedFile);
  };

  const handleAgentToggle = (id) => {
    setSelectedAgents(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file); // your file from file input
    formData.append("agents", JSON.stringify(selectedAgents)); // array of agent IDs
  
    try {
      const res = await axios.post(
        "http://localhost:5000/api/assignTasks",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      navigate("/dashboard");
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };
  

  return (
    <div className="d-flex" style={{ height: "90vh" }}>
      {/* Left 50% */}
      <div className="w-50 d-flex flex-column justify-content-between p-4" style={{ backgroundColor: "#f8f9fa" }}>
        <div>
          <button
            className="btn btn-outline-secondary mb-3"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>

          {/* <h2>Assign Tasks</h2> */}

          <div className="mb-3">
            <label><strong>Select File:</strong></label>
            <input type="file" className="form-control" onChange={handleFileChange} />
          </div>
        </div>

        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/upload-file-3483240-2912014.png"
          alt="Task Illustration"
          className="img-fluid"
          style={{ maxHeight: "400px", objectFit: "contain", padding: "20px", margin: "0px" }}
        />

        <button className="btn btn-primary mt-4" onClick={handleSubmit}>
          Assign Tasks
        </button>
      </div>

      {/* Right 50% */}
      <div className="w-50 p-4">
        <h4><strong>Select Agents:</strong></h4>
        <div style={{ maxHeight: "300px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
          {agents.map(agent => (
            <div key={agent._id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedAgents.includes(agent._id)}
                onChange={() => handleAgentToggle(agent._id)}
                id={`agent-${agent._id}`}
              />
              <label className="form-check-label" htmlFor={`agent-${agent._id}`}>
                {agent.name}
              </label>
            </div>
          ))}
        </div>

        {selectedAgents.length > 0 && (
          <>
            <h5 className="mt-4">Selected Agents:</h5>
            <ul className="list-group">
              {selectedAgents.map(id => {
                const agent = agents.find(a => a._id === id);
                return (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={id}>
                    {agent?.name}
                    <button className="btn btn-sm btn-danger" onClick={() => handleAgentToggle(id)}>
                      ✕
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
