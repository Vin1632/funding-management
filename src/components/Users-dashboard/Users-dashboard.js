import React, { useState, useEffect } from "react";
import "../../styles/Admin-dashboard.css";
import "../../styles/dashboard.css";
import logo from '../../assets/FundDocker_logo.jpg';
import accountIcon from  '../../assets/account-icon-11.jpg';
import backgroundImage from '../../assets/sea-background.jpg';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";
import FindFunder from "./FindFunder";
import UsersHome from "./Users-home";
import About from "../About";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UsersDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Home");
  const [applicationData, setApplicationData] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userEmail = searchParams.get("email");

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // Polling function to fetch application data every 5 seconds
  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await fetch('/api/trackstatus', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Email: userEmail })
        });
        const data = await response.json();

        if (JSON.stringify(data) !== JSON.stringify(applicationData)) {
          if (applicationData.length > 0) {
            toast("You have new updates on application status");
          }
          setApplicationData(data);
        }
      } catch (error) {
        console.error('Error fetching application data:', error);
      }
    };

    const intervalId = setInterval(fetchApplicationData, 5000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [applicationData, userEmail]);

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
    <div className="Users-dashboard">
      <div className="floating-background-image">
        <img src={backgroundImage} alt="background" />
      </div>

      <div className="navbar">
        <div className="navbar-left">
            <ul>
                <li><img src={logo} width="200" height="34px" alt="logo" /></li>
                <div className="tab-buttons">
                <button
                  className={selectedTab === "Home" ? "active" : ""}
                  onClick={() => handleTabChange("Home")}
                >
                  Home
                </button>

                <button
                  className={selectedTab === "Funding Oppurtunities" ? "active" : ""}
                  onClick={() => handleTabChange("Funding Oppurtunities")}
                >
                  Funding Oppurtunities
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
                <button><img src={accountIcon} alt="account" /></button>
                <ul className="content">
                    <a href="#">Profile</a>
                    <a href="#">Settings</a>
                    <a href="#" onClick={() => handleLogout()}>Logout</a>
                </ul>
            </ul>
        </div>
      </div>

      <div className="tab-content">
        {selectedTab === "Home" && <UsersHome email={userEmail} />}
        {selectedTab === "Funding Oppurtunities" && <FindFunder />}
        {selectedTab === "About" && <About />}
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default UsersDashboard;
