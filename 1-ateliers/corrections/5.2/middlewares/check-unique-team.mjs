// TODO demander aux stagiaires de le faire
import { readFile } from 'node:fs/promises'
import { filename } from '../utils.mjs/filename.mjs';
export default async (req, res, next) => {
  const { teams } = await readFile(filename).then((content) => JSON.parse(content));
  const { team } = req
  const isExist = teams.find(t => t.name === team.name)
  if(!isExist){
    next()
  } else {
    res.status(400).json({ success: false, message: `${team.name} already exists` });
  }
}