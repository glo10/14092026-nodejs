import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { configDir as dir } from './folders.js';
export const options = {
  key: readFileSync(resolve(dir, "server-3.2.pem")),
  cert: readFileSync(resolve(dir, "server-3.2.crt")),
  agent: false,
  path: "/",
};