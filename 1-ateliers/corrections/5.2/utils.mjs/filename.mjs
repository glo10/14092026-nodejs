import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
export const filename = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "data",
  "teams.json",
);