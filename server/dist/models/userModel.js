"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import bcrypt from 'bcrypt';
let userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    subjects: {
        type: [],
    },
    //instead of studied and taught give achievements
    studied: {
        type: Number,
    },
    taught: {
        type: Number,
    },
    points: {
        type: Number,
    },
    theme: {
        type: String,
    },
    offersPosted: {
        type: [],
    },
}, { collection: "users" });
const User = mongoose_1.default.model("User", userSchema, "user");
exports.default = User;
//# sourceMappingURL=userModel.js.map