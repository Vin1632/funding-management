import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

import "../styles/Details.css";
import "../styles/dashboard.css";
import AdminDashboard from "./Admin-dashboard/Admin-dashboard.js";
import logo from '../assets/FundDocker_logo.jpg';
import backgroundImage from '../assets/sea-background.jpg'
import app from "../firebase.js";
import { getDatabase, ref, set, push } from "firebase/database";

const Home = () => {

  const navigate = useNavigate();
  const { logIn, googleSignIn } = useUserAuth();
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    try {
      //await logIn(email, password);
      setFormSubmitted(true); // Set form submission state to true
    } catch (err) {
      //   setError(err.message);
    }
  };


  // Function to handle FormAction change
  const handleFormActionChange = (e) => {
    const selectedOption = e.target.value;
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

  // Function to handle navigation to new page upon form submission
  //companies
  let [CompanyNamename, set_Comname] = useState("");
  let [RepName, set_RepName] = useState("");
  let [NAAM, set_naam] = useState("");
  let [surname, set_surname] = useState("");
  const [permission, setPermission] = useState("unbloked");


  const handleFormSubmission = async () => {
    
    const db = getDatabase(app);

    const newDocRef = push(ref(db, "Fundmanagers"));
    set(newDocRef, {
      id : "8798797",
      CompanyName: CompanyNamename,
      Rep_Name: RepName,
      business : (document.getElementById("BusinessCheckbox_C").checked ? "1" : "0"),
      education : (document.getElementById("EducationCheckbox_C").checked ? "1" : "0"),
      events : (document.getElementById("EventsCheckbox_C").checked ? "1" : "0"),
      permission : permission
    }).then( () => {
      alert("data saved successfully")
    }).catch((error) => {
      alert("error: ", error.message);
    })

    const user_info = push(ref(db, "users"));
    set(user_info, {
      Name: NAAM,
      Surname: surname,
      Birthday : (document.getElementById("birthday").value), 
      business : (document.getElementById("BusinessCheckbox").checked ? "1" : "0"),
      education : (document.getElementById("EducationCheckbox").checked ? "1" : "0"),
      events : (document.getElementById("EventsCheckbox").checked ? "1" : "0"),
      permission : permission
    }).then( () => {
      alert("data saved successfully")
    }).catch((error) => {
      alert("error: ", error.message);
    })
    
    navigate("/AdminDashboard"); // Navigate to the desired page upon form submission
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
            <input type="text" id="Name" name="Name" value={NAAM} 
                onChange={(e) => set_naam(e.target.value)}  /><br /><br />
            <label>Surname:</label>
            <input type="text" id="Surname" name="Surname" value={surname} 
                onChange={(e) => set_surname(e.target.value)}  /><br /><br />
            <label>Date of Birth:</label>
            <input type="date" id="birthday" name="birthday" /><br /><br />
            <p><strong>Looking for Funding?</strong></p>
            <label className="container_details" >Education
              <input type="checkbox" id="EducationCheckbox" />
              <span className="checkmark"></span>
            </label>
            <label className="container_details" >Business
              <input type="checkbox" id="BusinessCheckbox" />
              <span className="checkmark"></span>
            </label>
            <label className="container_details">Events
              <input type="checkbox"  id="EventsCheckbox"/>
              <span className="checkmark"></span>
            </label>
            <input type="submit" value="Submit" onClick={handleFormSubmission} />
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
              <input type="checkbox" id="EducationCheckbox_C" />
              <span className="checkmark"></span>
            </label>
            <label className="container_details">Business
              <input type="checkbox"  id="BusinessCheckbox_C" />
              <span className="checkmark"></span>
            </label>
            <label className="container_details">Events
              <input type="checkbox" id="EventsCheckbox_C" />
              <span className="checkmark"></span>
            </label>
            <input type="submit" value="Submit" onClick={handleFormSubmission} />
          </div>
        </Form>
      ) : (
        // Render the admin dashboard if form is submitted
        navigate("/AdminDashboard")
      )}

    </>
  );
};

export default Home;
