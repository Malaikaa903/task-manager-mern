import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import StatsBar from "../components/StatsBar";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    try {
      let tasksUrl = "/tasks";

      // Handle special filters
      if (filter === "urgent") {
        tasksUrl = "/tasks?priority=urgent";
      } else if (filter === "overdue") {
        tasksUrl = "/tasks";
      } else if (filter !== "all") {
        tasksUrl = `/tasks?status=${filter}`;
      }

      const [tasksRes, statsRes] = await Promise.all([
        API.get(tasksUrl),
        API.get("/tasks/stats"),
      ]);

      let fetchedTasks = tasksRes.data;

      // Filter overdue on frontend
      if (filter === "overdue") {
        fetchedTasks = fetchedTasks.filter(
          (t) =>
            t.dueDate &&
            new Date(t.dueDate) < new Date() &&
            t.status !== "done",
        );
      }

      setTasks(fetchedTasks);
      setStats(statsRes.data);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const handleAdd = async (formData) => {
    try {
      await API.post("/tasks", formData);
      toast.success("Task added! ✅");
      fetchData();
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await API.put(`/tasks/${id}`, { status });
      setTasks(tasks.map((t) => (t._id === id ? response.data : t)));
      toast.success("Status updated!");
      fetchData();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };
  const handleEdit = async (id, updatedData) => {
    try {
      const response = await API.put(`/tasks/${id}`, updatedData);
      setTasks(tasks.map((t) => (t._id === id ? response.data : t)));
      toast.success("Task updated! ✅");
      fetchData();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };
  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task deleted!");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const filterLabels = {
    all: "Dashboard",
    todo: "To Do",
    inprogress: "In Progress",
    done: "Completed",
    urgent: "Urgent Tasks",
    overdue: "Overdue Tasks",
  };

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar stats={stats} activeFilter={filter} onFilterChange={setFilter} />

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="topbar">
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: 600, color: "#1E293B" }}>
              {filterLabels[filter]}
            </h1>
            <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px" }}>
              {today}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "13px", color: "#64748B" }}>
              👋 Hello,{" "}
              <span style={{ fontWeight: 600, color: "#1E293B" }}>
                {user?.name}
              </span>
            </span>
            <button
              onClick={() => setShowForm(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#2563EB",
                color: "white",
                border: "none",
                padding: "9px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Add Task
            </button>
          </div>
        </div>

        {/* Content */}

        <div className="content-area">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div>
              <h2
                style={{
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "6px",
                }}
              >
                Welcome back, {user?.name?.split(" ")[0]}! 👋
              </h2>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>
                You have{" "}
                <span style={{ fontWeight: 700, color: "white" }}>
                  {stats?.todo || 0} tasks
                </span>{" "}
                to do and{" "}
                <span style={{ fontWeight: 700, color: "#FCA5A5" }}>
                  {stats?.overdue || 0} overdue
                </span>
                . Keep going! 🚀
              </p>
            </div>

            <div className="welcome-emoji">📋</div>
          </div>
          {/* Stats */}
          <StatsBar stats={stats} />

          {/* Add Task */}
          <AddTaskForm
            onAdd={handleAdd}
            isOpen={showForm}
            onClose={() => setShowForm(false)}
          />

          {/* Tasks Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#1E293B" }}>
              {filterLabels[filter]}{" "}
              <span style={{ fontWeight: 400, color: "#94A3B8" }}>
                ({tasks.length} tasks)
              </span>
            </h2>
          </div>

          {/* Tasks */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>⏳</div>
              <p style={{ color: "#94A3B8", fontSize: "14px" }}>
                Loading tasks...
              </p>
            </div>
          ) : tasks.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📋</div>
              <p style={{ color: "#1E293B", fontWeight: 500 }}>
                No tasks here!
              </p>
              <p
                style={{ color: "#94A3B8", fontSize: "13px", marginTop: "4px" }}
              >
                Add your first task using the button above.
              </p>
            </div>
          ) : (
            <div className="tasks-grid">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
