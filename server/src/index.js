"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var Notes_1 = require("./models/Notes");
//for deploy
var path_1 = require("path");
dotenv_1["default"].config();
var PORT = process.env.PORT || 5000;
var basePath = path_1["default"].resolve();
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
//metodi crud
// invia nota al database
app.post("/notes", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newNotes, createNotes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newNotes = new Notes_1["default"]({
                    title: req.body.title,
                    description: req.body.description || "Nessuna descrizione"
                });
                if (req.body.title === "")
                    return [2 /*return*/];
                return [4 /*yield*/, newNotes.save()];
            case 1:
                createNotes = _a.sent();
                res.json(createNotes);
                return [2 /*return*/];
        }
    });
}); });
//prendi tutte le notes
app.get("/notes", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var notes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Notes_1["default"].find()];
            case 1:
                notes = _a.sent();
                res.json(notes);
                return [2 /*return*/];
        }
    });
}); });
//delete
app["delete"]("/notes/:ID", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ID, note;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ID = req.params.ID;
                return [4 /*yield*/, Notes_1["default"].findByIdAndDelete(ID)];
            case 1:
                note = _a.sent();
                res.json(note);
                return [2 /*return*/];
        }
    });
}); });
app.use(express_1["default"].static(path_1["default"].join(basePath, "/client/dist")));
app.get("*", function (req, res) {
    res.sendFile(path_1["default"].join(basePath, "client", "dist", "index.html"));
});
//connessione al db
mongoose_1["default"].connect(process.env.MONGO_URL).then(function () {
    console.log("Connected to MongoDB at port ".concat(PORT));
    app.listen(PORT);
});
