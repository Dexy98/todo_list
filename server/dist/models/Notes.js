import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;
const Notes = new Schema({
    title: String,
    description: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});
const NotesModel = mongoose.model("Notes", Notes);
export default NotesModel;
//# sourceMappingURL=Notes.js.map