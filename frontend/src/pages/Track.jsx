import lostItems from "../data/lostItems";
import LostItemCard from "../components/LostItemCard";
import "./track.css";

function Track() {
  return (
    <div className="track-page">
      <div className="track-header">
        <div>
          <h1>Track My Items</h1>
          <p>Check progress and updates for your reported lost items</p>
        </div>

        <button className="report-btn">+ Report New Item</button>
      </div>

      <div className="track-grid">
        {lostItems.map((item) => (
          <LostItemCard
            key={item.id}
            item={item}
            showTracking={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Track;