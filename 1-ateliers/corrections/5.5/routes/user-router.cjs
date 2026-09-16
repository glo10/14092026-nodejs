const express = require("express");
const router = express.Router();
const { findAll, findOne } = require("../controllers/user-controller.cjs");
const { checkLogin } = require("../middlewares/user-middleware.cjs");
router.param("login", checkLogin);
router.get("/", findAll);
router.get("/:login", findOne);

module.exports = router;
