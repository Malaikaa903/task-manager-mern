import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Sidebar = ({ stats, activeFilter, onFilterChange }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleFilterChange = (value) => {
    onFilterChange(value);
    setMobileOpen(false);
  };

  const navItems = [
    { label: "Dashboard", icon: "📊", value: "all", count: stats?.total || 0 },
    { label: "To Do", icon: "📌", value: "todo", count: stats?.todo || 0 },
    {
      label: "In Progress",
      icon: "🔄",
      value: "inprogress",
      count: stats?.inprogress || 0,
    },
    { label: "Done", icon: "✅", value: "done", count: stats?.done || 0 },
  ];

  const priorityItems = [
    { label: "Urgent", icon: "🔥", value: "urgent", count: stats?.urgent || 0 },
    {
      label: "Overdue",
      icon: "⚠️",
      value: "overdue",
      count: stats?.overdue || 0,
    },
  ];

  const getNavStyle = (value, isUrgent = false) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "8px",
    marginBottom: "2px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: activeFilter === value ? 600 : 400,
    backgroundColor:
      activeFilter === value
        ? isUrgent
          ? "#FEF2F2"
          : "#EFF6FF"
        : "transparent",
    color:
      activeFilter === value ? (isUrgent ? "#DC2626" : "#2563EB") : "#475569",
    border: "none",
    textAlign: "left",
  });

  const getBadgeStyle = (value, isUrgent = false) => ({
    marginLeft: "auto",
    fontSize: "11px",
    padding: "1px 8px",
    borderRadius: "20px",
    backgroundColor:
      activeFilter === value ? (isUrgent ? "#FEE2E2" : "#DBEAFE") : "#F1F5F9",
    color:
      activeFilter === value ? (isUrgent ? "#DC2626" : "#2563EB") : "#94A3B8",
  });

  return (
    <>
      {/* Hamburger Button */}
      <button className="hamburger" onClick={() => setMobileOpen(true)}>
        ☰
      </button>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? "mobile-open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <div className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        {/* Logo */}
        <div
          style={{
            padding: "20px 16px",
            borderBottom: "1px solid #F1F5F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#2563EB",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              T
            </div>
            <span
              style={{ fontWeight: 600, fontSize: "15px", color: "#1E293B" }}
            >
              TaskManager
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
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

        {/* Nav */}
        <div style={{ flex: 1, padding: "16px 8px", overflowY: "auto" }}>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "1px",
              padding: "0 12px",
              marginBottom: "6px",
            }}
          >
            Menu
          </p>

          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleFilterChange(item.value)}
              style={getNavStyle(item.value)}
            >
              <span style={{ fontSize: "15px" }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              <span style={getBadgeStyle(item.value)}>{item.count}</span>
            </button>
          ))}

          <p
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "1px",
              padding: "0 12px",
              marginBottom: "6px",
              marginTop: "20px",
            }}
          >
            Priority
          </p>

          {priorityItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleFilterChange(item.value)}
              style={getNavStyle(item.value, true)}
            >
              <span style={{ fontSize: "15px" }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.count > 0 && (
                <span style={getBadgeStyle(item.value, true)}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* User */}
        <div style={{ padding: "12px", borderTop: "1px solid #F1F5F9" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#EFF6FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2563EB",
                fontWeight: 600,
                fontSize: "13px",
                flexShrink: 0,
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1E293B",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.name}
              </p>
              <p style={{ fontSize: "11px", color: "#64748B" }}>Member</p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                color: "#94A3B8",
              }}
            >
              ➡️
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
