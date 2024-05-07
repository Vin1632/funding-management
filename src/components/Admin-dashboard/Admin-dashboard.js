import React, { useState } from "react";
import "../../styles/Admin-dashboard.css";
import "../../styles/dashboard.css";
import logo from '../../assets/FundDocker_logo.jpg';
import accountIcon from  '../../assets/account-icon-11.jpg';
import backgroundImage from '../../assets/sea-background.jpg'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";
import ManageUsers from "./ManageUsers";
import ManageManagers from "./ManageFundManagers";
import About from "../About";


const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Home");
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email")

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
    
    <div className="admin-dashboard">
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
                  className={selectedTab === "Users" ? "active" : ""}
                  onClick={() => handleTabChange("Users")}
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
          {selectedTab === "Home" && <div>signed in with:{email}</div>}
          {selectedTab === "Users" && <ManageUsers />}
          {selectedTab === "Managers" && <ManageManagers/>}
          {selectedTab === "About" && <About/>}
        </div>
      </div>
  );
};

export default AdminDashboard;
