const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Atelier 4.2 : routes dynamiques' });
});

module.exports = router;
