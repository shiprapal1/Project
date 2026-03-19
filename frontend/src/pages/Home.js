import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home">
      
      {/* HERO */}
      <div className="hero reveal">
        <div className="shield">✔</div>
        <h1>TrustTrack</h1>
        <p>A Smart Civic Platform for Secure Item Recovery</p>

        <div className="hero-buttons">
          <button
            className="lost"
            onClick={() => navigate("/report-lost")}
          >
            Report Lost Item
          </button>
          <button
            className="found"
            onClick={() => navigate("/report-found")}
          >
            Report Found Item
          </button>
        </div>
      </div>

      {/* WORK SECTION */}
      <h2 className="work-title reveal">How TrustTrack Works</h2>

<div className="work-cards">
  {[
    ["📦", "Report Lost Items", "Quickly report your lost items with detailed descriptions", "/report-lost"],
    ["📍", "Location Tracking", "Track your item recovery process step-by-step", "/track"],
    ["✅", "Smart Matching", "AI-powered matching between lost and found items", "/matches"],
    ["🛡️", "Secure Verification", "Verify ownership before returning items", "/verification"],
    ["👥", "Community Network", "Explore nearby lost & found reports", "/community"],
    ["📊", "Analytics Dashboard", "View recovery insights and stats", "/dashboard"],
  ].map((item, index) => (
    <div
      className="work-card reveal"
      key={index}
      onClick={() => navigate(item[3])}
      style={{ cursor: "pointer" }}
    >
      <div className="icon-box">{item[0]}</div>
      <h3>{item[1]}</h3>
      <p>{item[2]}</p>
    </div>
  ))}
</div>

      {/* TRUSTED SECTION */}
      <div className="trusted-section reveal">
        <h2>Trusted by Communities Nationwide</h2>

        <div className="trusted-stats">
          <div className="stat">
            <h3>10,000+</h3>
            <p>Items Recovered</p>
          </div>

          <div className="stat">
            <h3>95%</h3>
            <p>Match Accuracy</p>
          </div>

          <div className="stat">
            <h3>50+</h3>
            <p>Partner Authorities</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;