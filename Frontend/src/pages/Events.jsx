import React from 'react'
import Navbar from './NavBar';
import FadeIn from "../styles/FadeIn";
import NextEventCounter from '../styles/NextEventTimer';
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { motion, useAnimation } from "framer-motion";
import Images from "../styles/ImagesSection";
import featured1 from "../assets/images/event5.jpeg"
import featured2 from "../assets/images/event6.jpg";
import featured3 from "../assets/images/event8.jpg"
import UpcomingSection from '../styles/UpcomingEvents';
import PastEventsSection from '../styles/PastEvents';
import Footer from "./Footer";

function Events() {

  const nextEventDate = "2025-10-25T10:00:00";
  const [tagline, setTagline] = useState("Discover Exciting College Events!");
  const taglines = [
    "Discover Exciting College Events!",
    "Join Coding Competitions & Hackathons!",
    "Explore Cultural & Tech Festivals!",
    "Connect with Your Community!"
  ];


  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % taglines.length;
      setTagline(taglines[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen w-full relative overflow-x-hidden snap-y snap-mandatory">
      
      <div className="absolute inset-0 z-0 bg-black" />
      <Navbar />


      
      <div className="h-screen w-full snap-start relative z-10 px-24 lg:px-36 ">
        <NextEventCounter eventDate={nextEventDate} />

        <div className="h-screen flex flex-col lg:flex-row items-center justify-between snap-start gap-12">
          
          <motion.div
            className="flex flex-col justify-center gap-6 w-full lg:max-w-2xl"
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 leading-snug">
              Welcome to Campus Events
            </h1>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Explore upcoming events, competitions, and social gatherings on your campus. Stay updated and never miss out!
            </p>

            <p className="text-yellow-400 font-semibold text-2xl md:text-3xl animate-pulse">
              {tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-4">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all duration-300">
                View Events
              </button>

              <div className="relative w-full sm:w-64 mt-2 sm:mt-0">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <FiSearch className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
          </motion.div>

          
          <div className="w-full lg:w-[55%] h-[600px] lg:h-screen flex items-center justify-center relative">
            <Images />
          </div>
        </div>
      </div>



      
      <div className="h-screen flex items-center justify-center  px-10 gap-10 snap-start">
        
        <div className="relative z-10 flex flex-col items-center w-full max-w-7xl space-y-10">

          
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center"
          >
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Featured Events
            </h2>
            <p className="text-gray-400 text-xl mt-4">
              Don’t miss out on our most exciting and exclusive campus events!
            </p>
          </motion.div>

          
          <motion.div
            className="flex gap-10 justify-center items-center w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            
            <motion.div className="bg-gray-200/10 border border-gray-600 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[350px] hover:scale-105 transition-all duration-300">
              <img src={featured1} alt="Featured Event" className="rounded-xl mb-4 w-full h-[200px] object-cover" />
              <h3 className="text-2xl font-bold text-white mb-2">Hackathon 2025</h3>
              <p className="text-gray-400 mb-4">Innovate, build, and compete with the best minds in tech.</p>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold">
                Know More
              </button>
            </motion.div>
            <motion.div className="bg-gray-200/10 border border-gray-600 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[350px] hover:scale-105 transition-all duration-300">
              <img src={featured2} alt="Featured Event" className="rounded-xl mb-4 w-full h-[200px] object-cover" />
              <h3 className="text-2xl font-bold text-white mb-2">Sports Fest 2025</h3>
              <p className="text-gray-400 mb-4">Compete. Conquer. Celebrate! Join inter-department tournaments.</p>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold">
                Know More
              </button>
            </motion.div>
            <motion.div className="bg-gray-200/10 border border-gray-600 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[350px] hover:scale-105 transition-all duration-300">
              <img src={featured3} alt="Featured Event" className="rounded-xl mb-4 w-full h-[200px] object-cover" />
              <h3 className="text-2xl font-bold text-white mb-2">Clutural Fest 2025</h3>
              <p className="text-gray-400 mb-4">Experience the rhythm, art, and spirit of our campus!</p>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold">
                Know More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>



      
      <div className="h-screen w-full relative z-10 px-24 lg:px-36 snap-start">
        <UpcomingSection />
      </div>


      
      <PastEventsSection />

      
      <Footer />




    </div >
  )
}

export default Events
