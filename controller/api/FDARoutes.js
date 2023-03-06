const fetch = require('node-fetch')
const express = require('express')
const router = express.Router()
const { Recall, UserManufacturer } = require('../../model')
const withAuth = require('../../utilities/auth')
require('dotenv').config()

let reqUrl
let status
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

      reqUrl = `https://api.fda.gov/food/enforcement.json?api_key=${process.env.API_KEY}&search=recalling_firm:"${apiManufac}"+AND+status.exact:Ongoing&limit=10`

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
        logged_in: req.session.logged_in,
        found: results.length > 0
      })
    }
  }
})

router.post('/comment', withAuth, async (req, res) => {
  /* posting a new data */
  try {
    const recalling_firm = req.body.recalling_firm
    const recall_number = req.body.recall_number
    const product_description = req.body.product_description
    const reason_for_recall = req.body.reason_for_recall
    const comment = req.body.comment

    const recall = await Recall.create({
      recalling_firm,
      recall_number,
      product_description,
      reason_for_recall,
      comment,
      user_id: req.session.user_id
    })

    res.status(200).json(recall)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
