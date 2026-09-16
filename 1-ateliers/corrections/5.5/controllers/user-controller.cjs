const { formatUser } = require("../public/javascripts/functions.cjs");
async function fetchData(url = "https://api.github.com/users") {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    return console.error("Error", err);
  }
}

function findAll(_, res) {
  fetchData()
    .then((items) => {
      const title = "Utilisateurs GitHub";
      items = items.map((user) => formatUser(user));
      res.status(200).render("templates/list", { items, title });
    })
    .catch(() => {
      res
        .status(500)
        .render("error", {
          message: "Erreur lors de la récupération des utilisateurs",
        });
    });
}

function findOne(req, res) {
  fetchData(`https://api.github.com/users/${req.params.login}`)
    .then((user) => {
      const title = `Utilisateur ${user.name}`;
      user = formatUser(user);
      res.status(200).render("templates/single", { item: user, title, isSingle: true });
    })
    .catch(() => {
      res
        .status(500)
        .render("error", {
          message: `Erreur lors de la récupération de l'utilisateur`,
        });
    });
}

module.exports = {
  findAll,
  findOne,
};
