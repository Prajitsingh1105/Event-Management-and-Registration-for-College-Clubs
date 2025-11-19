import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { fetchAdminProfile } from "../api";

function Help() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchAdminProfile();
      if (!data.error) {
        setProfile(data);
      } else {
        console.error("Failed to load profile:", data.error);
      }
    };
    loadProfile();
  }, []);

  return (
    <div className="min-h-screen w-full relative">
      
      <div className="absolute inset-0 z-0 bg-[radial-gradient(125%_125%_at_50%_100%,_#000000_40%,_#350136_100%)]" />
      <Navbar />

      
      <div className="relative z-10 flex items-center justify-center">
        <div className="min-h-screen bg-black text-white py-20 px-8 md:px-20">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            We're Here to Help!
          </motion.h1>

          <p className="text-center text-gray-300 max-w-3xl mx-auto mb-5">
            Have queries or need help? We're here to support you in any way.
          </p>

          {profile ? (
            <>
              
              <div className="grid md:grid-cols-3 gap-10 mb-10">
                
                <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-xl shadow-lg">
                  <FiMapPin className="text-4xl text-yellow-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Office Location</h3>
                  <p className="text-gray-300">{profile.location}</p>
                </div>

                
                <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-xl shadow-lg">
                  <FiMail className="text-4xl text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Email Support</h3>
                  <p className="text-gray-300">
                    General: <br />
                    {profile.emails.general || "Not provided"}
                    <br />
                    Clubs: <br />
                    {profile.emails.clubs || "Not provided"}
                    <br />
                    Faculty: <br />
                    {profile.emails.teacher || "Not provided"}
                  </p>
                </div>

                
                <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-xl shadow-lg">
                  <FiPhone className="text-4xl text-green-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Phone Support</h3>
                  <p className="text-gray-300">
                    Helpdesk: <br />
                    {profile.phoneNumbers.helpdesk || "Not provided"}
                    <br />
                    Emergency: <br />
                    {profile.phoneNumbers.emergency || "Not provided"}
                  </p>
                </div>
              </div>

              
              <div className="bg-gray-900 p-10 rounded-xl shadow-lg mb-10">
                <h2 className="text-3xl font-bold text-center mb-4">Help Center</h2>
                <p className="text-gray-300 text-center mb-6">
                  Access documentation, FAQs, and more.
                </p>
                <div className="text-center">
                  <a
                    href={profile.helpCenterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-bold transition-all"
                  >
                    Visit Help Center
                  </a>
                </div>
              </div>

              
              <div className="text-center mb-5">
                <h2 className="text-3xl font-bold mb-4">Follow Us</h2>
                <div className="flex justify-center gap-8 text-3xl">
                  {profile.socialMedia.instagram && (
                    <a
                      href={profile.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600"
                    >
                      <FiInstagram />
                    </a>
                  )}
                  {profile.socialMedia.facebook && (
                    <a
                      href={profile.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FiFacebook />
                    </a>
                  )}
                  {profile.socialMedia.twitter && (
                    <a
                      href={profile.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-500"
                    >
                      <FiTwitter />
                    </a>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-400">Loading profile...</p>
          )}

         
          <div className="text-center text-gray-500 text-sm border-t border-gray-700 pt-6">
            © 2025 {profile?.collegeName || "Your College"}. All Rights Reserved.
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Help;
