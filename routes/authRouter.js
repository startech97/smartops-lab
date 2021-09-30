const {Router} = require('express')
const router = Router()
const authController = require('../controllers/authController')

router.get('/login', authController.getLoginPage)

router.get('/logout', authController.logout)

router.post('/login', authController.login)

module.exports = router