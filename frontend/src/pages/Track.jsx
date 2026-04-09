import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./track.css";

function Track() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lostItem, setLostItem] = useState(null);
  const [matchingItems, setMatchingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch lost item from localStorage based on ID
    const lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];
    const foundItems = JSON.parse(localStorage.getItem("foundItems")) || [];

    // If ID is provided, show specific item details
    if (id) {
      const item = lostItems.find((item) => String(item.id) === String(id));
      setLostItem(item);

      if (item) {
        // Find all found items with the same category
        const lostCategory = item.category?.toLowerCase().trim();
        
        if (!lostCategory) {
          console.log("Lost item has no category!");
          setMatchingItems([]);
        } else {
          const matches = foundItems.filter((foundItem) => {
            const foundCategory = foundItem.category?.toLowerCase().trim();
            const isMatch = foundCategory === lostCategory;
            
            console.log(`Checking: ${foundItem.name} (${foundCategory}) vs Lost (${lostCategory}) = ${isMatch}`);
            
            return isMatch;
          });

          console.log("=== MATCHING RESULTS ===");
          console.log("Lost Item Category:", lostCategory);
          console.log("Total Found Items:", foundItems.length);
          console.log("Matching Items:", matches.length);
          console.log("Matched Items:", matches);

          setMatchingItems(matches);
        }
      } else {
        console.log("Lost item not found for ID:", id);
      }
    } else {
      // If no ID, show all lost items (fallback view)
      setLostItem(null);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="track-page"><p>Loading...</p></div>;
  }

  // If specific item is being viewed
  if (lostItem) {
    return (
      <div className="track-page">
        {/* Lost Item Details */}
        <div className="track-detail">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div className="lost-item-detail">
            <h2>{lostItem.name || lostItem.itemName}</h2>
            <span
              className="status-badge"
              style={{
                backgroundColor: getStatusColor(lostItem.status),
              }}
            >
              {lostItem.status}
            </span>

            <div className="item-details">
              <p>
                <strong>Case ID:</strong> {lostItem.id}
              </p>
              <p>
                <strong>Category:</strong> {lostItem.category}
              </p>
              <p>
                <strong>Color:</strong> {lostItem.color}
              </p>
              <p>
                <strong>Brand:</strong> {lostItem.brand}
              </p>
              <p>
                <strong>Location:</strong> {lostItem.location}
              </p>
              <p>
                <strong>Date:</strong> {lostItem.date}
              </p>
              <p>
                <strong>Description:</strong> {lostItem.description}
              </p>
            </div>

            {/* Timeline */}
            <div className="timeline">
              <h3>Status Timeline</h3>
              <ul>
                <li className="done">Item Reported</li>
                <li className={matchingItems.length > 0 ? "done" : ""}>
                  Match Found
                </li>
                <li
                  className={lostItem.status === "Verified" ? "done" : ""}
                >
                  Resolved
                </li>
              </ul>
            </div>
          </div>
        </div>

        {matchingItems.length > 0 && (
          <div className="matching-section">
            <h3>
              📦 Found Items in "{lostItem.category}" Category ({matchingItems.length})
            </h3>

            <div className="matching-items-grid">
              {matchingItems.map((item) => (
                <div className="matching-card" key={item.id}>
                  <div className="card-header">
                    <h4>{item.name || item.itemName}</h4>
                    <span className="found-badge">✓ Found</span>
                  </div>

                  <div className="card-details">
                    <p>
                      <strong>Category:</strong> {item.category}
                    </p>
                    <p>
                      <strong>Color:</strong> {item.color}
                    </p>
                    <p>
                      <strong>Brand:</strong> {item.brand}
                    </p>
                    <p>
                      <strong>Location:</strong> {item.location}
                    </p>
                    <p>
                      <strong>Date Found:</strong> {item.date}
                    </p>
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                  </div>

                  <button className="contact-btn">
                    📞 Contact Finder
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="track-page">
      <p>Please select an item to track.</p>
    </div>
  );
}

// Helper function to get status color
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

export default Track;