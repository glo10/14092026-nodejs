import TeamRepository from "../models/repositories/team-repository.mjs";
import TeamModel from "../models/schemas/team-model.mjs";
import { connect } from "../models/connect.mjs";
await connect();
const repo = new TeamRepository(TeamModel);

export const findAll = async (_, res) => {
  repo
    .findAll()
    .then((teams) => {
      res.status(200).json(teams);
    })
    .catch(() => {
      res.status(500).json({ success: false, message: "Can't get teams" });
    });
};

export const findOne = (req, res) => {
  const { name } = req.params;
  if (/\d+/.test(name)) {
    res
      .status(400)
      .json({ message: `${name} must be a string`, success: false });
    return;
  }
  repo
    .findOne(name)
    .then((team) => {
      if (team && team._id) {
        res.status(200).json(team);
      } else {
        res
          .status(404)
          .json({ message: team.message ?? "Team not found", success: false });
      }
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: `Internal server error`,
      });
    });
};

export const save = async (req, res) => {
  let team = req.team;
  const data = await repo.save(team);
  if (data._id)
    res.status(201).json({ message: "Team created", success: true, team });
  else {
    res.status(500).json({
      message:
        "Failed to insert new team, try again or contact-us please +33612345678",
      success: false,
    });
  }
};
