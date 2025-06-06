<<<<<<< Updated upstream
const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config(); // Correto: .config() é uma função e precisa ser chamada
const AuthRoute = require("./Routes/Auth_route"); // Certifique-se de que o caminho do arquivo está correto
require("./helpers/init_mongodb")
const app = express();
const cors = require("cors");


// Middleware
app.use(morgan("dev")); // Adicionei o middleware morgan para logs de requisições
app.use(express.json()); // Middleware para parsear JSON no body das requisições

// Rota de teste
app.get("/", async (req, res, next) => {
    res.send("Hello From Express");
});

// Rotas de autenticação
app.use("/auth", AuthRoute); // Corrigido: Use "/auth" em vez de "./auth"

// Rota 404 (para rotas não encontradas)
app.use(async (req, res, next) => {
    next(createError.NotFound());
});

// Tratamento de erros
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

app.use(cors({
    origin: "http://localhost:3001", // URL do frontend
    credentials: true, // Permite cookies e autenticação
  }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Correto: Use template literals (crase)
});
=======
// app.js
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

app.options("*", cors());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
}
app.use(express.static(path.join(path.resolve(), "public")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/song", userJwtMiddleware, songRoutes);
app.use("/api/v1/playlist", userJwtMiddleware, playlistRoutes);
app.get("/api/v1/stream/:filename", streamSong);
app.get("/api/v1/songs", getSongs);

app.get("*", (req, res) => {
  if (req.url.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.resolve("public/index.html"));
});

export default app;
>>>>>>> Stashed changes
