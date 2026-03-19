import lostItems from "../data/lostItems";
import LostItemCard from "../components/LostItemCard";

function Dashboard() {
  return (
    <div className="dashboard">

      <h1>Welcome back, Demo User!</h1>
      <p>Track your lost items and manage claim submissions</p>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-card">3<br />Items Reported</div>
        <div className="stat-card">2<br />Matches Found</div>
        <div className="stat-card">1 Pending<br />Claims Status</div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button>Report Lost Item</button>
        <button>View Matches</button>
        <button>My Claims</button>
      </div>

      {/* My Lost Items */}
      <h2>My Lost Items</h2>

      {lostItems.map(item => (
        <LostItemCard
          key={item.id}
          item={item}
          showTracking={false}
        />
      ))}
    </div>
  );
}

export default Dashboard;
