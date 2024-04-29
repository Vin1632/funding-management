import React, { useState, useEffect } from "react";
import app from "../../firebase.js";
import '../../styles/Review-applications.css';


const Reviewapplications = () => {

  function Applications() {
    return (
      <section id="applications">
        <h2>Applications</h2>
        <div className="applications">
          <h3>Applicant Name</h3>
          <p>Project description...</p>
          <div className="actions">
            <button className="approve">Approve</button>
            <button className="reject">Reject</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div > 
      
    </div>
  );
};

export default Reviewapplications;