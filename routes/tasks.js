// routes/tasks.js

const express = require('express');
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');  // Protect route with authentication
const router = express.Router();

// Create a new task
router.post('/', protect, async (req, res) => {
  const { title, description, priority, deadline } = req.body;

  try {
    // Create a new task
    const task = new Task({
      title,
      description,
      priority,
      deadline,
      user: req.user.id,  // Get user from the JWT token
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tasks for the authenticated user
router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a task
router.put('/:id', protect, async (req, res) => {
  const { title, description, priority, deadline } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.deadline = deadline || task.deadline;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a task
router.delete('/:id', protect, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await task.remove();

    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search tasks by keyword in title or description
router.get('/search', protect, async (req, res) => {
  const { keyword } = req.query;

  try {
    const tasks = await Task.find({
      user: req.user.id,
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ],
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Filter tasks by priority or deadline
router.get('/filter', protect, async (req, res) => {
  const { priority, deadline } = req.query;

  try {
    const query = { user: req.user.id };

    if (priority) {
      query.priority = priority;
    }

    if (deadline) {
      query.deadline = { $lte: new Date(deadline) };
    }

    const tasks = await Task.find(query);

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

