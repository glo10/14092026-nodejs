import express from "express";
import { findAll, findOne, insertOne } from "../controllers/teams-controller.mjs";
// Création de la route
const teamsRouter = express.Router();
teamsRouter.get("/", findAll);

teamsRouter.get("/:id", findOne );

teamsRouter.post("/",  insertOne);
export default teamsRouter;
