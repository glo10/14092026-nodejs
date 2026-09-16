import {  fileURLToPath } from 'node:url'
import { resolve, dirname } from "node:path";

export function loadEnv() {
  const envFile = resolve(dirname(fileURLToPath(import.meta.url)), '..', '.env')
  process.loadEnvFile(envFile)
}