import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { fetchUpcomingEvents } from "../api.js"; 

const UpcomingSection = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrganiser, setSelectedOrganiser] = useState("All");

 
  useEffect(() => {
    const loadEvents = async () => {
      const events = await fetchUpcomingEvents();
      setUpcomingEvents(events);
    };
    loadEvents();
  }, []);

  const organisers = ["All", ...new Set(upcomingEvents.map((e) => e.organiser))];

  const filteredEvents = upcomingEvents.filter(
    (event) =>
      (selectedOrganiser === "All" || event.organiser === selectedOrganiser) &&
      (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <section
      id="upcoming"
      className="h-screen snap-start flex items-center justify-between px-[150px] gap-10"
    >
      
      <motion.div
        className="flex flex-col justify-start gap-6 w-[50%]"
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent leading-snug">
          Upcoming Events
        </h2>
        <p className="text-gray-300 text-xl leading-relaxed">
          Discover exciting events, workshops, and college fests lined up just for you! Stay tuned and never miss out on what’s happening around campus.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={selectedOrganiser}
            onChange={(e) => setSelectedOrganiser(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {organisers.map((org, index) => (
              <option key={index} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      
      <motion.div
        className="w-[55%] max-h-[75vh] overflow-y-auto  space-y-6 border-2 border-gray-700 px-5 py-5 rounded-xl"
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <motion.div
              key={event._id}
              className="bg-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <h3 className="text-2xl font-semibold text-purple-800 mb-1">{event.title}</h3>
              <p className="text-gray-700 mb-1">{event.date} | {event.time}</p>
              <p className="text-gray-700 mb-1">Organised by: {event.organiser}</p>
              <button
                onClick={() => setSelectedEvent(event)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
              >
                View More
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No events found.</p>
        )}
      </motion.div>

      
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-[85%] max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
             
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-3xl font-bold text-black border-2 rounded-[50%] bg-white hover:text-gray-900"
              >
                <FiX />
              </button>

             
              {selectedEvent.image && (
                <img
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover"
                />
              )}

              
              <div className="p-6 max-h-[50vh] overflow-y-auto">
                <h2 className="text-3xl font-bold mb-2 text-purple-700">{selectedEvent.title}</h2>
                <p className="text-gray-700 mb-1"><strong>Date:</strong> {selectedEvent.date}</p>
                <p className="text-gray-700 mb-1"><strong>Time:</strong> {selectedEvent.time}</p>
                <p className="text-gray-700 mb-1"><strong>Venue:</strong> {selectedEvent.venue}</p>
                <p className="text-gray-700 mb-4"><strong>Organised by:</strong> {selectedEvent.organiser}</p>
                <h3 className="font-bold text-gray-700 mb-3">Description:</h3>
                <p className="max-h-56 overflow-y-auto custom-scrollbar p-4 text-black rounded-lg border-2 border-purple-700">
                  {selectedEvent.fullDescription || selectedEvent.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default UpcomingSection;
