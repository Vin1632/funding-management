import React, { useState, useEffect } from "react";
import "../../styles/Manage-Users.css";

const ManageUsers = () => {
  // Example user data
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  // Function to toggle user role
  const toggleUserRole = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.ID === userId
          ? { ...user, role: user.role === "User" ? "Manager" : "User" }
          : user
      )
    );
  };

  // Function to toggle account status (blocked/unblocked)
  const toggleAccountStatus = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.ID === userId ? { ...user, blocked: !user.blocked } : user
      )
    );
  };

  // Function to delete a user
  const handleDelete = (id) => {
    fetch(`/api/deleteUsers/${id}`, { 
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    })
    .catch(error => console.error('Error deleting user:', error));
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getUsersOnly`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const text = await response.json();
        setUsers(text);
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
    <div className="Manage-user-table">
      <h2>Users</h2>
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
          {users && users.map(user => (
            <tr key={user.ID}>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>
                <button onClick={() => toggleUserRole(user.ID)}>
                  {user.role === "User" ? "Promote to Manager" : "Demote to User"}
                </button>
              </td>
              <td>
                <button onClick={() => toggleAccountStatus(user.ID)}>
                  {user.blocked ? "Unblock Account" : "Block Account"}
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
