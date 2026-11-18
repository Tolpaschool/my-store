function StatCard({ title, value, icon }) {
  return (
    <div className="stat">
      <span className="stat-icon">{icon}</span>
      <div>
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;