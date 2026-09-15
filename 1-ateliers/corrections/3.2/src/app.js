import { createServer } from "node:http";
import { info } from "node:console";
import { pages as html } from "./utils/folders.js";
import { renderPromise } from "./utils/response.js";
const PORT = 3200;
createServer((req, res) => {
  const { url, method } = req;
  if (method === "GET" && url === "/") renderPromise(res, `${html}/index.html`);
  else renderPromise(res, `${html}/404.html`, 404);
}).listen(PORT, () => {
  info(`Listen on http://localhost:${PORT}`);
});
