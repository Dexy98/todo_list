import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
//for deploy
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Usa le rotte delle note
app.use("/notes", notesRoutes);

// Usa le rotte degli utenti
app.use("/users", userRoutes);

//connessione al db
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Connected to MongoDB at port ${PORT}`);
  app.listen(PORT);
});
