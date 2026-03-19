import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LostFound.css";

function ReportLost() {
  const navigate = useNavigate();

  const [lostItem, setLostItem] = useState({
    itemName: "",
    category: "",
    color: "",
    brand: "",
    uniqueId: "",
    location: "",
    date: "",
    description: "",
    status: "Pending",
    matches: 0,
  });

  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    if (auth !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setLostItem({ ...lostItem, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const oldItems = JSON.parse(localStorage.getItem("lostItems")) || [];

  //   localStorage.setItem(
  //     "lostItems",
  //     JSON.stringify([...oldItems, lostItem])
  //   );

  //   alert("Lost item reported successfully!");
  //   navigate("/lost-item");
  // };

  const handleSubmit = (e) => {
  e.preventDefault();

  // ✅ Create structured object (IMPORTANT)
  const newItem = {
    id: "TT-" + Date.now(),   // unique case ID
    name: lostItem.itemName,
    category: lostItem.category,
    color: lostItem.color,
    brand: lostItem.brand,
    uniqueId: lostItem.uniqueId,
    location: lostItem.location,
    date: lostItem.date,
    description: lostItem.description,
    status: "Reported",   // better than Pending
  };

  const oldItems = JSON.parse(localStorage.getItem("lostItems")) || [];

  localStorage.setItem(
    "lostItems",
    JSON.stringify([...oldItems, newItem])
  );

  alert("Lost item reported successfully!");

  navigate("/my-reports");   // ✅ IMPORTANT CHANGE
};

  return (
    <div className="lf-container">
      <form className="lf-form">
        <h2>Report Lost Item</h2>

        <input name="itemName" placeholder="Item Name" onChange={handleChange} required />

        <select name="category" onChange={handleChange} required>
          <option value="">Select Category</option>
          <option>Mobile</option>
          <option>Wallet</option>
          <option>ID Card</option>
          <option>Laptop</option>
          <option>Keys</option>
          <option>Other</option>
        </select>

        <input name="color" placeholder="Color" onChange={handleChange} />

        <input name="brand" placeholder="Brand / Model" onChange={handleChange} />

        <input
          name="uniqueId"
          placeholder="Unique ID (IMEI / Card No – optional)"
          onChange={handleChange}
        />

        <input name="location" placeholder="Lost Location" onChange={handleChange} required />

        <input type="date" name="date" onChange={handleChange} required />

        <textarea
          name="description"
          placeholder="Additional Description / Special Marks"
          onChange={handleChange}
          rows="4"
        ></textarea>

        <button type="submit" onClick={handleSubmit}>
          <span>Submit Lost Item</span>
        </button>
      </form>
    </div>
  );
}

export default ReportLost;