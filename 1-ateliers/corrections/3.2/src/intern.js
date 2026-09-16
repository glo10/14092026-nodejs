import fs from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = "3200";

const htmlPath = path.resolve(__dirname, "src", "views");
const cssPath = path.resolve(__dirname, "src", "css");
const imagesPath = path.resolve(__dirname, "src", "img");

const server = createServer((req, res) => {
  const { url } = req;

  if (url === "/css/style.css") {
    const filePath = path.join(cssPath, "style.css");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css; charset=utf-8");
    return fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        return res.end("Erreur interne du serveur");
      }
      res.end(data);
    });
  }

  if (url === "/img/images.jpg") {
    res.setHeader("Content-Type", "image/jpeg");
    return fs.readFile(path.join(imagesPath, "images.jpg"), (err, data) => {
      if (err) {
        res.statusCode = 404;
        return res.end("Image introuvable");
      }
      res.end(data);
    });
  }

  const defaultURL = url === "/" || url === "/index.html";

  const fileName = defaultURL ? "index.html" : "404.html";
  const filePath = path.join(htmlPath, fileName);

  res.statusCode = defaultURL ? 200 : 404;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.end("Erreur interne du serveur");
    }
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Dossier des vues : ${htmlPath}`);
  console.log(`Dossier CSS      : ${cssPath}`);
  console.log(`Dossier images      : ${imagesPath}`);
});
