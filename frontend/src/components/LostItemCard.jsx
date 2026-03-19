import { useNavigate } from "react-router-dom";

function LostItemCard({ item, showTracking }) {
  const navigate = useNavigate();

  return (
    <div className="item-card">
      <div className="item-left">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>

      <div className="item-right">
        <span className={`status ${item.status}`}>
          {item.status}
        </span>

        {showTracking && (
          <>
            <p className="matches">
              Matches Found: {item.matches}
            </p>

            {item.matches > 0 && (
              <button
                className="view-btn"
                onClick={() => navigate(`/matches/${item.id}`)}
              >
                View Matches
              </button>
            )}

            <ul className="timeline">
              <li className="done">Item Reported</li>
              <li className={item.matches > 0 ? "done" : ""}>
                Match Found
              </li>
              <li className={item.status === "resolved" ? "done" : ""}>
                Resolved
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default LostItemCard;
