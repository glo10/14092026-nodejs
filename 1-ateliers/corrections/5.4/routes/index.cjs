const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Correction atelier 5.4' });
});

module.exports = router;
