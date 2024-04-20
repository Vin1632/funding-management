import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import "../styles/Details.css";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>

    <form className="form_funding_man" > 
        <label >Form action:</label>
        <select id="FormAction" name="FormAction" className="input-select">
            {/* <option value ="nul" selected>Select an option</option> */}
            <option value="Funding">Looking for funding?</option>
            <option value="Invest">Looking to invest?</option>
        </select>

        <div id="placeholder">

            <p><strong>Are you looking to provide funding oppurtuninities or looking for funding? All your need centralised in one place. Fill out the form to take the next step</strong></p>

        </div>

         <div id="UserDetails">

        <label >Name:</label>
        <input type="text" id="Name" name="Name"></input>
        <label >Surname:</label>
        <input type="text" id="Surname" name="Surname"></input>
        <label >Date of Birth:</label>
        <input type="date" id="birthday" name="birthday"></input>
        <p><strong>Looking for Funding?</strong></p>

        <label className="container_details">Education
        <input type="checkbox"></input>
        <span className="checkmark"></span>
        </label>
        <label className="container_details">Business
        <input type="checkbox"></input>
        <span className="checkmark"></span>
        </label>
        <label className="container_details">Events
        <input type="checkbox"></input>
        <span className="checkmark"></span>
        </label>
        <input type="submit" value="Submit"></input>
    </div>

    <div id="FundingManagerDetails" style={{display: 'none'}}>
    
        <label >Company Name:</label>
        <input type="text" id="CompanyName" name="Company Name"></input>
        
        <label >Representative Name:</label>
        <input type="text" id="RepName" name="Rep Name"></input>

        <p><strong>Which categories are you looking to fund?</strong></p>
        <label className="container_details">Education
        <input type="checkbox" checked="checked"></input>
        <span className="checkmark"></span>
        </label>
        <label className="container_details">Business
        <input type="checkbox"></input>
        <span className="checkmark"></span>
        </label>
        <label className="container_details">Events
        <input type="checkbox"></input>
        <span className="checkmark"></span>
        </label>
        <input type="submit" value="Submit"></input>
    </div>

    </form>
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
