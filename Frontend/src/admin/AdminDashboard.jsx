import React, { useState,useRef } from "react";
import ProfileModal from "./AdminDashboardComponents/ProfileAdmin";
import UpcomingEventsSection from "./AdminDashboardComponents/UpcomingEventsAdmin";
import PastEventsSection from "./AdminDashboardComponents/PastEventsAdmin";
import ClubsSection from "./AdminDashboardComponents/ClubsAdmin";
import Footer from "../pages/Footer";

const AdminDashboard = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const upcomingRef = useRef(null);
  const pastRef = useRef(null);
  const clubsRef = useRef(null);
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      <nav className="sticky top-0 flex justify-between items-center bg-gray-800 p-4 shadow-md z-50">
        
        <div className="font-bold text-xl">Admin Dashboard</div>

        
        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollToSection(upcomingRef)}
            className="hover:text-purple-400 transition"
          >Upcoming</button>
          <button
            onClick={() => scrollToSection(pastRef)}
            className="hover:text-purple-400 transition"
          >Past</button>
          <button
            onClick={() => scrollToSection(clubsRef)}
            className="hover:text-purple-400 transition"
          >Clubs</button>

          
          <button
            onClick={() => setProfileOpen(true)}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            Profile
          </button>
        </div>
      </nav>

      
      <div className="p-8">
        <section ref={upcomingRef}>
        <UpcomingEventsSection />
      </section>

      <section ref={pastRef}>
        <PastEventsSection />
      </section>

      <section ref={clubsRef}>
        <ClubsSection />
      </section>
      </div>

      <Footer />

      
      {profileOpen && (
        <ProfileModal
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
