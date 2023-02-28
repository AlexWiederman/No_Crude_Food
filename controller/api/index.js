const router = require('express').Router()

const FDARoutes = require('./FDARoutes.js')
const userRoutes = require('./userRoutes.js')
// const saveRoutes = require('./savedRecallsRoutes.js')

router.use('/', FDARoutes)
router.use('/', userRoutes)
// router.use('/', saveRoutes)

module.exports = router
