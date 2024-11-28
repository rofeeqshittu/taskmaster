// backend/routes/tasks.js

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

// Get Tasks Route (Protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create Task Route (Protected)
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, deadline, priority } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      deadline,
      priority,
      user: req.userId,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

