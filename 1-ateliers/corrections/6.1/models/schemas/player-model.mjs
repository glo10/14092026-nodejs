import { Schema, model } from "mongoose";

const playerModel = Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  number: { type: Number, required: true, unique: true },
});
export default model("Player", playerModel);
