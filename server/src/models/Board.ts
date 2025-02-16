import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  order: { type: Number, required: true },
  status: {
    type: String,
    enum: ["ToDo", "InProgress", "Done"],
    required: true,
    default: "ToDo",
  },
});

const columnSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: {
    type: String,
    enum: ["ToDo", "InProgress", "Done"],
    required: true,
  },
  cards: { type: [cardSchema], default: [] },
});

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    columns: {
      type: [columnSchema],
      default: () => [
        { id: "ToDo", name: "ToDo", cards: [] },
        { id: "InProgress", name: "InProgress", cards: [] },
        { id: "Done", name: "Done", cards: [] },
      ],
    },
  },
  { timestamps: true },
);

export const Board = mongoose.model("Board", boardSchema);
