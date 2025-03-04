require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

const connectionString = config.connectionString.replace(
  "<testuser123>",
  process.env.DB_PASSWORD
);

mongoose
  .connect(connectionString)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const User = require("./models/user.model");
const Task = require("./models/task.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello world!" });
});

// Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({ error: true, message: "User already exists." });
  }

  const user = new User({ fullName, email, password });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Successful Registration!",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User does not exist" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid Credentials" });
  }
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.status(401).json({ error: true, message: "User not found" });
  }
  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createOn: isUser.createOn,
    },
    message: "",
  });
});

// Add Task
app.post("/add-task", authenticateToken, async (req, res) => {
  const { title, content, tags, isCompleted } = req.body; // Add isCompleted to the destructuring
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  try {
    const task = new Task({
      title,
      content: content || "",
      tags: tags || [],
      isCompleted: isCompleted || false, // Ensure isCompleted is handled
      userId: user._id,
    });

    await task.save();

    return res.json({ error: false, task, message: "Task added successfully" });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Edit Task
app.put("/edit-task/:taskId", authenticateToken, async (req, res) => {
  const taskId = req.params.taskId;
  const { title, content, tags, isPinned, isCompleted } = req.body; // Add isCompleted to the destructuring
  const { user } = req.user;

  if (
    !title &&
    !content &&
    !tags &&
    isPinned === undefined &&
    isCompleted === undefined
  ) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const task = await Task.findOne({ _id: taskId, userId: user._id });

    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    if (title) task.title = title;
    if (content !== undefined) task.content = content; // Allow content to be an empty string
    if (tags) task.tags = tags;
    if (isPinned !== undefined) task.isPinned = isPinned;
    if (isCompleted !== undefined) task.isCompleted = isCompleted; // Ensure isCompleted is handled

    await task.save();

    return res.json({
      error: false,
      task,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Error editing task:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// Get all tasks
app.get("/get-all-tasks", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const tasks = await Task.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.json({
      error: false,
      tasks,
      message: "Tasks retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// Delete Task
app.delete("/delete-task/:taskId", authenticateToken, async (req, res) => {
  const taskId = req.params.taskId;
  const { user } = req.user;

  try {
    const task = await Task.findOne({ _id: taskId, userId: user._id });

    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }
    await task.deleteOne({ _id: taskId, userId: user._id });
    return res.json({ error: false, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// Update IsPinned Value
app.put("/update-task-pinned/:taskId", authenticateToken, async (req, res) => {
  const taskId = req.params.taskId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const task = await Task.findOne({ _id: taskId, userId: user._id });

    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    task.isPinned = isPinned;

    await task.save();

    return res.json({
      error: false,
      task,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Error updating task pinned status:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// Update IsCompleted Value
app.put(
  "/update-task-completed/:taskId",
  authenticateToken,
  async (req, res) => {
    const taskId = req.params.taskId;
    const { isCompleted } = req.body;
    const { user } = req.user;

    try {
      const task = await Task.findOne({ _id: taskId, userId: user._id });

      if (!task) {
        return res.status(404).json({ error: true, message: "Task not found" });
      }

      task.isCompleted = isCompleted;

      await task.save();

      return res.json({
        error: false,
        task,
        message: "Task updated successfully",
      });
    } catch (error) {
      console.error("Error updating task completed status:", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  }
);

// Search for tasks
app.get("/search-tasks/", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: true, message: "Query is required" });
  }

  try {
    const matchingTasks = await Task.find({
      userId: user._id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });
    return res.json({
      error: false,
      tasks: matchingTasks,
      message: "Tasks matching the search query retrieved successfully",
    });
  } catch (error) {
    console.error("Error searching tasks:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
module.exports = app;
