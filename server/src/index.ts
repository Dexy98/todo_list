import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Notes from "./models/Notes";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

//metodi crud
app.post("/notes", async (req: Request, res: Response) => {
  const newNotes = new Notes({
    title: req.body.title,
    description: req.body.description || "Nessuna descrizione",
  });
  if (req.body.title === "") return;
  const createNotes = await newNotes.save();
  res.json(createNotes);
});
//prendi tutte le notes
app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Notes.find();
  res.json(notes);
});
//delete
app.delete("/notes/:ID", async (req: Request, res: Response) => {
  //prendi id
  const ID = req.params.ID;
  const note = await Notes.findByIdAndDelete(ID);
  res.json(note);
});

//connessione al db
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Connected to MongoDB at port ${PORT}`);
  app.listen(PORT);
});
