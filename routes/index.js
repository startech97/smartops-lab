const {Router} = require('express')
const homeRouter = require('./homeRouter')
const authRouter = require('./authRouter')
const analyticRouter = require('./analyticRouter')
const adminRouter = require('./adminRouter')
const userRouter = require('./userRouter')
const router = Router()

router.use('/', homeRouter)
router.use('/auth', authRouter)
router.use('/analytic',analyticRouter)
router.use('/admin', adminRouter)
router.use('/user', userRouter)
module.exports = router