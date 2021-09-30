const {Router} = require('express')
const router = Router()
const adminController = require('../controllers/adminController')
const checkStart = require('../middleware/startAdmin')
router.get('/',checkStart, adminController.getAdminPage)
router.get('/:id', adminController.getEmployeesPage)
router.get('/start/:id', adminController.getStartPage)
router.post('/download',adminController.fetchDepartments)

module.exports = router