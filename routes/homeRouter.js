const {Router} = require('express')
const router = Router()
const home =  require('../controllers/homeController')
const auth = require('../middleware/auth')

router.get('/',home.getHomePage)
module.exports = router