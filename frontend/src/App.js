import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import LostItem from "./pages/LostItem";
import FoundItem from "./pages/FoundItem";
import MyReports from "./pages/MyReports";
import Track from "./pages/Track";
import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    if (auth === "true") setIsAuth(true);
  }, []);

  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/register" element={<Register setIsAuth={setIsAuth} />} />
        <Route path="/profile" element={<Profile />} />

        {/* Forms */}
        <Route path="/report-lost" element={<ReportLost />} />
        <Route path="/report-found" element={<ReportFound />} />

        {/* Track / My Items */}
        <Route path="/lost-item" element={<LostItem />} />
        <Route path="/track" element={<LostItem />} />
        <Route path="/track/:id" element={<Track />} />

        {/* Found item success */}
        <Route path="/found-item" element={<FoundItem />} />

        <Route path="/my-reports" element={<MyReports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
