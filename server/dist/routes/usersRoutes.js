import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import UsersModel from "../models/Users.js";
router.post("/register", async (req, res) => {
    const { userName, password } = req.body;
    try {
        // Verifica che l'utente non esista già
        const existingUser = await UsersModel.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ error: "Questo userName esiste già" });
        }
        // Hash della password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Crea un nuovo utente
        const newUser = new UsersModel({ userName, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "Utente registrato con successo" });
    }
    catch (error) {
        res.status(500).json({ error: "Errore durante la registrazione" });
    }
});
router.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    try {
        // Cerca l'utente nel database
        const user = await UsersModel.findOne({ userName });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Credenziali non valide" });
        }
        // // Genero un token JWT
        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        //   expiresIn: "1h", // Il token scadrà dopo 1 ora
        // });
        res.status(200).json({ message: "Login effettuato con successo", user });
    }
    catch (error) {
        res.status(500).json({ error: "Errore durante il login" });
    }
});
export default router;
//# sourceMappingURL=usersRoutes.js.map