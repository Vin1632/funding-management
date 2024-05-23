import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
/*import app from "../../firebase.js";*/
import '../../styles/Review-applications.css';


const Reviewapplications = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email")

  const [applicationInfo, setApplicationInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  const updateApplication = async (applicationid, status) => {
    const obj = {
      id: applicationid,
      status:status
  }
    const response = await fetch(`/api/updateApplicationStatus`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

  };

  const fetchData = async () => {
    try {

      const response = await fetch(`/api/getApplicationsForManagersAds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: email
        }),
    });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const applicationInfo = await response.json();

      console.log(applicationInfo);
      setApplicationInfo(applicationInfo);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading state to false after data is fetched or on error
    }
  };



  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array indicates the effect should only run once

   // Render loading indicator while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <div > 
      <section id="applications">
        <h2>Applications</h2>
        {applicationInfo && applicationInfo.map( application => (
        <div className="applications">
          <h3>{application.Title}</h3>
          <p>{application.Description}</p>
          <div className="actions">
            <button className="approve" onClick={() => updateApplication(application.Application_ID,1)}>Approve</button>
            <button className="reject" onClick={() => updateApplication(application.Application_ID,0)}>Reject</button>
          </div>
        </div>
        ))};
      </section>
    </div>

  )
};

export default Reviewapplications;