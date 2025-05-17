import express from 'express';
const router = express.Router();
import Agent from './../models/Agent.js';
import bcrypt from 'bcryptjs';

// POST /api/agents - Add a new agent
router.post('/', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await Agent.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Agent with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    await newAgent.save();
    res.status(201).json({ message: 'Agent added successfully', agent: newAgent });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

// GET /api/agents - Fetch all agents
router.get('/', async (req, res) => {
    try {
      const agents = await Agent.find();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

export default router;