import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./mongoose/admin.js"; // corrected import
import path from "path";
import { fileURLToPath } from "url";

// Load .env manually from root folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const createAdmin = async () => {
  console.log("MONGOOSEID =", process.env.MONGOOSEID); // Debug

  try {
    await mongoose.connect(process.env.MONGOOSEID);
    console.log("Connected to MongoDB");

    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      await Admin.create({
        username: "admin",
        password: hashedPassword,
      });
      console.log("Admin seeded successfully");
    } else {
      console.log("Admin already exists");
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding admin:", err);
  }
};

createAdmin();
