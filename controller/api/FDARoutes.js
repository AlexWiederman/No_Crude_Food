const fetch = require('node-fetch')
const express = require('express')
const router = express.Router()
const { UserManufacturer } = require('../../model')
const withAuth = require('../../utilities/auth')
require('dotenv').config()

let reqUrl

let results

router.get('/', withAuth, async (req, res) => {
  try {
    results = []
    // Find user sessions id
    // console.warn(req.session.user_id)

    const manufacData = await UserManufacturer.findAll({
      where: {
        user_id: req.session.user_id
      }
    })
    // console.log(manufacData)
    const datas = manufacData.map((data) => data.get({ plain: true }))

    // replace spaces in string with "+" symbol

    // loop through all of the manufacturers of a user to get all of the api requests per manufacturer
    for (let i = 0; i < datas.length; i++) {
      const apiManufac = datas[i].manufacturer_name.split(' ').join('+')

      reqUrl = `https://api.fda.gov/food/enforcement.json?api_key=${process.env.API_KEY}&search=recalling_firm:${apiManufac}+AND+status.exact:Ongoing&limit=10`

      const result = await fetch(reqUrl).then((res) => res.json())
      // console.log(result)
      // if (result.length === 0) {
      //  console.log("Failed")
      //   return
      // }
      results.push(...result.results)
    }
  } catch (err) {
    // Handle any errors that occur during fetch request
    res
      .status(500)
      .json({
        message:
          'No food recalls found for your manufacturer(s). Please go back to the page before.'
      })
  } finally {
    // console.log(results)
    res.render('seeRecalls', {
      results,
      logged_in: req.session.logged_id,
      found: results.length > 0
    })
  }
})

module.exports = router
