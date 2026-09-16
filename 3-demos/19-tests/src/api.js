import express from "express";

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
