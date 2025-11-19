import express from "express";
import multer from "multer";
import Club from "../mongoose/clubs.js";



const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "backgroundImage", maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, detail, instagram, website } = req.body;

    const logo = req.files?.logo ? {
      data: req.files.logo[0].buffer,
      contentType: req.files.logo[0].mimetype
    } : null;

    const backgroundImage = req.files?.backgroundImage ? {
      data: req.files.backgroundImage[0].buffer,
      contentType: req.files.backgroundImage[0].mimetype
    } : null;

    const newClub = new Club({
      name,
      detail,
      logo,
      backgroundImage,
      socialLinks: { instagram, website },
    });

    await newClub.save();
    res.status(201).json(newClub);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create club" });
  }
});

router.get("/", async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
});

router.put("/:id", upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "backgroundImage", maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, detail, instagram, website } = req.body;
    const updateData = { name, detail, socialLinks: { instagram, website } };

    if (req.files?.logo) {
      updateData.logo = {
        data: req.files.logo[0].buffer,
        contentType: req.files.logo[0].mimetype
      };
    }

    if (req.files?.backgroundImage) {
      updateData.backgroundImage = {
        data: req.files.backgroundImage[0].buffer,
        contentType: req.files.backgroundImage[0].mimetype
      };
    }

    const updatedClub = await Club.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedClub);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update club" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Club.findByIdAndDelete(req.params.id);
    res.json({ message: "Club deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete club" });
  }
});

export default router;

router.get("/public", async (req, res) => {
  try {
    const clubs = await Club.find().select("-logo.data -backgroundImage.data");
    res.json({ success: true, clubs });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch public club data" });
  }
});


router.get("/:id/logo", async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club || !club.logo || !club.logo.data) {
      return res.status(404).send("Logo not found");
    }
    res.contentType(club.logo.contentType);
    res.send(club.logo.data);
  } catch (error) {
    console.error("Error fetching logo:", error);
    res.status(500).send("Failed to fetch logo");
  }
});

router.get("/:id/background", async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club || !club.backgroundImage || !club.backgroundImage.data) {
      return res.status(404).send("Background not found");
    }
    res.contentType(club.backgroundImage.contentType);
    res.send(club.backgroundImage.data);
  } catch (error) {
    console.error("Error fetching background:", error);
    res.status(500).send("Failed to fetch background image");
  }
});