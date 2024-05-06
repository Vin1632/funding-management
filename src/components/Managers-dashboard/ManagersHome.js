import React, { useState, useEffect } from 'react';

const ManagersHome = ({ email }) => {
  const [userEmail, setUserEmail] = useState(email);
  const [educationBudget, setEducationBudget] = useState(0);
  const [eventsBudget, setEventsBudget] = useState(0);
  const [businessBudget, setBusinessBudget] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [newEducationBudget, setNewEducationBudget] = useState(0);
  const [newEventsBudget, setNewEventsBudget] = useState(0);
  const [newBusinessBudget, setNewBusinessBudget] = useState(0);

  useEffect(() => {
    // Fetch initial budget information from the API
    fetchBudgetInformation();
  }, []);

  const fetchBudgetInformation = async () => {
    try {
      // Make API request to fetch budget information with email
      const response = await fetch(`/api/AddBudget?email=${userEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
    
      setEducationBudget(data[0].EducationAmount);
      setEventsBudget(data[0].EventsAmount);
      setBusinessBudget(data[0].BusinessAmount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEducationBudget(newEducationBudget);
    setEventsBudget(newEventsBudget);
    setBusinessBudget(newBusinessBudget);
    setEditMode(false);
  };

  return (
    <>
      <div>
        <div className="budget-block">
          <h3>Education Budget</h3>
          {editMode ? (
            <input
              type="number"
              value={newEducationBudget}
              onChange={(e) => setNewEducationBudget(e.target.value)}
            />
          ) : (
            <p>{educationBudget}</p>
          )}
        </div>
        <div className="budget-block">
          <h3>Events Budget</h3>
          {editMode ? (
            <input
              type="number"
              value={newEventsBudget}
              onChange={(e) => setNewEventsBudget(e.target.value)}
            />
          ) : (
            <p>{eventsBudget}</p>
          )}
        </div>
        <div className="budget-block">
          <h3>Business Budget</h3>
          {editMode ? (
            <input
              type="number"
              value={newBusinessBudget}
              onChange={(e) => setNewBusinessBudget(e.target.value)}
            />
          ) : (
            <p>{businessBudget}</p>
          )}
        </div>
        <div>
          {editMode ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
      </div>
    </>
  );
};

export default ManagersHome;
