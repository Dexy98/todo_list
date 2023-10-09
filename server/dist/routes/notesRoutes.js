import express from "express";
import Notes from "../models/Notes.js";
import UsersModel from "../models/Users.js";
import authenticateUser from "../middleware/auth.js";
// const basePath = path.resolve();
const router = express.Router();
// invia nota al database
router.post("/", authenticateUser, async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Il titolo è obbligatorio" });
    }
    try {
        const user = await UsersModel.findById(req.query.userId);
        if (!user) {
            return res.status(404).json({ error: "Utente non trovato" });
        }
        const newNotes = new Notes({
            title,
            description: description || "Nessuna descrizione",
            createdBy: user._id,
        });
        const createNotes = await newNotes.save();
        res.json(createNotes);
    }
    catch (error) {
        res.status(500).json({ error: "Errore durante la creazione della nota" });
    }
});
//prendi tutte le notes
router.get("/", authenticateUser, async (req, res) => {
    const userId = req.query.userId;
    try {
        const user = await UsersModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "Utente non trovato" });
        }
        const notes = await Notes.find({ createdBy: user._id });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ error: "Errore durante il recupero delle note" });
    }
});
// Recupera una nota basata sull'ID
router.get("/:ID", async (req, res) => {
    const ID = req.params.ID;
    try {
        const note = await Notes.findById(ID);
        if (!note) {
            return res.status(404).json({ error: "Nota non trovata" });
        }
        res.json(note);
    }
    catch (error) {
        res.status(500).json({ error: "Errore durante il recupero della nota" });
    }
});
// Modifica una nota esistente
router.put("/:ID", async (req, res) => {
    const ID = req.params.ID;
    const { title, description } = req.body;
    try {
        const updatedNote = await Notes.findByIdAndUpdate(ID, {
            title,
            description: description || "Nessuna descrizione",
        }, { new: true });
        res.json(updatedNote);
    }
    catch (error) {
        res.status(500).json({ error: "Errore durante la modifica della nota" });
    }
});
//delete
router.delete("/:ID", async (req, res) => {
    //prendi id
    const ID = req.params.ID;
    const note = await Notes.findByIdAndDelete(ID);
    res.json(note);
});
// router.get("*", (req: express.Request, res: express.Response) => {
//   res.sendFile(path.join(basePath, "client", "dist", "index.html"));
// });
export default router;
//# sourceMappingURL=notesRoutes.js.map