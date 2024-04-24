import React, { useState, useEffect } from "react";
import "../styles/Manage-Users.css";
import app from "../firebase.js";
import { getDatabase, ref, get } from "firebase/database";

const ManageManagers = () => {

  const [infoArray, setInfoArray] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, "Fundmanagers");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          setInfoArray(Object.values(snapshot.val()));
        }
      } catch (error) {
        setError(error.message);
      }
    };

    checkUser();
  }, []); // Run this effect only once after the component mounts

  console.log("first result");
  console.log(infoArray[0]);

  // Example manager data
  const [managers, setManagers] = useState(
    [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Fund Manager", blocked: false },
    { id: 2, name: "Jane Doe", email: "jane@example.com", role: "Admin", blocked: false },
    // Add more manager data as needed
  ]
);

  // Example admin data
  const [admins, setAdmins] = useState([
    { id: 1, name: "Admin1", email: "admin1@example.com", role: "Admin" },
    { id: 2, name: "Admin2", email: "admin2@example.com", role: "Admin" },
    // Add more admin data as needed
  ]);

  // Function to toggle manager role
  const toggleManagerRole = (managerId) => {
    setManagers(prevManagers =>
      prevManagers.map(manager =>
        manager.Rep_Name === managerId
          ? { ...manager, role: manager.role === "Fund Manager" ? "Admin" : "Fund Manager" }
          : manager
      )
    );
  };

  // Function to toggle account status (blocked/unblocked)
  const toggleAccountStatus = (managerId) => {
    setManagers(prevManagers =>
      prevManagers.map(manager =>
        manager.Rep_Name === managerId ? { ...manager, blocked: !manager.blocked } : manager
      )
    );
  };

  // Function to delete a manager
  const deleteManager = (managerId) => {
    setManagers(prevManagers => prevManagers.filter(manager => manager.Rep_Name !== managerId));
  };

  return (
    <div>
      <div className="Manage-manager-table"> {/* Update class name */}
        <h2>Managers</h2> {/* Update heading */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Manage Access</th>
              <th>Permissions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {managers.map(manager => (
              <tr key={manager.Rep_Name}>
                <td>{manager.Rep_Name}</td>
                <td>{manager.email}</td>
                <td>
                  <button onClick={() => toggleManagerRole(manager.Rep_Name)}>
                    {manager.role === "Fund Manager" ? "Promote to Admin" : "Demote to Fund Manager"}
                  </button>
                </td>
                <td>
                  <button onClick={() => toggleAccountStatus(manager.Rep_Name)}>
                    {manager.blocked ? "Unblock Account" : "Block Account"}
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteManager(manager.Rep_Name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="Manage-admin-table">
        <h2>Admins</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageManagers;
