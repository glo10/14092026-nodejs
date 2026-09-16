import express from "express";
import { getDocumentation } from "../controllers/index-controller.mjs";
const indexRouter = express.Router();
indexRouter.get("/", getDocumentation);
export default indexRouter;
