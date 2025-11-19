import React, { useState, useEffect } from "react";
import { addUpcomingEvent, fetchUpcomingEvents } from "../../api.js";

const UpcomingEventsSection = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    organisedBy: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); 

  
  useEffect(() => {
    const loadEvents = async () => {
      const fetched = await fetchUpcomingEvents();
      setEvents(fetched);
    };
    loadEvents();
  }, []);

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewEvent({ ...newEvent, image: e.target.files[0] });
  };

  
  const handleEditClick = (event) => {
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
      organisedBy: event.organisedBy,
      image: null, 
    });
    setEditingId(event._id);
  };

  const handleAddOrUpdateEvent = async () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.time || !newEvent.venue || !newEvent.organisedBy) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", newEvent.title);
      formData.append("description", newEvent.description);
      formData.append("date", newEvent.date);
      formData.append("time", newEvent.time);
      formData.append("venue", newEvent.venue);
      formData.append("organisedBy", newEvent.organisedBy);
      if (newEvent.image) formData.append("image", newEvent.image);

      let res;
      if (editingId) {
        res = await fetch(`http://localhost:3000/api/upcomingEvents/${editingId}`, {
          method: "PUT",
          body: formData,
          credentials: "include",
        });
        res = await res.json();

        setEvents(events.map((ev) => (ev._id === editingId ? res : ev)));
        setEditingId(null);
      } else {
        res = await addUpcomingEvent(newEvent);
        setEvents([...events, res]);
      }

      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        organisedBy: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add/update event");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/upcomingEvents/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white flex gap-8">
      
      <div className="w-1/2 bg-gray-800 p-6 rounded-xl overflow-y-auto max-h-[80vh]">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event._id} className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-300">{event.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {event.date} | {event.time} | {event.venue}
              </p>
              <p className="text-xs text-gray-400">Organised By: {event.organisedBy}</p>
              
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEditClick(event)}
                  className="bg-blue-500 px-3 py-1 rounded text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="bg-red-500 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <div className="w-1/2 bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">{editingId ? "Update Event" : "Add New Event"}</h2>
        <form className="grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
          <label>Event Title</label>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            className="p-3 rounded bg-gray-700 text-white"
          />

          <label>Short Description</label>
          <input
            type="text"
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            className="p-3 rounded bg-gray-700 text-white"
          />

          <div className="flex gap-4">
            <div className="w-1/2">
              <label>Date</label>
              <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} className="p-3 rounded bg-gray-700 text-white w-full" />
            </div>
            <div className="w-1/2">
              <label>Time</label>
              <input type="time" name="time" value={newEvent.time} onChange={handleInputChange} className="p-3 rounded bg-gray-700 text-white w-full" />
            </div>
          </div>

          <label>Venue</label>
          <input type="text" name="venue" value={newEvent.venue} onChange={handleInputChange} className="p-3 rounded bg-gray-700 text-white" />

          <label>Organised By</label>
          <input type="text" name="organisedBy" value={newEvent.organisedBy} onChange={handleInputChange} className="p-3 rounded bg-gray-700 text-white" />

          <label>Event Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="p-3 rounded bg-gray-700 text-white" />

          <button type="button" onClick={handleAddOrUpdateEvent} disabled={loading} className="bg-green-500 py-3 rounded font-bold hover:bg-green-600 mt-2">
            {loading ? "Processing..." : editingId ? "Update Event" : "Add Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpcomingEventsSection;
