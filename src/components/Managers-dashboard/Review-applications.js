import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../../styles/Review-applications.css';
import { storage } from '../../firebase';
import { listAll, getDownloadURL, ref } from "firebase/storage";

const Reviewapplications = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [applicationInfo, setApplicationInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const [fileURL, setFileUrl] = useState([]);

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
      setApplicationInfo(applicationInfo.map(app => ({
        ...app,
        Status: app.AcceptedOrRejected === null ? null : app.AcceptedOrRejected ? 1 : 0
      }))); // Update status based on AcceptedOrRejected
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading state to false after data is fetched or on error
    }
  };

  const updateApplication = async (applicationid, status) => {
    try {
      const obj = {
        id: applicationid,
        status: status
      };
      const response = await fetch(`/api/updateApplicationStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      });
      if (!response.ok) {
        throw new Error('Failed to update application status');
      }

      // Update the application status in the local state
      setApplicationInfo(prevState =>
        prevState.map(application =>
          application.Application_ID === applicationid
            ? { ...application, Status: status }
            : application
        )
      );
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  useEffect(() => {
    fetchData();

    listAll(ref(storage, "files")).then(response => {
      response.items.forEach(val => {
        getDownloadURL(val).then(url => {
          setFileUrl(data => [...data, url])
        })
      })
    })
  }, []); // Empty dependency array indicates the effect should only run once

  // Render loading indicator while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <section id="applications">
        <h2>Applications</h2>
        {applicationInfo && applicationInfo.map(application => (
          <div className="applications" key={application.Application_ID}>
            <h3>{application.Title}</h3>
            <p>{application.Description}</p>
            <p>
              {fileURL.filter(str => str.includes("p" + application.Application_ID.toString() + "q")).map((str, index) => (
                <a key={index} href={str} target="_blank" rel="noopener noreferrer">Review application</a>
              ))}
            </p>
            {application.Status === 1 ? (
              <p className="approved-text">APPROVED</p>
            ) : application.Status === 0 ? (
              <p className="rejected-text">REJECTED</p>
            ) : (
              <div className="actions">
                <button className="approve" onClick={() => updateApplication(application.Application_ID, 1)}>Approve</button>
                <button className="reject" onClick={() => updateApplication(application.Application_ID, 0)}>Reject</button>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Reviewapplications;
