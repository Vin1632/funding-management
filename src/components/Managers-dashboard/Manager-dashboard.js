import React, { useState } from "react";
import "../../styles/Admin-dashboard.css";
import "../../styles/dashboard.css";
import logo from '../../assets/FundDocker_logo.jpg';
import accountIcon from  '../../assets/account-icon-11.jpg';
import backgroundImage from '../../assets/sea-background.jpg'
import '../../styles/Managers-dashboard.css';

import { useNavigate, useLocation } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";

import PostAds from "./PostAds";
import Reviewapplications from "./Review-applications";
import ManagersHome from "./ManagersHome";
import About from "../About";

const ManagerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Home");
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from the URL query parameter
  const searchParams = new URLSearchParams(location.search);
  const userEmail = searchParams.get('email');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Description:", description);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // Logging out 
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Manager-dashboard">
      <div className="floating-background-image">
        <img src={backgroundImage} alt="Background" />
      </div>

      <div className="navbar">
        <div className="navbar-left">
          <ul>
            <li><img src={logo} width="200" height="34px" alt="Logo" /></li>
            <div className="tab-buttons">
              <button
                className={selectedTab === "Home" ? "active" : ""}
                onClick={() => handleTabChange("Home")}
              >
                Home
              </button>

              <button
                className={selectedTab === "Advertise funding" ? "active" : ""}
                onClick={() => handleTabChange("Advertise funding")}
              >
                Advertise Funding
              </button>

              <button
                className={selectedTab === "Review Applications" ? "active" : ""}
                onClick={() => handleTabChange("Review Applications")}
              >
                Review Applications
              </button>

              <button
                className={selectedTab === "About" ? "active" : ""}
                onClick={() => handleTabChange("About")}
              >
                About
              </button>
            </div>
          </ul>
        </div>

        <div className="navbar-right">
          <ul className="dropdown">
            <button><img src={accountIcon} alt="Account" /></button>
            <ul className="content">
              <li><a href="#">Profile</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#" onClick={handleLogout}>Logout</a></li>
            </ul>
          </ul>
        </div>
      </div>
        <div className="tab-content">
          {selectedTab === "Home" && <ManagersHome email={userEmail}/>}
          {selectedTab === "Advertise funding" && <PostAds />}
          {selectedTab === "Review Applications" && <Reviewapplications/>}
          {selectedTab === "About" && <About/>}
        </div>
      </div>
  );
};

export default ManagerDashboard;
