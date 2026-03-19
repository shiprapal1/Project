import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LostItem0.css";

function MyLostItems() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("lostItems")) || [];
    setItems(data);

    // Trigger animation after render
    // setTimeout(() => {
    //   const cards = document.querySelectorAll(".item-card");
    //   cards.forEach((card, index) => {
    //     card.style.animationDelay = `${index * 0.1}s`;
    //     card.classList.add("show");
    //   });
    // }, 100);


    setTimeout(() => {
  const cards = document.querySelectorAll(".item-card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
    card.classList.add("show");
  });
}, 100);

  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Have you found this item? This report will be deleted."
    );

    if (!confirmDelete) return;

    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("lostItems", JSON.stringify(updatedItems));
  };

  return (
    <div className="lost-items-page">
      <div className="header">
        <h2>My Lost Items</h2>

        <button
          className="report-btn"
          onClick={() => navigate("/report-lost")}
        >
          + Report New Item
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p>No lost items reported yet.</p>
        </div>
      ) : (
        items.map((item) => (
          <div className="item-card" key={item.id}>
            <div className="left">
              <h3>{item.itemName}</h3>
              <p className="category">{item.category}</p>
              <p><b>Location:</b> {item.location}</p>

              {item.matches > 0 && (
                <p className="view-match">
                  🔍 View {item.matches} potential match
                </p>
              )}
            </div>

            <div className="middle">
              <p><b>Date:</b> {item.date}</p>
              <p><b>Matches:</b> {item.matches || 0}</p>
            </div>

            <div className="right">
              <span
                className={`status ${
                  item.status?.toLowerCase() || "pending"
                }`}
              >
                {item.status || "Pending"}
              </span>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyLostItems;