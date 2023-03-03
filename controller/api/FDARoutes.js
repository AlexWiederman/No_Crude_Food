const fetch = require('node-fetch')
const express = require('express')
const router = express.Router()
const { UserManufacturer } = require('../../model')
const withAuth = require('../../utilities/auth')
require('dotenv').config()

let reqUrl
let status
let results

function searchObject (root, pathArray) {
  let node = root
  for (const index in pathArray) {
    key = pathArray[index]
    if (key in node) {
      node = node[key]
    } else {
      node = null
      break
    }
  }
  return node
}

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

      reqUrl = `https://api.fda.gov/food/enforcement.json?api_key=${process.env.API_KEY}&search=recalling_firm:"${apiManufac}"+AND+status.exact:Ongoing&limit=2`

      const result = await fetch(reqUrl).then((res) => res.json())
      console.log(reqUrl)
      console.log(result)
      console.log(result.error)
      // console.log(searchObject(result.error, ["message"]))
      if (result.error == null) {
        results.push(...result.results)
      }
      
      
    }
    console.log(results)
  } catch (err) {
    // Handle any errors that occur during fetch request
    status = 500
    res.status(500).json({
      message:
        'No food recalls found for your manufacturer(s). Please go back to the page before.'
    })
  } finally {
    // console.log(results)
    console.log(status)
    if (status !== 500) {
      res.render('seeRecalls', {
        results,
        logged_in: req.session.logged_id,
        found: results.length > 0
      })
    }
  }
})

module.exports = router
