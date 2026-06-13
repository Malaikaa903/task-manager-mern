import { useState } from "react";

const AddTaskForm = ({ onAdd, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAdd(formData);
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1.5px solid #E2E8F0",
        borderRadius: "12px",
        padding: "20px 24px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1E293B" }}>
          New Task
        </h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            color: "#94A3B8",
          }}
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task title *"
            required
            style={{
              width: "100%",
              padding: "11px 14px",
              border: "1.5px solid #E2E8F0",
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: "#F8FAFC",
              outline: "none",
              color: "#1E293B",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            rows={2}
            style={{
              width: "100%",
              padding: "11px 14px",
              border: "1.5px solid #E2E8F0",
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: "#F8FAFC",
              outline: "none",
              color: "#1E293B",
              boxSizing: "border-box",
              resize: "none",
              fontFamily: "inherit",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={{
              padding: "11px 14px",
              border: "1.5px solid #E2E8F0",
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: "#F8FAFC",
              outline: "none",
              color: "#475569",
              cursor: "pointer",
            }}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🟠 High</option>
            <option value="urgent">🔴 Urgent</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            style={{
              padding: "11px 14px",
              border: "1.5px solid #E2E8F0",
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: "#F8FAFC",
              outline: "none",
              color: "#475569",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: "11px",
              backgroundColor: loading ? "#93C5FD" : "#2563EB",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: "11px",
              backgroundColor: "#F1F5F9",
              color: "#475569",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
