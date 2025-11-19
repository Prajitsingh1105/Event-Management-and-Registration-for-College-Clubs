import express from "express";
import { User } from "../mongoose/user.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.js"

const router = express.Router();

router.get("/",authMiddleware, async (req, res) => {
  try {
    const token = req.cookies.token; // token from HttpOnly cookie
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("name");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ username: user.name });
    console.log(user.name);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
