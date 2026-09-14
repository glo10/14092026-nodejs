import { createServer } from "node:http";

const PORT = 3100;
const headers = { "Content-Type": "application/json; charset=utf-8" };

createServer((req, res) => {
  const { url } = req; // idem que const url = req.url
  const msg = url === "/" ? { message: "success" } : { message: "not found" };
  const status = url === "/" ? 200 : 404;
  res.writeHead(status, headers);
  res.end(JSON.stringify(msg));
}).listen(PORT, () => {
  console.info(`Running on http://localhost:${PORT}`);
});
