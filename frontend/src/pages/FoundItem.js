import "./FoundStatus.css";
import { useNavigate } from "react-router-dom";

function MyFoundItems() {
  const navigate = useNavigate();

  // TEMP data (later replace with backend / localStorage)
  const foundItem = JSON.parse(localStorage.getItem("foundItem"));

  if (!foundItem) {
    return <p style={{ textAlign: "center" }}>No found items reported.</p>;
  }

  return (
    <div className="found-container">
      <div className="success-box">
        <h2>✔ Found Item Reported Successfully</h2>
        <p>
          Thank you for helping return a lost item. Your report is now under
          review.
        </p>
      </div>

      <div className="found-card">
        <h3>{foundItem.itemName}</h3>
        <p className="category">{foundItem.category}</p>

        <div className="found-details">
          <p><strong>Location:</strong> {foundItem.location}</p>
          <p><strong>Date:</strong> {foundItem.date}</p>
          <p><strong>Status:</strong> <span className="pending">Waiting for Match</span></p>
        </div>
      </div>

      <div className="next-steps">
        <h4>What happens next?</h4>
        <ul>
          <li>System searches for matching lost reports</li>
          <li>Owner gets notified if matched</li>
          <li>Authority verification (if required)</li>
        </ul>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate("/")}>Go to Home</button>
        <button className="secondary">View Matches</button>
      </div>
    </div>
  );
}

export default MyFoundItems;
