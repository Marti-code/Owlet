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
<<<<<<< HEAD
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
=======
>>>>>>> 9ef0c7e2e09c58121fce851b29912515599d1dcd
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema, "user");

export default User;
