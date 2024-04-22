import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import "../styles/Details.css";
import "../styles/dashboard.css";
import AdminDashboard from "./Admin-dashboard";
import logo from '../assets/FundDocker_logo.jpg';
import backgroundImage from '../assets/sea-background.jpg'

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
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
  const handleFormSubmission = () => {
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
            <input type="text" id="Name" name="Name" /><br /><br />
            <label>Surname:</label>
            <input type="text" id="Surname" name="Surname" /><br /><br />
            <label>Date of Birth:</label>
            <input type="date" id="birthday" name="birthday" /><br /><br />
            <p><strong>Looking for Funding?</strong></p>
            <label className="container_details">Education
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="container_details">Business
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="container_details">Events
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <input type="submit" value="Submit" onClick={handleFormSubmission} />
          </div>

          <div id="FundingManagerDetails" style={{display: 'none'}}>
            <label>Company Name:</label>
            <input type="text" id="CompanyName" name="CompanyName" /><br /><br />
            <label>Representative Name:</label>
            <input type="text" id="RepName" name="RepName" /><br /><br />
            <p><strong>Which categories are you looking to fund?</strong></p>
            <label className="container_details">Education
              <input type="checkbox" checked="checked" />
              <span className="checkmark"></span>
            </label>
            <label className="container_details">Business
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="container_details">Events
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <input type="submit" value="Submit" onClick={handleFormSubmission} />
          </div>
        </Form>
      ) : (
        // Render the admin dashboard if form is submitted
        navigate("/AdminDashboard")
      )}

      {/* {htmlContent && (
        <div>
          <iframe
            title="HTML Content"
            srcDoc={htmlContent}
            style={{ width: "100%", height: "100vh", border: "none" }}
          />
        </div>
      )} */}

      {/* <div classNameName="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div> */}
    </>
  );
};

export default Home;
