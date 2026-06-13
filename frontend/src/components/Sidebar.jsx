import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Sidebar = ({ stats, activeFilter, onFilterChange }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
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

  const sidebarStyle = {
    width: "224px",
    backgroundColor: "white",
    borderRight: "1px solid #F1F5F9",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 20,
  };

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
      activeFilter === value ? (isUrgent ? "#DC2626" : "#2563EB") : "#64748B",
    border: "none",
    textAlign: "left",
    transition: "all 0.15s",
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
    <div style={sidebarStyle}>
      {/* Logo */}
      <div style={{ padding: "20px 16px", borderBottom: "1px solid #F1F5F9" }}>
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
          <span style={{ fontWeight: 600, fontSize: "15px", color: "#1E293B" }}>
            TaskManager
          </span>
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: "16px 8px", overflowY: "auto" }}>
        {/* Main */}
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#0f1013",
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
            onClick={() => onFilterChange(item.value)}
            style={getNavStyle(item.value)}
          >
            <span style={{ fontSize: "15px" }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            <span style={getBadgeStyle(item.value)}>{item.count}</span>
          </button>
        ))}

        {/* Priority */}
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#0f1013",
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
            onClick={() => onFilterChange(item.value)}
            style={getNavStyle(item.value, true)}
          >
            <span style={{ fontSize: "15px" }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.count > 0 && (
              <span style={getBadgeStyle(item.value, true)}>{item.count}</span>
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
  );
};

export default Sidebar;
