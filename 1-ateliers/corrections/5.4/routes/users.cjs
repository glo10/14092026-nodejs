const express = require('express')
const router = express.Router()

const { sign } = require('../controllers/user-controller.cjs')
/**
 * Idéalement ici au lieu d'avoir une seule méthode sign()
 *  il faudrait avoir 2 méthodes différentes par ex signIn() et signUp()
 *  pour distinguer les 2 actions au niveau du controleur
 *  malgré le fait que le traitement est similaire
 */
router.post('/sign-up', sign)
router.post('/sign-in', sign)

module.exports = router
