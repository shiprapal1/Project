import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Register({ setIsAuth }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(formData));
    localStorage.setItem("isAuth", "true");

    setIsAuth(true);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Secure Account</h2>

        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          name="middleName"
          placeholder="Middle Name"
          value={formData.middleName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Mobile Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;