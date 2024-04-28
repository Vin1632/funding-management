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
    {id : 1, Name : 'amin1', Email : 'admin@gmail.com'},
    {id : 2, Name : 'admin2', Email : 'admin.fund@gmail.com'}

  ]);

  // Function to toggle manager role
  const toggleManagerRole = (managerId, ROLE) => {
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
            userId: managerId,
            action: action,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to ${action} user`);
        } else {
          setManagers(prevManagers =>
            prevManagers.map(manager =>
                  manager.ID === managerId
                    ? { ...manager, role: manager.role === "User" ? "Manager" : "User" }
                    : manager
                )
              );
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
};

  const toggleAccountStatus = (managerId, isBlocked) => {
    const action = isBlocked ? 'unblock' : 'block';

    fetch(`/api/blockUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: managerId,
            action: action,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to ${action} user`);
        } else {
            setManagers(prevManagers =>
                prevManagers.map(manager =>
                    manager.ID === managerId ? { ...manager, Blocked: !manager.Blocked } : manager
                )
            );
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
};


  //does delete but crashs after deleting
  const handleDelete = (id) => {
    fetch(`/api/deleteUsers/${id}`, { 
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      else{
        setManagers(prevManagers => prevManagers.filter(manager => manager.ID !== id));
      }
    })
    .catch(error => console.error('Error deleting user:', error));
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getUsers`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const text = await response.json();
        setManagers(text);
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
            {managers && managers.map((manager, index) => (
              <tr key={index}>
                <td>{manager.Name}</td>
                <td>{manager.Email}</td>
                <td>
                  <button onClick={() => toggleManagerRole(manager.ID , manager.role)}>
                    {manager.role === "Manager" ? "Promote to Admin" : "Demote to Fund Manager"}
                  </button>
                </td>
                <td>
                <button onClick={() => toggleAccountStatus(manager.ID, manager.Blocked)}>
                    {manager.Blocked ? "Unblock Account" : "Block Account"}
                </button>

                </td>
                <td>
                  <button onClick={() => handleDelete(manager.ID)}>Delete</button>
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
                <td>{admin.Name}</td>
                <td>{admin.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default ManageManagers;
