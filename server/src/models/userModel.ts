import mongoose from "mongoose";
// import bcrypt from 'bcrypt';

let userSchema = new mongoose.Schema(
  {
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
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema, "user");

export default User;
