import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { FiInstagram, FiGlobe } from "react-icons/fi";
import { fetchPublicClubs } from "../api"; 

const BASE_URL = "http://localhost:3000/api/clubsAdmin"; 

const ClubsPage = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const loadClubs = async () => {
      try {
        const response = await fetchPublicClubs();

        if (response.success) {
          const clubsData = response.clubs.map((club) => ({
            ...club,
            logoUrl: `${BASE_URL}/${club._id}/logo?${Date.now()}`, 
            backgroundUrl: `${BASE_URL}/${club._id}/background?${Date.now()}`,
          }));

          setClubs(clubsData);
        } else {
          console.error("Failed to fetch clubs:", response.error);
        }
      } catch (err) {
        console.error("Error fetching clubs:", err);
      }
    };

    loadClubs();
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-y-scroll snap-y snap-mandatory bg-black">
      {/* Section — Header */}
      <section className="h-screen w-full snap-start flex flex-col justify-center items-center text-center relative">
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 leading-snug"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Explore Campus Clubs
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Discover, join, and engage with clubs that match your passion — from
          tech to culture, sports, and more!
        </motion.p>
      </section>

      {/* Section — Clubs Grid */}
      <section className="h-screen w-full snap-start py-16 px-10 lg:px-24 text-white flex flex-col items-center relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">All Campus Clubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-h-[70vh] overflow-y-auto">
          {clubs.length > 0 ? (
            clubs.map((club) => (
              <motion.div
                key={club._id}
                className="border-2 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={club.backgroundUrl}
                  alt={club.name}
                  className="w-full h-32 object-cover"
                  onError={(e) => (e.target.src = "/default-bg.jpg")}
                />
                <div className="p-4 flex flex-col items-center text-center">
                  <img
                    src={club.logoUrl}
                    alt={`${club.name} logo`}
                    className="w-16 h-16 rounded-full -mt-8 border-2 border-purple-600 object-cover"
                    onError={(e) => (e.target.src = "/default-logo.jpg")}
                  />
                  <h3 className="text-xl font-bold mt-2">{club.name}</h3>
                  <p className="text-gray-300 text-sm mt-1 line-clamp-3">{club.detail}</p>
                  <div className="flex gap-4 mt-2">
                    {club.socialLinks?.instagram && (
                      <a
                        href={club.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-400 hover:text-pink-500 text-xl"
                      >
                        <FiInstagram />
                      </a>
                    )}
                    {club.socialLinks?.website && (
                      <a
                        href={club.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-500 text-xl"
                      >
                        <FiGlobe />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-300">No clubs found...</p>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <section className="h-screen w-full snap-start">
        <Footer />
      </section>
    </div>
  );
};

export default ClubsPage;
