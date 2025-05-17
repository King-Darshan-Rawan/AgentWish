import express from 'express';
import multer from 'multer';
import Papa from 'papaparse';
import Task from '../models/Task.js';

const router = express.Router();

// Use multer memory storage (no disk writes)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/assignTasks
router.post('/assignTasks', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer.toString('utf8');
    const selectedAgents = JSON.parse(req.body.agents); // array of agent IDs

    if (!selectedAgents || !Array.isArray(selectedAgents) || selectedAgents.length === 0) {
      return res.status(400).json({ error: 'No agents selected' });
    }

    const parsed = Papa.parse(fileBuffer, {
      header: true,
      skipEmptyLines: true,
    });

    const rows = parsed.data;

    if (!rows || rows.length === 0) {
      return res.status(400).json({ error: 'CSV file is empty or invalid' });
    }

    // Distribute tasks round-robin (like second snippet)
    const tasksToInsert = rows.map((task, index) => ({
      agentId: selectedAgents[index % selectedAgents.length],
      fullname: task['Full Name'] || task['full name'] || '',
      mobileNumber: task['Mobile Number'] || task['mobile number'] || '',
      note: task['Note'] || task['note'] || '',
    }));

    await Task.insertMany(tasksToInsert);

    return res.status(200).json({ message: 'Tasks assigned and saved successfully' });
  } catch (error) {
    console.error('Error processing task assignment:', error);
    res.status(500).json({ error: 'Task assignment failed.' });
  }
});

// GET /tasks/:agentId - fetch tasks assigned to a specific agent
router.get("/tasks/:agentId", async (req, res) => {
    try {
      const { agentId } = req.params;
      const tasks = await Task.find({ agentId }); // note: matching `agentId` field
      res.json(tasks);
    } catch (err) {
      console.error("Error fetching tasks for agent:", err);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });
  


router.delete("/tasks/:id", async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: "Task deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  });
  

export default router;
