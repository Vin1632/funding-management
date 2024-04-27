import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/login.css";
import app from "../firebase.js";
import { getDatabase, ref, get } from "firebase/database";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const [infoArray, setInfoArray] = useState([]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, "Fundmanagers");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          setInfoArray(Object.values(snapshot.val()));
        }
      } catch (error) {
        setError(error.message);
      }
    };

    checkUser();
  }, []); // Run this effect only once after the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      
      const foundVinJob = infoArray.some(item => item.Email === email);
      if (foundVinJob) {
        navigate("/AdminDashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
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