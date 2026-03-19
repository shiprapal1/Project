import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./Navbar.css";

function Navbar({ isAuth, setIsAuth }) {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("isAuth");
    setIsAuth(false);
  };

  // Scroll to top on route change (smooth experience)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-circle">
          <span>✓</span>
        </div>
        <h2 className="logo-text">TrustTrack</h2>
      </div>

      <div className="nav-right">
        {!isAuth ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-btn">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/my-reports" className="nav-link">My Reports</Link>
            <Link to="/profile" className="nav-link">Profile</Link>

            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;