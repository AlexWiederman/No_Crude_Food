const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const User = require('../model/User')
const UserManufacturer = require('../model/UserManufacturer')
const withAuth = require('../utilities/auth')

// basic home route
router.get('/', async (req, res) => {
  try {
    res.render('homepage', { logged_in: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err)
  }
})

// route to render login page
router.get('/login', async (req, res) => {
  try {
    res.render('login')
  } catch (err) {
    res.status(500).json(err)
  }
})

// route to profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    // we are finding the user by their session user id, and getting all posts associated with that user's account
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: UserManufacturer
      }
      ]
    })
    // data serialization to get only the userData we want to target
    const user = userData.get({ plain: true })
    console.log(user)
    // we are rendering the dashboard page and passing in all the values from the user array and the logged in status
    res.render('profile', {
      user,
      logged_in: true
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
