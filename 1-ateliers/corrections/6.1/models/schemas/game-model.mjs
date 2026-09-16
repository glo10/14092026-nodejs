import { Schema, model } from "mongoose";

const gameModel = Schema({
  home: { type: String, required: true },
  away: { type: String, required: true },
  score: { type: String, required: true },
  at: { type: Date, required: true },
});
export default model("Game", gameModel);
