import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home_page">
      <h4>Home Page</h4>
      <button onClick={() => navigate("/signup")}>
        <FaUserPlus className="icon_button" />
        Signup
      </button>
      <button onClick={() => navigate("/login")}>
        <FaSignInAlt className="icon_button" />
        Login
      </button>
    </div>
  );
};

export default Home;