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
        <p>Hello</p>
    </div>
  );
};

export default About;
