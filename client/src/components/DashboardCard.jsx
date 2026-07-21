const DashboardCard = ({ title, value, color }) => {
  return (
    <div className={`card border-0 shadow text-white bg-${color}`}>
      <div className="card-body text-center">
        <h5>{title}</h5>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default DashboardCard;