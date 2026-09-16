import express from "express";

/**
 * 1. Respecter le protocole HTTP méthode et code
 * CRUD : CREATE READ UPDATE DELETE
 * CREATE : créer de la ressource associée à la méthode HTTP POST et la réponse 201
 * READ : récupérer de la ressource avec GET et code 200 en cas succès
 * UPDATE : modifier la ressource PUT et code 200 en cas de succèes
 * DELETE : supprimer la ressource DELETE et code 200
 *
 * Les autres code HTTP :
 * 40x : erreur côté client (ressource inexante ou mal demandé ou absence ou restriction pour accéder)
 * 50x : erreur côté serveur
 * 30x : redirections (une ressource a été déplacé, l'url a changé)
 * 10x : infos
 *
 * 2. Avoir une documentation qui expose les ressources disponibles et comment les récupérer
 *  Les Urls et les méthodes à utiliser
 */

const app = express();
const PORT = 7000;
const docs = {
  version: "1.0.0",
  routes: [
    {
      route: "/users",
      link: `http://localhost:${PORT}/users`,
      method: "GET",
    },
    {
      route: "/users",
      link: `http://localhost:${PORT}/users`,
      method: "POST",
      body: 'JSON example { "firstname" : "D" }',
    },
    {
      route: "/users/:id",
      link: `http://localhost:${PORT}/users/:id`,
      method: "PUT",
      body: 'JSON example new data { "firstname" : "D" }',
    },
  ],
};

const users = [
  {
    firstname: "A",
  },
  {
    firstname: "B",
  },
  {
    firstname: "C",
  },
];

app.get('/login', (req, res) => {
    // vérification identifiants client
    // génération d'une session ou un token renvoyé au client
    // Pour toutes les requêtes vers l'API le client dans les headers
    // va envoyer le token
    // on peut mettre en place un middleware qui va intercepter la requête
    // et vérifier la validité du token ou la session
})

app.get("/", (_, res) => { // récupérer la ressource
  res.status(200).json(docs);
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.post("/users", (req, res) => { // créer la ressource
  console.log("req", req);
  const newUser = req.body; // la donnée { firstname: 'D' }
  users.push(newUser);
  console.log("users", users);
  res.status(201).json({ id: users.length + 1 });
});

app.put("/users/:id", (req, res) => { // modifier la ressource
  const newData = req.body;
});

export { app };
