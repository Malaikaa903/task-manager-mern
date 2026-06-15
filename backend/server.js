const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://task-manager-mern-cyan.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running..." });
});

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));
// Task Routes
app.use("/api/tasks", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
