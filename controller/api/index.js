const router = require('express').Router()

const FDARoutes = require('./FDARoutes.js')
const userRoutes = require('./userRoutes.js')
const saveRoutes = require('./savedRecallsRoutes')

router.use('/FDARoutes', FDARoutes)
router.use('/users', userRoutes)
router.use('/records', saveRoutes)

module.exports = router
