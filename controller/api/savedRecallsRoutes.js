const router = require('express').Router()
const { Recall, Comment } = require('../../model')

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

// View a list of past recalls
router.get('/', async (req, res) => {
  try {
    const recallsData = await Recall.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'recall_id', 'created_at']
        }
      ]
    })

    res.status(200).json(recallsData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
