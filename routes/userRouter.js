const {Router} = require('express')
const router = Router()
const userController = require('../controllers/userController')
const userExist = require('../middleware/userExist')
router.get('/:owner/:user_id/:test_id',userExist, userController.getTestPage)
router.post('/:user_id/:test_id',userController.recordTest)



module.exports = router