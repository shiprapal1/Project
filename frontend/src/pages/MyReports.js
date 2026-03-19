import "./MyReports.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyReports() {
  const [activeTab, setActiveTab] = useState("lost");
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch data from localStorage
  useEffect(() => {
    const lost = JSON.parse(localStorage.getItem("lostItems")) || [];
    const found = JSON.parse(localStorage.getItem("foundItems")) || [];

    setLostItems(lost);
    setFoundItems(found);
  }, []);

  // ✅ Status color logic
  const getStatusColor = (status) => {
    switch (status) {
      case "Reported":
        return "red";
      case "Matching":
        return "orange";
      case "Potential Match":
        return "blue";
      case "Verified":
        return "green";
      default:
        return "gray";
    }
  };

  // ✅ Select items based on tab
  const itemsToShow = activeTab === "lost" ? lostItems : foundItems;

  return (
    <div className="reports-page">
      <h1>My Reports</h1>
      <p>Manage and track all your lost & found items</p>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "lost" ? "active" : ""}
          onClick={() => setActiveTab("lost")}
        >
          Lost Items
        </button>

        <button
          className={activeTab === "found" ? "active" : ""}
          onClick={() => setActiveTab("found")}
        >
          Found Items
        </button>
      </div>

      {/* Cards */}
      <div className="cards-container">
        {itemsToShow.length === 0 ? (
          <p className="no-data">No reports found</p>
        ) : (
          itemsToShow.map((item) => (
            <div className="report-card" key={item.id}>
              <div className="card-header">
                {/* <h3>{item.name}</h3> */}
                <h3>{item.name || item.itemName}</h3>
                <span
                  className="status"
                  style={{ backgroundColor: getStatusColor(item.status) }}
                >
                  {item.status}
                </span>
              </div>

              <p><strong>Case ID:</strong> {item.id}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Color:</strong> {item.color}</p>
              <p><strong>Brand:</strong> {item.brand}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date:</strong> {item.date}</p>
              <p><strong>Description:</strong> {item.description}</p>

              <button
                className="view-btn"
                onClick={() => navigate(`/track/${item.id}`)}
              >
                View Details →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyReports;