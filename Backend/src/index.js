import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "http";
import path from "path";



import loginRoute from "./routes/login.js";
import signupRoute from "./routes/signup.js";
import nameRoute from "./routes/name.js";
import adminLogin from "./routes/adminLogin.js";
import { initChat } from "./chat/server.js";
import upcomingEvents from "./routes/upcomingEvents.js";
import pastEvents from "./routes/pastEvents.js";
import clubs from "./routes/clubs.js";
import adminProfile from "./routes/adminProfile.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;



mongoose.connect(process.env.MONGOOSEID)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));




app.use(cors({
  origin: [/^http:\/\/localhost:/],
  credentials: true,
}));



app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join("uploads"))); 




app.use("/api/login", loginRoute);
app.use("/api/signup", signupRoute);
app.use("/api/me", nameRoute);
app.use("/api/admin",adminLogin);
app.use("/api/upcomingEvents",upcomingEvents);
app.use("/api/pastEvents", pastEvents);
app.use("/api/clubsAdmin",clubs);
app.use("/api/adminProfile",adminProfile);



const server = http.createServer(app);




initChat(server);




server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
