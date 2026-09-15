import { ReadStream, readFile } from "fs";
import { readFile as readFilePromise } from "node:fs/promises";
import { homepage } from "../utils/folders.mjs";
const render = (res, content) => {
  res.setHeader("Content-Type", "text/html").send(content);
};

const renderError = (res, error) => {
  res.status(500).send(error.message);
};

export const renderHomePage = (_, res) => {
  res.setHeader("Content-Type", "text/html");
  // ReadStream pour les fichiers volumineux ou envoyer dès que possible du contenu au client
  const rs = new ReadStream(homepage);
  rs.pipe(res);
  rs.on("error", (error) => {
    renderError(res, error);
  });
};

export const renderSignUp = (_, res) => {
  // readFile pour les très petits fichiers
  readFile(homepage.replace("index", "sign-up"), (error, content) => {
    if (error) {
      renderError(res, error);
      return;
    }
    render(res, content);
  });
};

export const renderNews = (_, res) => {
  // readFile version promesse pour les très pétits fichiers et une gestion avec les promesses
  readFilePromise(homepage.replace("index", "news"))
    .then((html) => render(res, html))
    .catch((error) => renderError(res, error));
};
