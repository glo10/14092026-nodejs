var express = require("express");
var router = express.Router();

/* GET product home page. */
router.get("/", function (req, res, next) {
  // Dans le modèle MVC ici c'est la partie V pour View ou Vue en fr
  res.render(
    "product/homepage", // le template qui sera views/product/homepage.ejs
    // les données qui seront injectées et interprêtées par le moteur pour générer dynamiquement le HTML en fonction des infos
    { title: "Express", items: [ 'produit 1', 'produit 2', 'produit 3'] },
  ); 
});

module.exports = router;
