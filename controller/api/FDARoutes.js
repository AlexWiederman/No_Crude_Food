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
        console.log(json.results[0])

        /* res.status(200).json(json.results[0]) */
        const results = json.results[0]

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

/* router.get('/search', async (req, res) => {
  try {
<<<<<<< HEAD
    /* for (let i = 0; i < urls.length; i++) {
      console.warn(urls[i].url) */
      /* const dofetch = await fetch(reqUrl)
      console.warn(dofetch) */
      
      /* const json = res.json()
      console.log(json.results) */
      /* resultsArray.push(json) */
   /*  } */
   /*  console.log(resultsArray) 
    
  } catch (err) {
    res.status(500).json({ message: 'Error fetching FDA data' })
  }
}
)
 */
// const options = {
//   method:'GET'
// }
// const response = await fetch('https://catfact.ninja/fact')
// https://api.fda.gov/food/enforcement.json?search=recalling_firm:"Pharmatech+LLC"+AND+status.exact:Ongoing&limit=5
// `https://api.fda.gov/food/enforcement.json?search=recalling_firm:"${apiManufac}"+AND+status.exact:Ongoing&limit=5`

/* const response = await fetch('https://catfact.ninja/fact') */
/* console.warn(response)
res.status(200).json(response) */
=======
    const keys = Object.keys(urls); // <-- get the keys of the urls object
    for (const key of keys) { // <-- iterate over the keys using a for...of loop
      console.warn(urls[key].url)
      const dofetch = await fetch(urls[key].url)
      const json = await dofetch.json()
      console.log(json)
      resultsArray.push(json)
    }
    console.log(resultsArray)
    res.render('seeRecalls', {
      resultsArray
    })
  } catch (err) {
    res.status(500).json({ message: 'Error fetching FDA data' })
  }
});

>>>>>>> ed5789f5faac0c7c720cf74c523fdbee83c34747
module.exports = router
