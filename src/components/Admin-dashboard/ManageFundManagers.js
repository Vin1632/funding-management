import React, { useState, useEffect } from 'react';
import "../../styles/Manage-Users.css";


const ManageManagers = () => {

  const [infoArray, setInfoArray] = useState([]);
  const [error, setError] = useState("");
  const [data, setData] = useState(null); // Initialize data state to null
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  // Example manager data
  const [managers, setManagers] = useState();

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getUsers`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const text = await response.json();
        setData(text);
        console.log(text);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading state to false after data is fetched or on error
      }
    };

    fetchData();
  }, []); // Empty dependency array indicates the effect should only run once



   // Render loading indicator while data is being fetched
   if (loading) {
    return <p>Loading...</p>;
  }

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
            {data && data.map((manager, index) => (
              <tr key={index}>
                <td>{manager.Name}</td>
                <td>{manager.Email}</td>
                <td>
                  <button onClick={() => toggleManagerRole(manager.ID)}>
                    {manager.role === "Fund Manager" ? "Promote to Admin" : "Demote to Fund Manager"}
                  </button>
                </td>
                <td>
                  <button onClick={() => toggleAccountStatus(manager.ID)}>
                    {manager.Blocked ? "Unblock Account" : "Block Account"}
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteManager(manager.ID)}>Delete</button>
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
