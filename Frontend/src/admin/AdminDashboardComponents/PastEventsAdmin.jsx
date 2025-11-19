import React, { useState, useEffect } from "react";
import { addPastEvent, fetchPastEvents } from "../../api.js";

const PastEventsSection = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    organisedBy: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [viewEvent, setViewEvent] = useState(null);

  useEffect(() => {
  const loadEvents = async () => {
    try {
      const fetched = await fetchPastEvents();
      console.log(fetched);

      if (fetched?.success && Array.isArray(fetched.data)) {
        setEvents(fetched.data);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Failed to fetch past events", error);
      setEvents([]);
    }
  };
  loadEvents();
}, []);


  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (e) => {
    setNewEvent({
      ...newEvent,
      images: Array.from(e.target.files).slice(0, 50),
    });
  };

  const handleAddEvent = async () => {
    const { title, description, date, venue, organisedBy } = newEvent;
    if (!title || !description || !date || !venue || !organisedBy) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const addedEvent = await addPastEvent(newEvent);
      setEvents((prev) => [...prev, addedEvent]);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        venue: "",
        organisedBy: "",
        images: [],
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  const getImageSrc = (img) => {
    if (!img?.data?.data) return null;
    return `data:${img.contentType};base64,${btoa(
      new Uint8Array(img.data.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    )}`;
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white flex gap-8">
      <div className="w-1/2 bg-gray-800 p-6 rounded-xl overflow-y-auto max-h-[80vh]">
        <h2 className="text-2xl font-bold mb-4">Past Events</h2>
        <div className="space-y-4">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-300">{event.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(event.date).toLocaleDateString()} | {event.venue}
                </p>
                <p className="text-xs text-gray-400">
                  Organised By: {event.organisedBy}
                </p>
                <button
                  onClick={() => setViewEvent(event)}
                  className="bg-blue-500 px-3 py-1 rounded text-sm mt-2"
                >
                  View Event
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No past events found.</p>
          )}
        </div>
      </div>

      

      <div className="w-1/2 bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Add Past Event</h2>
        <form className="grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
          {["title", "description", "date", "venue", "organisedBy"].map((field) => (
            <input
              key={field}
              type={field === "date" ? "date" : "text"}
              name={field}
              placeholder={`Enter ${field}`}
              value={newEvent[field]}
              onChange={handleInputChange}
              className="p-3 rounded bg-gray-700 text-white"
            />
          ))}

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagesChange}
            className="p-3 rounded bg-gray-700 text-white"
          />

          <button
            type="button"
            onClick={handleAddEvent}
            disabled={loading}
            className="bg-green-500 py-3 rounded font-bold hover:bg-green-600 mt-2"
          >
            {loading ? "Adding..." : "Add Event"}
          </button>
        </form>
      </div>

      {viewEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl max-w-lg w-full text-white overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">{viewEvent.title}</h2>
            <p className="mb-2">{viewEvent.description}</p>
            <p className="mb-2">
              {new Date(viewEvent.date).toLocaleDateString()} | {viewEvent.venue}
            </p>
            <p className="mb-4">Organised By: {viewEvent.organisedBy}</p>

            {viewEvent.images?.map((img, idx) => (
              <img
                key={`${viewEvent._id}-image-${idx}`}
                src={getImageSrc(img)}
                alt={`${viewEvent.title} image ${idx + 1}`}
                className="w-full h-64 object-cover rounded-lg my-2"
              />
            ))}

            <button
              onClick={() => setViewEvent(null)}
              className="bg-red-500 px-3 py-1 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastEventsSection;
