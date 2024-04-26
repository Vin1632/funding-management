import React, { useState } from "react";
import "../../styles/Admin-dashboard.css";
import "../../styles/dashboard.css";
import logo from '../../assets/FundDocker_logo.jpg';
import accountIcon from  '../../assets/account-icon-11.jpg';
import backgroundImage from '../../assets/sea-background.jpg'

import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";
import PostAds from "./PostAds";



const ManagerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Home");


  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  //logging out 
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
        <img src={backgroundImage}></img>
      </div>

      <div className="navbar">
        <div className="navbar-left">
            <ul>
                <li><img src={logo} width="200" height="34px"></img></li>
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
                  Users
                </button>

                <button
                  className={selectedTab === "Managers" ? "active" : ""}
                  onClick={() => handleTabChange("Managers")}
                >
                  Managers
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
                <button><img src={accountIcon}></img></button>
                <ul className="content">
                    <a href="#">Profile</a>
                    <a href="#">Settings</a>
                    <a href="#" onClick={() => handleLogout() }>Logout</a>
                </ul>
            </ul>
        </div>
  </div>


        <div className="tab-content">
          {selectedTab === "Home" && <div>Content for home</div>}
          {selectedTab === "Advertise funding" && <PostAds />}
          {selectedTab === "Managers" && <div></div>}
          {selectedTab === "About" && <div>Content for About</div>}
        </div>
      </div>
  );
};

export default ManagerDashboard;