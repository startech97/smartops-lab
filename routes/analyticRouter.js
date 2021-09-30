const {Router} = require('express')
const router = Router()
const analyticController = require('../controllers/analyticController')

router.get('/', analyticController.getDownloadPage)
router.post('/upload', analyticController.uploadFile)
router.get('/chart', analyticController.fetchDataChart)


module.exports = router