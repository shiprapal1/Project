import { useNavigate, Link } from "react-router-dom";
//import "./App.css";

function Login({ setIsAuth }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isAuth", "true");
    setIsAuth(true);
    navigate("/");
  };

  
  return (
    <div className="auth-container">
      <div className="bg-blur-circle"></div>
      <div className="bg-blur-circle two"></div>

      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>
        <p>Secure login to TrustTrack</p>

        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />

        <button type="submit">
          <span>Login</span>
        </button>

        <p className="auth-footer">
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;