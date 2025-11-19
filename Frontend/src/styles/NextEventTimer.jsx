import React, { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";

function NextEventCounter({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const eventTime = new Date(eventDate);
      const diff = eventTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <div className="fixed top-16 right-6 bg-gradient-to-r from-orange-400 to-yellow-600 text-white px-5 py-3 rounded-xl shadow-xl z-50 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
      <FiClock className="text-2xl" />
      <div className="flex flex-col">
        <span className="font-bold text-lg">Next Event</span>
        <div className="flex gap-2 font-mono text-lg">
          <span>{timeLeft.days}d</span>:
          <span>{timeLeft.hours}h</span>:
          <span>{timeLeft.minutes}m</span>:
          <span>{timeLeft.seconds}s</span>
        </div>
      </div>
    </div>
  );
}

export default NextEventCounter;
