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
    studied: {
      type: Number,
    },
    taught: {
      type: Number
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema, "user");

export default User;
