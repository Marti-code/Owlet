import mongoose from "mongoose";

let offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    authorId: { type: mongoose.Schema.Types.String, ref: "User" },
  },
  { collection: "offers" }
);

const Offer = mongoose.model("Offer", offerSchema, "offers");

export default Offer;
