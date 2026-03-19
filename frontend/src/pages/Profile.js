import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    const storedUser = localStorage.getItem("user");

    if (!auth || !storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  const firstLetter = user.firstName?.charAt(0).toUpperCase();

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">{firstLetter}</div>
          <h2>{user.firstName} {user.lastName}</h2>
          <p className="email">{user.email}</p>
        </div>

        <div className="profile-info">
          <div className="profile-row">
            <span>First Name</span>
            <span>{user.firstName}</span>
          </div>

          <div className="profile-row">
            <span>Middle Name</span>
            <span>{user.middleName || "N/A"}</span>
          </div>

          <div className="profile-row">
            <span>Last Name</span>
            <span>{user.lastName}</span>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <span>{user.email}</span>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;