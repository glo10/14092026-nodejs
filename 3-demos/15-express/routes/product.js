var express = require("express");
var router = express.Router();

/* GET product home page. */
router.get("/", function (req, res, next) {
  res.render(
    "product/homepage", // le template qui sera views/product/homepage.ejs
    // les données qui seront injecté et interprêté par le moteur pour générer dynamiquement le HTML en fonction des infos
    { title: "Express", items: [ 'produit 1', 'produit 2', 'produit 3'] },
  ); // la vue views
});

module.exports = router;
