import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

import "../styles/Details.css";
import "../styles/dashboard.css";
import AdminDashboard from "./Admin-dashboard/Admin-dashboard.js";
import UsersDashboard from "./Users-dashboard/Users-dashboard.js";
import ManagerDashboard from "./Managers-dashboard/Manager-dashboard.js";
import logo from '../assets/FundDocker_logo.jpg';
import backgroundImage from '../assets/sea-background.jpg'
import app from "../firebase.js";
import { getDatabase, ref, set, push } from "firebase/database";

const Home = () => {
  //email stuff
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email")
  //

  const navigate = useNavigate();
  const { logIn, googleSignIn } = useUserAuth();
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  const [selectedAction, setSelectedAction] = useState(""); // State to track selected form action
  const [educationChecked, setEducationChecked] = useState(false);
  const [businessChecked, setBusinessChecked] = useState(false);
  const [eventsChecked, setEventsChecked] = useState(false);

  const [role, setRole] = useState("User");
  
    // Function to handle navigation to new page upon form submission
  //companies
  let [CompanyNamename, set_Comname] = useState("");
  let [RepName, set_RepName] = useState("");
  let [name, set_name] = useState("");
  let [surname, set_surname] = useState("");
  let [dob, set_dob] = useState("");
  

  const handleEducationChange = (e) => {
    setEducationChecked(e.target.checked);
  };

  const handleBusinessChange = (e) => {
    setBusinessChecked(e.target.checked);
    
  };

  const handleEventsChange = (e) => {
    setEventsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    try {

      let user = {    
        name: (name ? name : RepName),
        role: role,
        surname: surname,
        dob: (dob ? dob : null),
        company: CompanyNamename,
        email: email,
        edu: (educationChecked ? 1 : 0),
        bus: (businessChecked ? 1 : 0),
        events: (eventsChecked ? 1 : 0),
        blocked: 0}

      console.log(user);

      const response = await fetch('/api/createNewUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        alert('Failed to update new user');
        throw new Error('Failed to update new user');
      }
      console.log('User updated successfully!');
      //await logIn(email, password);
      setFormSubmitted(true); // Set form submission state to true
    } catch (err) {
      //   setError(err.message);
    }
  };


  // Function to handle FormAction change
  const handleFormActionChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedAction(selectedOption);
    setRole(selectedOption === "Funding" ? "User" : "Manager"); // Update role based on selected action
    
    if (selectedOption === "Invest") {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      set_dob(formattedDate);
    }

    const placeholder = document.getElementById('placeholder');
    const userDetails = document.getElementById('UserDetails');
    const fundingManagerDetails = document.getElementById('FundingManagerDetails');

    if (selectedOption === 'Funding') {
      placeholder.style.display = 'none';
      userDetails.style.display = 'block';
      fundingManagerDetails.style.display = 'none';
    } else if (selectedOption === 'Invest') {
      placeholder.style.display = 'none';
      userDetails.style.display = 'none';
      fundingManagerDetails.style.display = 'block';
    } else {
      placeholder.style.display = 'block';
      userDetails.style.display = 'none';
      fundingManagerDetails.style.display = 'none';
    }
  };

  
  return (
    <>
      <div className="floating-background-image">
        <img src={backgroundImage} alt="Background" />
      </div>

      <div className="navbar">
        <div className="navbar-left">
          <ul>
            <li><img src={logo} width="200" height="20" alt="Logo" /></li>
            <li><a href="#">Home</a> </li>
            <li><a href="#">About</a> </li>
          </ul>
        </div>
      </div>

      {!formSubmitted ? ( // Render the form if form is not submitted
        <Form onSubmit={handleSubmit} className="form_funding_man">
          {/* Your existing form content goes here */}
          <label>Form action:</label>
          <select id="FormAction" name="FormAction" className="input-select" onChange={handleFormActionChange}>
            <option value="nul">Select an option</option>
            <option value="Funding">Looking for funding?</option>
            <option value="Invest">Looking to invest?</option>
          </select>

          <div id="placeholder">
            <p><strong>Are you looking to provide funding opportunities or looking for funding? All your needs centralized in one place. Fill out the form to take the next step.</strong></p>
          </div>

          <div id="UserDetails" style={{display: 'none'}}>
            <label>Name:</label>
            <input type="text" id="Name" name="Name" value={name} 
                onChange={(e) => set_name(e.target.value)}  /><br /><br />
            <label>Surname:</label>
            <input type="text" id="Surname" name="Surname" value={surname} 
                onChange={(e) => set_surname(e.target.value)}  /><br /><br />
            <label>Date of Birth:</label>
            <input type="date" id="birthday" name="birthday" value={dob} 
            onChange={(e) => set_dob(e.target.value)} /><br /><br />
            <p><strong>Looking for Funding?</strong></p>
            <label className="container_details" >Education
            <input type="checkbox" id="BusinessCheckbox"  onChange={handleEducationChange} />
              <span className="checkmark"></span>
            </label>
            <label className="container_details" >Business
              <input type="checkbox" id="BusinessCheckbox"  onChange={handleBusinessChange} />
              <span className="checkmark"></span>
            </label>
            <label className="container_details">Events
              <input type="checkbox"  id="EventsCheckbox" onChange={handleEventsChange}/>
              <span className="checkmark"></span>
            </label>
            <input type="submit" value="Submit" onClick={handleSubmit} />
          </div>

          {/* companies input */}
          <div id="FundingManagerDetails" style={{display: 'none'}}>
            <label>Company Name:</label>

            <input type="text" id="CompanyName" name="CompanyName" value={CompanyNamename} 
                onChange={(e) => set_Comname(e.target.value)} /><br /><br />
            <label>Representative Name:</label>


            <input type="text" id="RepName" name="RepName" value={RepName} 
                onChange={(e) => set_RepName(e.target.value)} /><br /><br />
            <p><strong>Which categories are you looking to fund?</strong></p>


            <label className="container_details" >Education
              <input type="checkbox" id="EducationCheckbox_C" onChange={handleEducationChange} />
              <span className="checkmark"></span>
            </label>
            <label className="container_details">Business
              <input type="checkbox"  id="BusinessCheckbox_C" onChange={handleBusinessChange} />
              <span className="checkmark"></span>
            </label>
            <label className="container_details">Events
              <input type="checkbox" id="EventsCheckbox_C" onChange={handleEventsChange} />
              <span className="checkmark"></span>
            </label>
            <input type="submit" value="Submit" onClick={handleSubmit} />
          </div>
        </Form>
      ) : (
        // Render the appropriate dashboard based on the selected action
        selectedAction === 'Funding' ? navigate(`/UsersDashboard?email=${email}`) : navigate(`/ManagerDashboard?email=${email}`)

      )}

    </>
  );
};

export default Home;