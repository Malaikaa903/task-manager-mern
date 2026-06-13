const ConfirmModal = ({ isOpen, onConfirm, onCancel, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "32px",
          width: "100%",
          maxWidth: "400px",
          margin: "0 16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "52px",
            height: "52px",
            backgroundColor: "#FEF2F2",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            margin: "0 auto 20px",
          }}
        >
          🗑️
        </div>

        {/* Text */}
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#1E293B",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Delete Task?
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#64748B",
            textAlign: "center",
            lineHeight: 1.6,
            marginBottom: "28px",
          }}
        >
          Are you sure you want to delete{" "}
          <span style={{ fontWeight: 600, color: "#1E293B" }}>
            "{taskTitle}"
          </span>
          ?
          <br />
          <span style={{ fontSize: "12px", color: "#94A3B8" }}>
            This action cannot be undone.
          </span>
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#F1F5F9",
              color: "#475569",
              border: "none",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#E2E8F0")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#F1F5F9")
            }
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#EF4444",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#DC2626")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#EF4444")
            }
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
