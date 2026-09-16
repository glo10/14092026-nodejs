const checkID = (req, res, next) => {
  const id = req.params.id;
  if (Number.isInteger(id)) {
    next();
  } else {
    res.render("error", { message: "L'id doit être un entier positif > 0" });
  }
}

const checkLogin = (req, res, next) => {
  if (/.+/.test(req.params.login)) next();
  else res.render("error", { message: "Message personnalisé" });
}

module.exports = {
  checkLogin
}