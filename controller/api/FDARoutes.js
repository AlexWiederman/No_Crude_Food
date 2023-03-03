const fetch = require('node-fetch')
const express = require('express')
const router = express.Router()
const { UserManufacturer } = require('../../model')
const withAuth = require('../../utilities/auth')

let reqUrl
/* const resultsArray = [] */

router.get('/', withAuth, async (req, res) => {
  try {
  // Find user sessions id
    // console.warn(req.session.user_id)
    const manufacData = await UserManufacturer.findAll({
      where: {
        user_id: req.session.user_id
      }
    })
    const datas = manufacData.map((data) => data.get({ plain: true }))

    // replace spaces in string with "+" symbol

    
    // loop through all of the manufacturers of a user to get all of the api requests per manufacturer
    for (let i = 0; i < datas.length; i++) {
      const apiManufac = datas[i].manufacturer_name.split(' ').join('+')
      // console.warn(apiManufac)

      reqUrl = `https://api.fda.gov/food/enforcement.json?api_key=5khaeeOSSl7L3hc7vWcvW6IOKIkMgqRpss9Vfz4X&search=recalling_firm:"${apiManufac}"+AND+status.exact:Ongoing&limit=5`
      // urlArray = urlArray.push(reqUrl)
      /* urls[i] = { url: reqUrl } */
    }

    fetch(reqUrl)
      .then(res => res.json())
      .then(function (json) {
        const results = []
        results.push(...json.results)
        console.log(results)

        res.render('seeRecalls', {
          results,
          logged_in: req.session.logged_id
        })
      })
    /* res.render('seeRecalls') */
  } catch (err) {
    // Handle any errors that occur during fetch request
    res.status(500).json({ message: 'Error finding manufacturer relationships' })
  }
})

module.exports = router
