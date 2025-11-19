import express from "express";
import Profile from "../mongoose/adminProfile.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

router.put("/", async (req, res) => {
  try {
    const {
      collegeName,
      location,
      emails,
      phoneNumbers,
      helpCenterLink,
      socialMedia,
    } = req.body;

    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile({
        collegeName,
        location,
        emails,
        phoneNumbers,
        helpCenterLink,
        socialMedia,
      });
    } else {
      profile.collegeName = collegeName;
      profile.location = location;
      profile.emails = emails;
      profile.phoneNumbers = phoneNumbers;
      profile.helpCenterLink = helpCenterLink;
      profile.socialMedia = socialMedia;
    }

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
