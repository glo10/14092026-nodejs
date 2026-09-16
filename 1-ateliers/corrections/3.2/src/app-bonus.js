import { createServer } from "node:https";
import { join } from "node:path";
import { render } from "./utils/response";
import { options } from "./utils/ssl";
import { pagesBonusDir as pages, cssDir, imgDir } from "./utils/folders";
const PORT = 3243
const app = createServer(options, (req, res) => {
  const imgRgx = /.+\.(jpg|jpeg|png)$/; // les fichiers avec l'extension .jpg, .jpeg, ou .png
  const { url } = req;
  let type = { "Content-Type": "text/html" };
  let filename = "";
  if (req.method.toLowerCase() != "get") {
    res.statusCode = 405;
    res.end("Request Not Allowed");
  }
  if (url.endsWith("index.html") || url === "/") {
    filename = join(pages, "index.html");
  } else if (url.endsWith(".css")) {
    filename = join(cssDir, url);
    type = { "Content-Type": "text/css" };
  } else if (imgRgx.test(url)) {
    // La méthode match() retourne un tableau avec tous les morceaux qui match avec l'expression régulière
    const matches = url.match(imgRgx);
    // Récupération de l'extension à l'index 1, index 0 on a l'url de l'image
    const ext = matches[1];
    filename = join(imgDir, url);
    type = { "Content-Type": `image/${ext}` };
  } else if (/favicon\.ico/.test(url)) {
  /**
   * Le navigateur lorsqu'on rend du HTML
   *  par défaut effectue une requête supplémentaire pour charger le favicon.ico
   *  qui se trouve à la racine du site Web
   */
    return;
  }
  render(filename, res, type);
});

app.listen(PORT, () => {
  console.info(`Running on https://localhost:${PORT}`)
})
