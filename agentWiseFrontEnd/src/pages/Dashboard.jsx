import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import AgentDetails from "./AgentDetails";

export default function Dashboard() {
  const [leftWidth, setLeftWidth] = useState(300);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const containerRef = useRef(null);
  const isResizing = useRef(false);

  // Start resizing
  const onMouseDown = () => {
    isResizing.current = true;
  };

  // Resize handler
  const onMouseMove = (e) => {
    if (!isResizing.current) return;

    const container = containerRef.current;
    if (container) {
      let newWidth = e.clientX - container.getBoundingClientRect().left;
      const minWidth = 100;
      const maxWidth = container.getBoundingClientRect().width - 100;
      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      setLeftWidth(newWidth);
    }
  };

  // Stop resizing
  const onMouseUp = () => {
    isResizing.current = false;
  };

  // Attach and cleanup global mouse event listeners
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Fetch agents on mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/agents")
      .then(res => {
        setAgents(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        height: "90vh",
        width: "99vw",
        userSelect: isResizing.current ? "none" : "auto",
      }}
    >
      {/* Left pane */}
      <div
        style={{
          width: leftWidth,
          backgroundColor: "#f0f0f0",
          padding: "1rem",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <h4 className="mb-3">Agents</h4>
        {agents.length === 0 ? (
          <p>No agents found</p>
        ) : (
          <ul className="list-group">
            {agents.map((agent) => (
              <li
                key={agent._id}
                className={`list-group-item list-group-item-action ${
                  selectedAgent?._id === agent._id ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedAgent(agent)}
              >
                {agent.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Splitter */}
      <div
        onMouseDown={onMouseDown}
        style={{
          width: "5px",
          cursor: "col-resize",
          backgroundColor: "#ccc",
        }}
      />

      {/* Right pane */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: "1rem",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <AgentDetails agent={selectedAgent} />
      </div>
    </div>
  );
}
