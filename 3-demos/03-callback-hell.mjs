/**
 * Exemple callback hell à ne pas faire
 * imbriquer des callbacks dans des callbacks
 */
import { createInterface } from "node:readline";

const app = createInterface(process.stdin, process.stdout);
try {
  app.question("Première question ?", function (answer) {
    console.log("answer", answer);
    app.question("Deuxième question ?", function (answer2) {
    console.log('answer2', answer2)
      app.question("Troisième question ?", function (answer3) {
        console.log('answer3', answer3)
      });
    });
  });
} catch (error) {
  console.error("erreur sur une des questions", error);
} finally {
  app.close();
}
