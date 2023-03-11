const router = require('express').Router()
const { Recall, User } = require('../../model')
const withAuth = require('../../utilities/auth')
const { format_date } = require('../../utilities/helper')

// Save a new recall
router.post('/', withAuth, async (req, res) => {
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
router.get('/', withAuth, async (req, res) => {
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

// Update the comment on a saved recall
router.put('/comment/:id', withAuth, async (req, res) => {
  try {
    // get the id for the recall
    const recallId = req.body.id
    // get the recall
    const recallData = await Recall.update(req.body, {
      where: {
        id: recallId
      }
    })
    // update the comment for the recall
    recallData.comment = req.body.comment
    // update date_edited
    recallData.date_edited = format_date(req.body.date_edited)
  } catch (err) {
    // catch and log any errors
    console.log('API failed: ' + err)
    alert('Comment cannot be saved.')
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
