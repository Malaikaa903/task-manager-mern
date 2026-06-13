const StatsBar = ({ stats }) => {
  const cards = [
    {
      label: "Total Tasks",
      value: stats?.total || 0,
      sub: "All tasks",
      bg: "#d7e4f7",
      color: "#2563EB",
    },
    {
      label: "In Progress",
      value: stats?.inprogress || 0,
      sub: "Active now",
      bg: "#fcf5da",

      color: "#D97706",
    },
    {
      label: "Completed",
      value: stats?.done || 0,
      sub: "Well done!",
      bg: "#dbf9e4",
      color: "#16A34A",
    },
    {
      label: "Overdue",
      value: stats?.overdue || 0,
      sub: "Needs attention",
      bg: "#f8d6d6",
      color: "#DC2626",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            backgroundColor: card.bg,
            borderRadius: "12px",
            padding: "16px 20px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#64748B",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {card.label}
          </p>
          <p style={{ fontSize: "28px", fontWeight: 600, color: card.color }}>
            {card.value}
          </p>
          <p style={{ fontSize: "11px", color: "#64748B", marginTop: "4px" }}>
            {card.sub}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
