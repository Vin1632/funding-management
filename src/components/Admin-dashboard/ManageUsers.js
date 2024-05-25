import React, { useState, useEffect } from "react";
import "../../styles/Manage-Users.css";

const ManageUsers = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  const toggleUserRole = (User_id, ROLE) => {
    let action = 'toManager';
    if(ROLE === "Manager")
    {
      action = 'toUser';
    }

    fetch(`/api/ChangeRole`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: User_id,
            action: action,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to ${action} user`);
        } else {
          setUsers(prevUsers =>
                prevUsers.map(user =>
                  user.ID === User_id
                    ? { ...user, role: user.role === "User" ? "Manager" : "User" }
                    : user
                )
              );
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
};

  // Function to toggle account status (blocked/unblocked)

  const toggleAccountStatus = (User_id, isBlocked) => {
    const action = isBlocked ? 'unblock' : 'block';

    fetch(`/api/blockUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: User_id,
            action: action,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to ${action} user`);
        } else {
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.ID === User_id ? { ...user, Blocked: !user.Blocked } : user
                )
            );
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
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
      else{
        setUsers(prevUsers => prevUsers.filter(user => user.ID !== id));
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
          {users && users.map( user => (
            <tr key={user.ID}>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>
                <button onClick={() => toggleUserRole(user.ID, user.role)}>
                  {user.role === "User" ? "Promote to Manager" : "Demote to User"}
                </button>
              </td>
              <td>
                <button onClick={() => toggleAccountStatus(user.ID, user.Blocked)}>
                  {user.Blocked ? "Unblock Account" : "Block Account"}
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
