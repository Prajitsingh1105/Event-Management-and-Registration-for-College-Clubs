// UserHomePage.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCurrentUser } from "../api";
import { notify } from "../Toast";
import QuickAccessCards from "../styles/QuickCards";
import { motion } from "framer-motion";
import FadeIn from "../styles/FadeIn";
import Footer from "./Footer";
import Chat from "../chat-components/Chat";

function UserHomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (location.state?.toastMsg) {
      notify.success(location.state.toastMsg);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchCurrentUser();
      if (data.username) setUsername(data.username);
    };
    getUser();
  }, []);

  const upcomingEvents = [
    {
      title: "Coding Marathon",
      date: "25th Oct 2025",
      time: "10:00 AM - 4:00 PM",
      description: "A full-day coding competition for college students.",
    },
    {
      title: "Cultural Fest",
      date: "30th Oct 2025",
      time: "1:00 PM - 8:00 PM",
      description: "Celebrating art, music, and dance performances by students.",
    },
    {
      title: "Tech Talk: AI in 2025",
      date: "5th Nov 2025",
      time: "3:00 PM - 5:00 PM",
      description: "Expert talk on the latest trends in Artificial Intelligence.",
    },
    {
      title: "Coding Marathon",
      date: "25th Oct 2025",
      time: "10:00 AM - 4:00 PM",
      description: "A full-day coding competition for college students.",
    },
  ];

  const clubs = [
    { name: "Coding Club", description: "Sharpen your programming skills!" },
    { name: "Cultural Club", description: "Music, dance, art, and more." },
    { name: "Robotics Club", description: "Build and compete with robots." },
    { name: "Photography Club", description: "Capture moments, tell stories." },
    { name: "Gaming Club", description: "Play, compete, and stream games." },
    { name: "Literature Club", description: "Read, write, and discuss books." },
    { name: "Environmental Club", description: "Save the planet, act locally." },
    { name: "AI & ML Club", description: "Learn and build AI projects." },
  ];

  const highlights = [
    {
      title: "Hackathon Winners",
      description: "Celebrating our top coding champions of the semester.",
    },
    {
      title: "Cultural Night",
      description: "Showcasing talent with music, dance, and drama.",
    },
    {
      title: "Robotics Competition",
      description: "Teams built incredible robots for national contests.",
    },
    {
      title: "Photography Contest",
      description: "Capturing campus life in unique perspectives.",
    },
    {
      title: "AI Workshop",
      description: "Students learned hands-on AI and ML projects.",
    },
    {
      title: "Volunteering Drive",
      description: "Community service initiatives across the city.",
    },
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Background */}
      <div className="min-h-screen absolute inset-0 z-0 bg-black" />
      <Navbar />

      {/* Main scrollable content */}
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory relative z-10">
        {/* Welcome Section */}
        <div className="h-screen flex items-center justify-center snap-start w-full">
          <FadeIn>
            <div className="text-center text-white space-y-5 px-5">
              <h1 className="text-7xl justify-center flex gap-2 items-baseline font-bold">
                Welcome Back,{" "}
                <span className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-snug">
                  {username || "User"}!
                </span>
              </h1>
              <p className="text-3xl text-gray-600 max-w-3xl mx-auto">
                We're glad to see you again! Explore your dashboard, check your features,
                and stay updated with the latest on your projects and activities.
              </p>
              <QuickAccessCards />
            </div>
          </FadeIn>
        </div>

        {/* Upcoming Events Section */}
        <div className="h-screen flex items-center justify-center snap-start px-10 gap-10">
          <motion.div
            className="flex flex-col w-[600px] gap-3 h-[600px]"
            initial={{ x: -150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-snug">
              Upcoming Events
            </h2>
            <p className="text-3xl text-gray-400 leading-snug">
              Here are some of the upcoming events you can join. Stay updated and don’t miss
              out on any exciting college activities!
            </p>
          </motion.div>

          <motion.ul
            className="w-[600px] max-h-[600px] overflow-y-auto scrollbar-hide space-y-4 border-2 border-white px-5 py-5 rounded-lg flex-shrink-0"
            initial={{ x: 150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {upcomingEvents.map((event, index) => (
              <li
                key={index}
                className="bg-purple-200 p-4 rounded-lg"
              >
                <h3 className="text-xl text-black font-bold">{event.title}</h3>
                <p className="text-black text-sm">
                  {event.date} | {event.time}
                </p>
                <p className="mt-1 text-black text-sm">{event.description}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Clubs Section */}
        <div className="h-screen w-full snap-start flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center mb-10"
          >
            <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-snug mb-4">
              My Clubs / Explore Clubs
            </h2>
            <p className="text-3xl text-gray-400 max-w-2xl mx-auto">
              Discover clubs that match your interests. Join, explore, and be part of
              exciting activities happening around campus.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
            {clubs.map((club, index) => (
              <motion.div
                key={index}
                className="bg-gray-300 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-gray-600 cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <h3 className="text-2xl font-semibold mb-2">{club.name}</h3>
                <p className="text-gray-600">{club.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community Highlights */}
        <div className="h-screen w-full snap-start flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center mb-10"
          >
            <h2 className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-snug mb-4">Community Highlights</h2>
            <p className="text-3xl text-gray-500 max-w-2xl mx-auto">
              See what’s happening in our community. From competitions to workshops, stay
              inspired and connected with student activities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="bg-purple-200 rounded-xl p-6 cursor-pointer relative shadow-md transform transition duration-300 ease-out hover:scale-105 hover:shadow-[0_4px_15px_gray]"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <h3 className="text-2xl font-semibold mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default UserHomePage;
