import express from "express";
import checkTeam from "../middlewares/check-team.mjs";
import { findAll, findOne, save } from "../controllers/team-controller.mjs";
const teamsRouter = express.Router();

teamsRouter.get("/", findAll);
teamsRouter.get("/:name", findOne);
teamsRouter.post("/", checkTeam, save);
export default teamsRouter;
