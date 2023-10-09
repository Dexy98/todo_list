import express from "express";
import Notes from "../models/Notes.js";

import path from "path";
// const basePath = path.resolve();

const router = express.Router();

// invia nota al database
router.post("/", async (req: express.Request, res: express.Response) => {
  const newNotes = new Notes({
    title: req.body.title,
    description: req.body.description || "Nessuna descrizione",
  });
  if (req.body.title === "") return;
  const createNotes = await newNotes.save();
  res.json(createNotes);
});

//prendi tutte le notes
router.get("/", async (req: express.Request, res: express.Response) => {
  const notes = await Notes.find();
  res.json(notes);
});

// Recupera una nota basata sull'ID
router.get("/:ID", async (req: express.Request, res: express.Response) => {
  const ID = req.params.ID;

  try {
    const note = await Notes.findById(ID);

    if (!note) {
      return res.status(404).json({ error: "Nota non trovata" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Errore durante il recupero della nota" });
  }
});

// Modifica una nota esistente
router.put("/:ID", async (req: express.Request, res: express.Response) => {
  const ID = req.params.ID;
  const { title, description } = req.body;

  try {
    const updatedNote = await Notes.findByIdAndUpdate(
      ID,
      {
        title,
        description: description || "Nessuna descrizione",
      },
      { new: true }
    );

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Errore durante la modifica della nota" });
  }
});

//delete
router.delete("/:ID", async (req: express.Request, res: express.Response) => {
  //prendi id
  const ID = req.params.ID;
  const note = await Notes.findByIdAndDelete(ID);
  res.json(note);
});

// router.get("*", (req: express.Request, res: express.Response) => {
//   res.sendFile(path.join(basePath, "client", "dist", "index.html"));
// });

export default router;
