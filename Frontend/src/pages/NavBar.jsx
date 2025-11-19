import React, { useState } from "react";
import { Bell, Search, User, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const routeNames = {
  "/user/home": "Home",
  "/user/events": "Events",
  "/user/clubs": "Clubs",
  "/user/community": "Community",
  "/user/help": "Help / Contact",
};

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();


  const currentPage = routeNames[location.pathname] || "Home";

  const isActive = (path) =>
    location.pathname === path ? "bg-purple-600 text-white" : "text-gray-200 hover:bg-gray-800";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 0  text-white px-6 py-3 flex items-center justify-between ">
     
      <div className="flex items-center space-x-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="logo"
          className="h-8 w-8"
        />
        <span className="text-xl font-semibold tracking-wide">CampusConnect</span>
      </div>

     
      <div className="flex items-center space-x-6">

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-1 px-3 py-2 rounded-md transition"
          >
            <span className="text-sm font-medium">{currentPage}</span>
            <ChevronDown
              className={`w-4 h-4 transform transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-gray-900 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
              {Object.entries(routeNames).map(([path, name]) => (
                <Link
                  key={path}
                  to={path}
                  className={`block px-4 py-2 text-sm transition ${isActive(path)}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800/50 text-sm text-gray-200 pl-9 pr-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 w-48 sm:w-64 transition-all"
          />
        </div>

        <button className="relative p-2 hover:bg-gray-800/50 rounded-full transition">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute top-1.5 right-1.5 bg-red-500 rounded-full w-2 h-2" />
        </button>

        <button className="p-1 rounded-full hover:bg-gray-800/50 transition">
          <User className="w-6 h-6 text-white" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
