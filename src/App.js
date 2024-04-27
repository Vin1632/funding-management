import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
// import "./App.css";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import AdminDashboard from "./components/Admin-dashboard/Admin-dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ManageUsers from "./components/Admin-dashboard/ManageUsers";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ManageManagers from "./components/Admin-dashboard/ManageFundManagers";
import ManagerDashboard from "./components/Managers-dashboard/Manager-dashboard";
import PostAds from "./components/Managers-dashboard/PostAds";
import Reviewapplications from "./components/Managers-dashboard/Review-applications";
import FindFunder from "./components/Users-dashboard/FindFunder";
import Applications from "./components/Users-dashboard/Applications";
import UsersDashboard from "./components/Users-dashboard/Users-dashboard";

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
              <Route path="/ManageManagers" element={<ManageManagers/>} />
              <Route path="/ManagerDashboard" element = {<ManagerDashboard/>} />
              <Route path="/PostAds" element = {<PostAds/>} />
              <Route path="/FindFunder" element = {<FindFunder/>} />
              <Route path="/Applications" element = {<Applications/>} />
              <Route path="/UsersDashboard" element ={<UsersDashboard/>} />
              <Route path="/Review-applications" element = {<Reviewapplications/>} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;