import React, { useState } from "react";
import "../../styles/Manage-Users.css";

const ManageUsers = () => {
  // Example user data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", blocked: false },
    { id: 2, name: "Jane Doe", email: "jane@example.com", role: "Manager", blocked: true },
    // Add more user data as needed
  ]);

  // Function to toggle user role
  const toggleUserRole = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, role: user.role === "User" ? "Manager" : "User" }
          : user
      )
    );
  };

  // Function to toggle account status (blocked/unblocked)
  const toggleAccountStatus = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, blocked: !user.blocked } : user
      )
    );
  };

  // Function to delete a user
  const deleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => toggleUserRole(user.id)}>
                  {user.role === "User" ? "Promote to Manager" : "Demote to User"}
                </button>
              </td>
              <td>
                <button onClick={() => toggleAccountStatus(user.id)}>
                  {user.blocked ? "Unblock Account" : "Block Account"}
                </button>
              </td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
