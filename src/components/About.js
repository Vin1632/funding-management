import React, { useState } from "react";
import "../styles/About.css";

const About = () => {
  // Example user data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", blocked: false },
    { id: 2, name: "Jane Doe", email: "jane@example.com", role: "Manager", blocked: true },
    // Add more user data as needed
  ]);

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
