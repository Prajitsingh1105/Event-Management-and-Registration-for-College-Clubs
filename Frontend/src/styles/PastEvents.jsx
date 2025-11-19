import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiDownload, FiZoomIn } from "react-icons/fi";
import { fetchPastEvents } from "../api"; 


const PastEventsSection = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewImage, setViewImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch past events from backend
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetchPastEvents();
        const events = res.data || res; 
        const eventsWithImages = events.map((event) => ({
          ...event,
          images: event.images?.map((img) => {
            if (img.data) {
              const base64String = Buffer.from(img.data.data || img.data).toString("base64");
              return `data:${img.contentType};base64,${base64String}`;
            }
            return null;
          }),
        }));

        setPastEvents(eventsWithImages);
      } catch (err) {
        console.error("Error fetching past events:", err);
      }
    };
    loadEvents();
  }, []);useEffect(() => {
  const loadEvents = async () => {
    try {
      const res = await fetchPastEvents();
      const events = res.data?.data || res.data || res;

      const eventsWithImages = events.map((event) => ({
        ...event,
        images: event.images?.map((img) => {
          if (img.data) {
            try {
              const byteArray = new Uint8Array(img.data.data || img.data);
              const binaryString = byteArray.reduce(
                (acc, byte) => acc + String.fromCharCode(byte),
                ""
              );
              const base64String = btoa(binaryString);
              return `data:${img.contentType};base64,${base64String}`;
            } catch (err) {
              console.error("Error converting image:", err);
            }
          }
          return null;
        }),
      }));

      setPastEvents(eventsWithImages);
    } catch (err) {
      console.error("Error fetching past events:", err);
    }
  };
  loadEvents();
}, []);


  const categories = ["All", ...new Set(pastEvents.map((e) => e.category))];

  const filteredEvents = pastEvents.filter(
    (event) =>
      (selectedCategory === "All" || event.category === selectedCategory) &&
      (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <section
      id="past-events"
      className="h-screen snap-start flex items-center justify-between px-[150px] gap-10 relative z-10"
    >
      
      <motion.div
        className="flex flex-col justify-start gap-6 w-[50%]"
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="text-6xl font-bold bg-gradient-to-r from-orange-400 to-yellow-600 bg-clip-text text-transparent leading-snug">
          Past Events & Glimpses
        </h2>
        <p className="text-gray-300 text-xl leading-relaxed">
          Relive unforgettable moments from our past cultural, technical, and sports events.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <input
            type="text"
            placeholder="Search past events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      
      <motion.div
        className="w-[55%] max-h-[75vh] overflow-y-auto space-y-6 border-2 border-gray-700 px-5 py-5 rounded-xl scrollbar-hide"
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
              <h3 className="text-2xl font-semibold text-yellow-700 mb-1">{event.title}</h3>
              <p className="text-gray-700 mb-1">
                {new Date(event.date).toLocaleDateString()} | {event.venue}
              </p>
              <p className="text-gray-700 mb-1">Organised by: {event.organisedBy}</p>
              <button
                onClick={() => setSelectedEvent(event)}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition"
              >
                View Glimpses
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
              className="bg-white w-[90%] max-w-6xl rounded-2xl shadow-2xl overflow-hidden relative flex"
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

              
              <div className="w-1/2 p-6 overflow-y-auto custom-scrollbar border-r-2 border-gray-300">
                <h2 className="text-3xl font-bold mb-2 text-yellow-700">{selectedEvent.title}</h2>
                <p className="text-gray-700 mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(selectedEvent.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Venue:</strong> {selectedEvent.venue}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Organised by:</strong> {selectedEvent.organisedBy}
                </p>
                <h3 className="font-bold text-gray-800 mb-2">Description:</h3>
                <p className="text-black leading-relaxed max-h-[250px] overflow-y-auto custom-scrollbar border border-yellow-600 rounded-lg p-3">
                  {selectedEvent.description}
                </p>
              </div>

             
              <div className="w-1/2 p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar bg-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Event Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedEvent.images?.map((img, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden border-2 border-gray-300"
                    >
                      <img
                        src={img}
                        alt={`Glimpse ${index + 1}`}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => setViewImage(img)}
                      />
                      <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <a href={img} download className="bg-yellow-600 p-2 rounded-full text-white">
                          <FiDownload />
                        </a>
                        <button
                          onClick={() => setViewImage(img)}
                          className="bg-gray-800 p-2 rounded-full text-white"
                        >
                          <FiZoomIn />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {viewImage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <img src={viewImage} alt="Large view" className="max-h-[90vh] rounded-lg" />
              <button
                onClick={() => setViewImage(null)}
                className="absolute top-4 right-4 text-3xl text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
              >
                <FiX />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PastEventsSection;
