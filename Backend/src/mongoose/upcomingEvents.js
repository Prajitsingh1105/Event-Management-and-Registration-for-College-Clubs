import mongoose from "mongoose";

const UpcomingEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  organisedBy: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String
  },
}, { timestamps: true });

export default mongoose.model("UpcomingEvent", UpcomingEventSchema);
