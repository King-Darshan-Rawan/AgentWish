import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import Agents from './pages/Agents'
import AddAgent from "./pages/AddAgents";
import SingUP from "./pages/SingUp";
import Navbar from "./components/Navbar";
import React from "react";
import AssignTask from "./pages/AssignTask";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SingUP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/agents" element={<Agents />} /> */}
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/assign-tasks" element={<AssignTask />} />
      </Routes>
    </Router>
  );
}

export default App;
