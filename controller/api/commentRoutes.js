const express = require('express');
const router = express.Router();
const { createComment, updateComment, deleteComment, getComments } = require('./commentController');

router.post('/', createComment);

router.put('/:commentId', updateComment);

router.delete('/:commentId', deleteComment);

router.get('/:recallId', getComments);


function createComment(req, res) {
    const { comment, time_date, recall_id, user_id } = req.body;
  
    const newComment = {
      comment: comment,
      time_date: time_date,
      recall_id: recall_id,
      user_id: user_id,
    };
  
    db.saveComment(newComment, (error, result) => {
      if (error) {
        res.status(500).json({
          error: 'Failed to save comment to database',
        });
      } else {
        res.status(201).json({
          message: 'Comment created successfully',
          comment: newComment,
        });
      }
    });
  }

  function updateComment(req, res) {
    const { comment, time_date } = req.body;
    const { commentId } = req.params;
  
    db.updateComment(commentId, { comment, time_date }, (error, result) => {
      if (error) {
        res.status(500).json({
          error: 'Failed to update comment in database',
        });
      } else if (result === 0) {
        res.status(404).json({
          error: `Comment with ID ${commentId} not found`,
        });
      } else {
        res.status(200).json({
          message: 'Comment updated successfully',
        });
      }
    });
  }

  function deleteComment(req, res) {

    const { commentId } = req.params;
  
    db.deleteComment(commentId, (error, result) => {
      if (error) {
        res.status(500).json({
          error: 'Failed to delete comment from database',
        });
      } else if (result === 0) {
        res.status(404).json({
          error: `Comment with ID ${commentId} not found`,
        });
      } else {
        res.status(200).json({
          message: 'Comment deleted successfully',
        });
      }
    });
  }

  function getComments(req, res) {
    const { recallId } = req.params;
  
    db.getCommentsForRecall(recallId, (error, comments) => {
      if (error) {
        res.status(500).json({
          error: 'Failed to retrieve comments from database',
        });
      } else {
        res.status(200).json({
          comments,
        });
      }
    });
  }
  
  module.exports = {createComment, updateComment, deleteComment, getComments}