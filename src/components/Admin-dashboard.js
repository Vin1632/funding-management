import React, { useState } from "react";
import "../styles/Admin-dashboard.css";
import "../styles/dashboard.css";
import logo from '../assets/FundDocker_logo.jpg';
import accountIcon from  '../assets/account-icon-11.jpg';
import backgroundImage from '../assets/sea-background.jpg'


const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("approveManagers");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    
    <div className="admin-dashboard">
        <div className="floating-background-image">
<img src={backgroundImage}></img>
</div>

<div className="navbar">
<div className="navbar-left">
    <ul>
        <li><img src={logo} width="200" height="20px"></img></li>
        <li><a href="#">Home</a> </li>
        <li><a href="#">About</a> </li>
    </ul>
</div>
<div className="navbar-right">
    <ul className="dropdown">
        <button><img src={accountIcon}></img></button>
        <ul className="content">
            <a href="#">Profile</a>
            <a href="#">Funding</a>
            <a href="#">Users</a>
            <a href="#">Access</a>
            <a href="#">Logout</a>
        </ul>
    </ul>
    </div>
</div>

      <div className="tab-buttons">
        <button
          className={selectedTab === "approveManagers" ? "active" : ""}
          onClick={() => handleTabChange("approveManagers")}
        >
          Approve Managers
        </button>
        <button
          className={selectedTab === "reviewManagers" ? "active" : ""}
          onClick={() => handleTabChange("reviewManagers")}
        >
          Review Managers
        </button>
        <button
          className={selectedTab === "manageUsers" ? "active" : ""}
          onClick={() => handleTabChange("manageUsers")}
        >
          Manage Users
        </button>
        <button
          className={selectedTab === "managePermissions" ? "active" : ""}
          onClick={() => handleTabChange("managePermissions")}
        >
          Manage User Permissions
        </button>
      </div>
      <div className="tab-content">
        {selectedTab === "approveManagers" && <div>Content for Approve Managers</div>}
        {selectedTab === "reviewManagers" && <div>Content for Review Managers</div>}
        {selectedTab === "manageUsers" && <div>Content for Manage Users</div>}
        {selectedTab === "managePermissions" && <div>Content for Manage User Permissions</div>}
      </div>
    </div>
  );
};

export default AdminDashboard;
