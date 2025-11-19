import express from "express";
import multer from "multer";
import UpcomingEvent from "../mongoose/upcomingEvents.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, time, venue, organisedBy } = req.body;
    
    const image = req.file
      ? { data: req.file.buffer, contentType: req.file.mimetype }
      : null;

    const newEvent = new UpcomingEvent({
      title,
      description,
      date,
      time,
      venue,
      organisedBy,
      image
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await UpcomingEvent.find().sort({ date: 1 });

    const formattedEvents = events.map((event) => {
      let imageSrc = null;

      if (event.image && event.image.data && event.image.contentType) {
        const buffer = Buffer.from(event.image.data); // convert MongoDB Binary to Buffer
        imageSrc = `data:${event.image.contentType};base64,${buffer.toString(
          "base64"
        )}`;
      }

      return {
        _id: event._id,
        title: event.title,
        description: event.description,
        fullDescription: event.description,
        date: event.date,
        time: event.time,
        venue: event.venue,
        organiser: event.organisedBy,
        image: imageSrc,
      };
    });

    res.json(formattedEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await UpcomingEvent.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, time, venue, organisedBy } = req.body;

    const updateData = { title, description, date, time, venue, organisedBy };

    if (req.file) {
      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedEvent = await UpcomingEvent.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update event" });
  }
});


export default router;


