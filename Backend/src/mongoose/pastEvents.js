// src/mongoose/pastEvents.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

const pastEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  organisedBy: { type: String, required: true },
  images: [imageSchema],
});

const PastEvent = mongoose.model("PastEvent", pastEventSchema);

export default PastEvent;
