const Task = require("../models/Task");

// ─── GET ALL TASKS (with filter & sort) ──────
const getTasks = async (req, res) => {
  try {
    const { status, priority, sort } = req.query;

    // Build filter object
    let filter = { user: req.user._id };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Build sort object
    let sortOption = { createdAt: -1 }; // default: newest first
    if (sort === "dueDate") sortOption = { dueDate: 1 };
    if (sort === "priority") sortOption = { priority: -1 };

    const tasks = await Task.find(filter).sort(sortOption);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── CREATE TASK ──────────────────────────────
const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      priority,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── UPDATE TASK ──────────────────────────────
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── DELETE TASK ──────────────────────────────
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── DASHBOARD STATS ─────────────────────────
const getStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const total = await Task.countDocuments({ user: userId });
    const todo = await Task.countDocuments({ user: userId, status: "todo" });
    const inprogress = await Task.countDocuments({
      user: userId,
      status: "inprogress",
    });
    const done = await Task.countDocuments({ user: userId, status: "done" });
    const urgent = await Task.countDocuments({
      user: userId,
      priority: "urgent",
    });

    // Overdue tasks — dueDate is in the past AND task is not done
    const overdue = await Task.countDocuments({
      user: userId,
      dueDate: { $lt: new Date() },
      status: { $ne: "done" },
    });

    res.status(200).json({
      total,
      todo,
      inprogress,
      done,
      urgent,
      overdue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getStats };
