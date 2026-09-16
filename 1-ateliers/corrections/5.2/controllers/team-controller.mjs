import { filename } from "../utils.mjs/filename.mjs";
import { readFile, writeFile } from "node:fs/promises";
export const findAll = (_, res) => {
  readFile(filename)
    .then((content) => JSON.parse(content))
    .then(({ teams }) => {
      res.status(200).json(teams);
    })
    .catch(() =>
      res.status(500).json({ success: false, message: "Can't get teams" }),
    );
};

export const findOne = (req, res) => {
  const { id } = req.params;
  readFile(filename)
    .then((content) => JSON.parse(content))
    .then(({ teams }) => {
      const team = teams.find((t) => t.id === parseInt(id));
      if (team) {
        res.status(200).json(team);
      } else {
        res.status(404).json({ message: "Team not found", success: false });
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ success: false, message: `Can't get a team with ID ${id}` }),
    );
};

export const insertOne = async (req, res) => {
  const { team } = req;
  const data = await readFile(filename).then((content) => JSON.parse(content));
  team.id = data.teams.length + 1;
  data.teams.push(team);
  writeFile(filename, JSON.stringify(data))
    .then(() => {
      res.status(201).json({ message: "Team created", success: true, team });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "Contact-us please +33612345678", success: false });
    });
};
