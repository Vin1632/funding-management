import React from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import "../styles/dashboard.css";
import logo from '../assets/FundDocker_logo.jpg';
import accountIcon from  '../assets/account-icon-11.jpg';
import backgroundImage from '../assets/sea-background.jpg'

const Navigation = () => {
  //const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   // setError("");
    try {
      //await logIn(email, password);
      navigate("/home");
    } catch (err) {
   //   setError(err.message);
    }
  };
/*
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  */
  return (
    <>
    <div class="floating-background-image">
<img src={backgroundImage}></img>
</div>

<div class="navbar">
<div class="navbar-left">
    <ul>
        <li><img src={logo} width="200" height="20px"></img></li>
        <li><a href="#">Home</a> </li>
        <li><a href="#">About</a> </li>
    </ul>
</div>
<div class="navbar-right">
    <ul class="dropdown">
        <button><img src={accountIcon}></img></button>
        <ul class="content">
            <a href="#">Profile</a>
            <a href="#">Funding</a>
            <a href="#">Users</a>
            <a href="#">Access</a>
            <a href="#">Logout</a>
        </ul>
    </ul>
    </div>
</div>

    </>
  );
};

export default Navigation;