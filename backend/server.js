import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

import authRoutes from "./routes/Auth_route.js";
import songRoutes from "./routes/songRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import { getSongs, streamSong } from "./controllers/songController.js";
import userJwtMiddleware from "./middlewares/auth.js";

dotenv.config();

const app = express();

// Configure CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Handle preflight OPTIONS requests
app.options("*", cors());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.static(path.join(path.resolve(), "public")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/song", userJwtMiddleware, songRoutes);
app.use("/api/v1/playlist", userJwtMiddleware, playlistRoutes);
app.get("/api/v1/stream/:filename", streamSong);
app.get("/api/v1/songs", getSongs);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.listen(1337, () => {
  console.log("Server is running at localhost:1337");
});