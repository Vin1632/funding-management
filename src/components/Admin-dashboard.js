import React, { useState } from "react";
import "../styles/Admin-dashboard.css";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("approveManagers");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="admin-dashboard">
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
