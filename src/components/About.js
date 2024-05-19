import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/About.css";

const About = () => {
   return (
    <div className="About">
        <div class="about-us-box">
          <h2>Welcome to FundDocker</h2> 
          <p>At <em>FundDocker</em>, we're dedicated to facilitating meaningful connections between organizations and initiatives that drive positive change. 
            With a focus on streamlining funding opportunities, we provide a centralized platform for organizations to showcase their support for educational, business, and event initiatives. 
            Our goal is to empower organizations to make a lasting impact on society while efficiently managing their funding applications. 
          </p>
          <p><em>Sail Towards Success with FundDocker: Anchoring Dreams, Charting Futures!</em></p>

        </div>
    </div>
  );
};

export default About;
