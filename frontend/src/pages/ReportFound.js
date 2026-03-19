import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LostFound.css";

function ReportFound() {
  const navigate = useNavigate();

  const [foundItem, setFoundItem] = useState({
    itemName: "",
    category: "",
    description: "",
    location: "",
    date: "",
    contact: "",
  });

  // 🔐 Protect page (must be logged in)
  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    if (auth !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFoundItem({ ...foundItem, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault(); // 🚨 VERY IMPORTANT

  //   console.log("Found Item Submitted:", foundItem);

  //   // save data for status page
  //   localStorage.setItem("foundItem", JSON.stringify(foundItem));

  //   // redirect
  //   navigate("/found-status");
  // };
  const handleSubmit = (e) => {
  e.preventDefault();

  const newItem = {
    id: "TT-" + Date.now(),
    name: foundItem.itemName,
    category: foundItem.category,
    color: foundItem.color,
    brand: foundItem.brand,
    uniqueId: foundItem.uniqueId,
    location: foundItem.location,
    date: foundItem.date,
    description: foundItem.description,
    status: "Reported",
  };

  const oldItems = JSON.parse(localStorage.getItem("foundItems")) || [];

  localStorage.setItem(
    "foundItems",
    JSON.stringify([...oldItems, newItem])
  );

  alert("Found item reported successfully!");

  navigate("/my-reports");   // ✅ redirect here
};

  return (
    <div className="lf-container">
      <form className="lf-form" onSubmit={handleSubmit}>
        <h2>Report Found Item</h2>

        <input
          name="itemName"
          placeholder="Item Name"
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category (Wallet, Phone, ID)"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description (color, brand, marks)"
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Found Location"
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
        />

        <input
          name="contact"
          placeholder="Your Contact Number"
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Found Report</button>
      </form>
    </div>
  );
}

export default ReportFound;
