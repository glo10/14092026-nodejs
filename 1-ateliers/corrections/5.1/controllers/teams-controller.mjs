import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const filename = resolve(dirname(fileURLToPath(import.meta.url)), "..", "data", "teams.json");

export const findAll = (_, res) => {
  readFile(filename)
    .then((content) => JSON.parse(content))
    .then(({ teams } ) => {
      res.status(200).json(teams);
    })
    .catch(() => res.status(500).json({ success: false, message: "Can't get teams"}));
}

export const findOne = (req, res) => {
  const { id } = req.params;
  readFile(filename)
    .then((content) => JSON.parse(content))
    .then(({ teams } ) => {
      const team = teams.find((t) => t.id === parseInt(id));
      if (team) {
        res.status(200).json(team);
      } else {
        res.status(404).json({ message: "Team not found", success: false });
      }
    })
    .catch(() => res.status(500).json({ success: false, message: `Can't get a team with ID ${id}`}))
}

export const insertOne = async (req, res) => {
  // Attention ici niveau sécurité c'est 0, le client peut envoyer n'importe quoi et ça passera
  let team = ''
  req.on('data', (chunk) => {
    team += chunk
  })
  req.on('end', async() =>  {
    team = JSON.parse(team)
    const data = await readFile(filename).then(content => JSON.parse(content))
    team.id = data.teams.length + 1
    data.teams.push(team)
    writeFile(filename, JSON.stringify(data))
    .then(() => {
      res.status(201).json({ message: 'Team created', success: true, team});
    }).catch(() => {
      res.status(500).json({ message: 'Contact-us please 0612345678', success: false})
    })
  })
}