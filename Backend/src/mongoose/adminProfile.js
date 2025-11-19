import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  collegeName: { type: String, required: true },
  location: { type: String, },
  emails: {
    general: String,
    clubs: String,
    teacher: String,
  },
  phoneNumbers: {
    helpdesk: String,
    emergency: String,
  },
  helpCenterLink: String,
  socialMedia: {
    instagram: String,
    facebook: String,
    twitter: String,
  },
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
