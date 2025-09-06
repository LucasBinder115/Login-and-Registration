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
  origin: "http://0.0.0.0:1337", // frontend
  credentials: true,
}));

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Trying to connect to MongoDB with URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use(express.static(path.join(path.resolve(), "public")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/song", userJwtMiddleware, songRoutes);
app.use("/api/v1/playlist", userJwtMiddleware, playlistRoutes);
app.get("/api/v1/stream/:filename", streamSong);
app.get("/api/v1/songs", getSongs);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

//  Ouvir em 0.0.0.0 para aceitar conexões externas
const PORT = process.env.PORT || 5173;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at 0.0.0.0:${PORT}`);
});
