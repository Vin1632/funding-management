import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../../styles/Review-applications.css';
import '../../styles/User-Home.css';

const UsersHome = () => {
  const [applications, setApplications] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userEmail = searchParams.get("email");

  useEffect(() => {
    fetchApplications(userEmail); // Pass userEmail to fetchApplications
  }, [userEmail]); // useEffect will re-run whenever userEmail changes

  const fetchApplications = async (userEmail) => {
    try {
      const response = await fetch('/api/trackstatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: userEmail }), // Include userEmail in the request body
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case false:
        return "Rejected";
      case true:
        return "Accepted";
      default:
        return "Waitlisted";
    }
  };

  return (
    <div> 
      <h2>Track application status</h2>
      <table className="applicationTable">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Applicant Name</th>
            <th>Ad Title</th>
            <th>Status</th> {/* New table header for status */}
            {/* Add more table headers for other columns if needed */}
          </tr>
        </thead>
        <tbody>
          {applications.map(application => (
            <tr key={application.Application_ID}>
              <td>{application.Application_ID}</td>
              <td>{application.ApplicantName}</td>
              <td>{application.AdTitle}</td>
              <td>{getStatusLabel(application.AcceptedOrRejected)}</td> {/* Display status label */}
              {/* Add more table cells for other columns if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersHome;
