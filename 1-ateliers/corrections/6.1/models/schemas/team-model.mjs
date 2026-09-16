import { Schema, model } from "mongoose";

const teamModel = Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
});
export default model("Team", teamModel);
