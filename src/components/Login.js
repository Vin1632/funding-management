import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/login.css";
import app from "../firebase.js";

const Login = () => {


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

//use email to check if name is filled in then redirect to admin, manager or user dependinfg on the role in the database 
//create api
//alter code below
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);

      /* ------------------- */
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/getUserByEmail`, {
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
          const userInfo = await response.json();

          console.log(userInfo.message);
          console.log(userInfo.message.recordset[0]);
          
          if (userInfo.message.recordset[0] && userInfo.message.recordset[0].Name && userInfo.message.recordset[0].Name != ''){
                  //navigate(`/home?email=${email}`);
                  console.log(userInfo.message.recordset[0].Name);
                  console.log(userInfo.message.recordset[0].role);
              if (userInfo.message.recordset[0].role == 'Admin') {
                navigate(`/AdminDashboard?email=${email}`)
              }
              else if (userInfo.message.recordset[0].role == 'Manager') {
                navigate(`/ManagerDashboard?email=${email}`)
              }
              else {
                
                navigate(`/UsersDashboard?email=${email}`)
              }
          }
          else {
            navigate(`/home?email=${email}`);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          //setLoading(false); // Set loading state to false after data is fetched or on error
        }
      };
    
      fetchData();

      /* ------------------------------------- */
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = await googleSignIn();
      const userEmail = user.user.email;
      /* ------------------- */
      const fetchData = async () => {
        try {

          /* -------- A new user coming through GoogleSignIn is SignUped Automatically ---------------- */
          const signUpResponse = await fetch(`/api/InsertNewUser`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: userEmail
              }),
          });

          if (signUpResponse) {
            console.log(signUpResponse);
          }
      


          /* ------------------------------------------------------------------------------------------- */

          const response = await fetch(`/api/getUserByEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userEmail
            }),
        });
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }

          const userInfo = await response.json();
          console.log(userInfo.message);
          console.log(userInfo.message.recordset[0]);
          if (userInfo.message.recordset[0] && userInfo.message.recordset[0].Name && userInfo.message.recordset[0].Name != ''){
                  //navigate(`/home?email=${email}`);
                  console.log(userInfo.message.recordset[0].Name);
                  console.log(userInfo.message.recordset[0].role);
              if (userInfo.message.recordset[0].role == 'Admin') {
                navigate(`/AdminDashboard?email=${userEmail}`)
              }
              else if (userInfo.message.recordset[0].role == 'Manager') {
                navigate(`/ManagerDashboard?email=${userEmail}`)
              }
              else {
                navigate(`/UsersDashboard?email=${userEmail}`)
              }
          }
          else {
            navigate(`/home?email=${userEmail}`);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          //setLoading(false); // Set loading state to false after data is fetched or on error
        }
      };
    
      fetchData();

      /* ------------------------------------- */
      //navigate(`/home?email=${userEmail}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="box2">
            <div className="p-4 box">
              <h2 className="mb-3">Funding Management Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Log In
                  </Button>
                </div>
              </Form>
              <hr />
              <div>
                <GoogleButton
                  className="g-btn"
                  type="dark"
                  onClick={handleGoogleSignIn}
                />
              </div>
              <div className="p-4 box mt-3 text-center">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
