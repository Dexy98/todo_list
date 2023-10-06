import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const Notes = new Schema({
  title: String,
  description: String,
});

const NotesModel = mongoose.model("Notes", Notes);

export default NotesModel;
