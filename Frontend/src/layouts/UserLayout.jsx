import React from "react";
import Navbar from "../pages/NavBar";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default UserLayout;
