"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
// const ObjectId = mongoose.Types.ObjectId;
var Notes = new Schema({
    title: String,
    description: String
});
var NotesModel = mongoose_1["default"].model("Notes", Notes);
exports["default"] = NotesModel;
