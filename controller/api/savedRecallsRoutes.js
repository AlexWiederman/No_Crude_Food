const router = require('express').Router()
const { Recall, User } = require('../../model')

// Save a new recall
router.post('/', async (req, res) => {
  try {
    const newRecall = await Recall.create({
      ...req.body,
      user_id: req.session.user_id
    })

    res.status(200).json(newRecall)
  } catch (err) {
    res.status(400).json(err)
  }
})

// View a list of past recalls (route : /api/records)
router.get('/', async (req, res) => {
  try {
    const recallsData = await Recall.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['companyName']
        }
      ]
    })

    const recalls = recallsData.map((recall) => recall.get({ plain: true }))
    // console.log(posts)
    res.render('records', {
      recalls,
      // we are passing in logged_in status from session so that we can conditionally render the page with a login/logout button
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router

// Add a comment to a recall
// router.post('/:id/comments', async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//       ...req.body,
//       recall_id: req.params.id,
//       user_id: req.session.user_id
//     })

//     res.status(200).json(newComment)
//   } catch (err) {
//     res.status(400).json(err)
//   }
// })
