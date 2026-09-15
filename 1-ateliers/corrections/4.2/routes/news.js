const express = require('express')
const router = express.Router()

const { checkID, findOne, findAll } = require('../controllers/news')
// .param() méthode spécifique pour tester un paramètre
// Toutes les routes dans /news qui ont un paramètre nommé id seront interceptés et vérifiées
router.param('id', checkID)
router.get('/:id', findOne)
router.get('/', findAll)

module.exports = router