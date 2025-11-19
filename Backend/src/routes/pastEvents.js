import express from "express";
import multer from "multer";
import PastEvent from "../mongoose/pastEvents.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.array("images", 50), async (req, res) => {
  try {
    const { title, description, date, venue, organisedBy } = req.body;
    const images = req.files?.map(file => ({
      data: file.buffer,
      contentType: file.mimetype,
    })) || [];

    const newEvent = new PastEvent({
      title,
      description,
      date,
      venue,
      organisedBy,
      images,
    });

    await newEvent.save();
    res.status(201).json({ success: true, data: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to create past event" });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await PastEvent.find().sort({ date: -1 });
    res.json({ success: true, data: events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch past events" });
  }
});

export default router;
