const router = require('express').Router()

const FDARoutes = require('./FDARoutes.js')
const userRoutes = require('./userRoutes.js')
// const saveRoutes = require('./savedRecallsRoutes.js')

router.use('/FDARoutes', FDARoutes)
router.use('/users', userRoutes)
// router.use('/', saveRoutes)

module.exports = router
