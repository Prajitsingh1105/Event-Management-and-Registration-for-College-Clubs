import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  detail: { type: String, required: true },
  logo: { 
    data: Buffer, 
    contentType: String 
  },
  backgroundImage: { 
    data: Buffer, 
    contentType: String 
  },
  socialLinks: {
    instagram: String,
    website: String,
  },
}, { timestamps: true });

const Club = mongoose.model("Club", clubSchema);

export default Club;
