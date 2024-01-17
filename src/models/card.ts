import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // Corresponding to CardValue enum
  },
  color: {
    type: String,
    required: true,
    enum: ["spade", "heart", "diamond", "club"], // Corresponding to CardColor enum
  },
});

export const CardSchema = mongoose.model("Card", cardSchema);
