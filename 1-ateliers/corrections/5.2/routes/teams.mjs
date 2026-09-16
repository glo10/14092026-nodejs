import express from "express";
import checkParams from "../middlewares/check-params.mjs";
import checkTeam from "../middlewares/check-team.mjs";
import checkUniqueTeam from "../middlewares/check-unique-team.mjs";
import { findAll, findOne, insertOne } from "../controllers/team-controller.mjs";
// Création de la route
const teamsRouter = express.Router();

teamsRouter.param("id", checkParams);
teamsRouter.get("/", findAll);

teamsRouter.get("/:id", findOne);

/** checkTeams 1er middleware,  checkUniqueTeam 2eme middleware, fonction anonyme qui vient est aussi un middleware */
teamsRouter.post("/", checkTeam, checkUniqueTeam, insertOne);
export default teamsRouter;
