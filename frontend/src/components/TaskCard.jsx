import { useState } from "react";
import ConfirmModal from "./ConfirmationModal";

const priorityStyles = {
  low: { background: "#F0FDF4", color: "#16A34A" },
  medium: { background: "#FFFBEB", color: "#D97706" },
  high: { background: "#FFF7ED", color: "#EA580C" },
  urgent: { background: "#FEF2F2", color: "#DC2626" },
};

const statusStyles = {
  todo: { background: "#EFF6FF", color: "#2563EB" },
  inprogress: { background: "#F5F3FF", color: "#7C3AED" },
  done: { background: "#F0FDF4", color: "#16A34A" },
};

const TaskCard = ({ task, onStatusChange, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || "",
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "",
  });
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "done";

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    await onEdit(task._id, editData);
    setSaving(false);
    setIsEditing(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    border: "1.5px solid #E2E8F0",
    borderRadius: "8px",
    fontSize: "13px",
    backgroundColor: "#F8FAFC",
    color: "#1E293B",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    marginBottom: "10px",
  };

  // ── EDIT MODE ──────────────────────────────────
  if (isEditing) {
    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1.5px solid #2563EB",
          borderRadius: "14px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
          }}
        >
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#2563EB" }}>
            ✏️ Editing Task
          </p>
          <button
            onClick={() => setIsEditing(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94A3B8",
              fontSize: "16px",
            }}
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <input
          type="text"
          name="title"
          value={editData.title}
          onChange={handleChange}
          placeholder="Task title"
          required
          style={inputStyle}
        />

        {/* Description */}
        <textarea
          name="description"
          value={editData.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          rows={2}
          style={{ ...inputStyle, resize: "none" }}
        />

        {/* Priority + Status */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <select
            name="priority"
            value={editData.priority}
            onChange={handleChange}
            style={{ ...inputStyle, marginBottom: 0, cursor: "pointer" }}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🟠 High</option>
            <option value="urgent">🔴 Urgent</option>
          </select>

          <select
            name="status"
            value={editData.status}
            onChange={handleChange}
            style={{ ...inputStyle, marginBottom: 0, cursor: "pointer" }}
          >
            <option value="todo">📌 To Do</option>
            <option value="inprogress">🔄 In Progress</option>
            <option value="done">✅ Done</option>
          </select>
        </div>

        {/* Due Date */}
        <input
          type="date"
          name="dueDate"
          value={editData.dueDate}
          onChange={handleChange}
          style={{ ...inputStyle, marginTop: "10px" }}
        />

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: saving ? "#93C5FD" : "#2563EB",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: "#F1F5F9",
              color: "#475569",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ── VIEW MODE ──────────────────────────────────
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1.5px solid #E8EDF5",
        borderRadius: "14px",
        padding: "20px",
        opacity: task.status === "done" ? 0.7 : 1,
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* Top Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "10px",
          gap: "8px",
        }}
      >
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: task.status === "done" ? "#94A3B8" : "#1E293B",
            lineHeight: 1.4,
            flex: 1,
            textDecoration: task.status === "done" ? "line-through" : "none",
          }}
        >
          {task.title}
        </h3>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <button
            onClick={() => setIsEditing(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "17px",
              color: "#040507",
              padding: "2px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2563EB")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#040507")}
            title="Edit task"
          >
            ✎
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
              color: "#040507",
              padding: "2px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#040507")}
            title="Delete task"
          >
            ✕
          </button>
        </div>
        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={showDeleteModal}
          taskTitle={task.title}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            onDelete(task._id);
            setShowDeleteModal(false);
          }}
        />
      </div>

      {/* Description */}
      {task.description && (
        <p
          style={{
            fontSize: "13px",
            color: "#64748B",
            marginBottom: "14px",
            lineHeight: 1.6,
          }}
        >
          {task.description}
        </p>
      )}

      {/* Badges */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginBottom: "14px",
        }}
      >
        <span
          style={{
            ...priorityStyles[task.priority],
            fontSize: "11px",
            padding: "4px 10px",
            borderRadius: "20px",
            fontWeight: 600,
          }}
        >
          {task.priority}
        </span>
        <span
          style={{
            ...statusStyles[task.status],
            fontSize: "11px",
            padding: "4px 10px",
            borderRadius: "20px",
            fontWeight: 600,
          }}
        >
          {task.status}
        </span>
      </div>

      {/* Due Date */}
      {task.dueDate && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "12px",
            marginBottom: "14px",
            color: isOverdue ? "#DC2626" : "#64748B",
            fontWeight: isOverdue ? 600 : 400,
          }}
        >
          <span>📅</span>
          <span>
            {new Date(task.dueDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            {isOverdue && " — overdue"}
          </span>
        </div>
      )}

      {/* Status Selector */}
      <div style={{ borderTop: "1px solid #F8FAFC", paddingTop: "12px" }}>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          style={{
            width: "100%",
            padding: "9px 12px",
            border: "1.5px solid #E2E8F0",
            borderRadius: "8px",
            fontSize: "13px",
            backgroundColor: "#F8FAFC",
            color: "#475569",
            cursor: "pointer",
            outline: "none",
            fontFamily: "inherit",
          }}
        >
          <option value="todo">📌 To Do</option>
          <option value="inprogress">🔄 In Progress</option>
          <option value="done">✅ Done</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
