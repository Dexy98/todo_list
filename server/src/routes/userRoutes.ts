import express from "express";
const router = express.Router();
import UsersModel from "../models/Users.js";

router.post("/register", async (req, res) => {
  // Gestisci la registrazione degli utenti qui
});

router.post("/login", async (req, res) => {
  // Gestisci il login degli utenti qui
});

export default router;
