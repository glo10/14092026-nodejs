var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/** GET /users/list */
router.get('/list', (req, res, next) => {
  res.send('Routes /users/list')
})
module.exports = router;
