import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
// import "./App.css";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import AdminDashboard from "./components/Admin-dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ManageUsers from "./components/ManageUsers";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/AdminDashboard" element={<AdminDashboard />} />
              <Route path="/ManageUsers" element={<ManageUsers />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;