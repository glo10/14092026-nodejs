const productRepository = require("../models/product");
function renderProductList(req, res, next) {
  // Dans le modèle MVC ici c'est la partie V pour View ou Vue en fr
  res.render(
    "product/homepage", // le template qui sera views/product/homepage.ejs
    productRepository.dataProductList,
  );
}

function renderOneProduct(req, res, next) {
    // Récupération paramètre dynamique
    const id = parseInt(req.params.id)
    const product = productRepository.dataProductList.items.find((item) => parseInt(item.id) === id)
    if(product) {
        res.render("product/single", { title: 'Page un seul produit', item : product})
    } else {
        throw new Error(`Produit introuvable ${id}`)
    }
}

module.exports = {
  renderProductList,
  renderOneProduct
};
