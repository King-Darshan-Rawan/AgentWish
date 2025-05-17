import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AgentDetails({ agent }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (agent?._id) {
      axios
        .get(`http://localhost:5000/api/tasks/${agent._id}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error("Failed to fetch tasks:", err));
    }
  }, [agent]);

  const handleComplete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  return (
    <div className="p-3 border rounded bg-light">
      {agent ? (
        <>
          <h4>{agent.name}</h4>
          <p><strong>Email:</strong> {agent.email}</p>
          <p><strong>Mobile:</strong> {agent.mobileNumber}</p>

          <h5 className="mt-4">Assigned Tasks</h5>
          <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
            {tasks.length === 0 ? (
              <p>No tasks assigned to this agent yet.</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2"
                >
                  <div>
                    <p className="mb-1"><strong>{task.fullname}</strong></p>
                    <p className="mb-1">{task.mobileNumber}</p>
                    <p className="mb-1"><em>{task.note}</em></p>
                  </div>
                  <button className="btn btn-sm btn-success" onClick={() => handleComplete(task._id)}>
                    Completed
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <p>Select an agent to view details.</p>
      )}
    </div>
  );
}
