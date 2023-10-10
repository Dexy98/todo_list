import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// rotte delle note
app.use("/notes", notesRoutes);
// rotte degli utenti
app.use("/users", usersRoutes);
//connessione al db
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log(`Connected to MongoDB at port ${PORT}`);
    app.listen(PORT);
});
//# sourceMappingURL=index.js.map