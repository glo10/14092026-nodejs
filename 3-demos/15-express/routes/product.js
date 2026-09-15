var express = require("express");
var router = express.Router();
const productCtrl = require('../controllers/product-controller')

/* GET product home page. */
router.get("/", productCtrl.renderProductList);
// match avec /product/1 par exemple
router.get("/:id", productCtrl.renderOneProduct)

module.exports = router;
