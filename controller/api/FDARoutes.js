const fetch = require('node-fetch')
const express = require("express");
const router = express.Router();

const { UserManufacturer } = require("../../model");

router.get("/", async (req, res) => {
  try {
  // Find user sessions id
  console.warn(req.session.user_id);
  // const manufacData = await UserManufacturer.findAll({
  //   where: {
  //     user_id: req.session.user_id
  //   }
  // })
  // const datas = manufacData.map((data) => data.get({ plain: true }))

  // replace spaces in string with "+" symbol

  // let response
  // loop through all of the manufacturers of a user to get all of the api requests per manufacturer
  // for (let i = 0; i < datas.length; i++) {
  //   const apiManufac = datas[i].manufacturer_name.split(' ').join('+')
  //   console.warn(apiManufac)

  // }

  // const options = {
  //   method:'GET'
  // }
  // const response = await fetch('https://catfact.ninja/fact')
  // https://api.fda.gov/food/enforcement.json?search=recalling_firm:"Pharmatech+LLC"+AND+status.exact:Ongoing&limit=5
  // `https://api.fda.gov/food/enforcement.json?search=recalling_firm:"${apiManufac}"+AND+status.exact:Ongoing&limit=5`


const response = await fetch('https://catfact.ninja/fact')
console.warn(response)
    res.status(200).json(response)
  } catch (err) {
    // Handle any errors that occur during fetch request
    res.status(500).json({ message: 'Error fetching FDA data' })
  }
});

module.exports = router;
