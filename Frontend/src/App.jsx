import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import UserHomePage from "./pages/UserHomePage";
import Events from "./pages/Events";
import Help from "./pages/Help";
import Clubs from "./pages/Clubs";
import Community from "./pages/Community";
import UserLayout from "./layouts/UserLayout";
import { ToastWrapper } from "./Toast";
import AdminLogin from "./admin/AdminLogin";
import AdminDashBoard from "./admin/AdminDashBoard";

function App() {
  return (
    <div>
      <ToastWrapper />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
        <Route path="/user" element={<Navigate to="/user/home" />} />

        
        <Route
          path="/user/home"
          element={
            <UserLayout>
              <UserHomePage />
            </UserLayout>
          }
        />
        <Route
          path="/user/events"
          element={
            <UserLayout>
              <Events />
            </UserLayout>
          }
        />
        <Route
          path="/user/clubs"
          element={
            <UserLayout>
              <Clubs />
            </UserLayout>
          }
        />
        <Route
          path="/user/community"
          element={
            <UserLayout>
              <Community />
            </UserLayout>
          }
        />
        <Route
          path="/user/help"
          element={
            <UserLayout>
              <Help />
            </UserLayout>
          }
        />
        <Route 
          path="/admin/login"
          element={
            <AdminLogin />
          }
        />  
        <Route 
          path="/admin/dashboard"
          element={
            <AdminDashBoard />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
