const fetch = require('node-fetch')
const express = require('express')
const router = express.Router()

const { UserManufacturer } = require('../../model')

router.get('/', async (req, res) => {
  try {
  // Find user sessions id
    console.warn(req.session.user_id)
    const manufacData = await UserManufacturer.findAll({
      where: {
        user_id: req.session.user_id
      }
    })
    const datas = manufacData.map((data) => data.get({ plain: true }))

    res.render('seeRecalls', {
      datas
    })
  } catch (err) {
    // Handle any errors that occur during fetch request
    res.status(500).json({ message: 'Error fetching FDA data' })
  }
})

module.exports = router
