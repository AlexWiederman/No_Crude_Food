const express = require('express');
const router = express.Router();
const { saveRecall, addComment, getReports } = require('./SavedRecallsController');

router.post('/', saveRecall);

router.post('/:reportId/comment', addComment);

router.get('/', getReports);


function saveRecall(req, res) {
    const { reportTitle, reportDate, recallDetails } = req.body;
  
    const recall = new Recall({ reportTitle, reportDate, recallDetails });
    recall.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save recall report' });
      }
      return res.status(200).json({ message: 'Recall report saved successfully' });
    });
  }
  
  function addComment(req, res) {
    const comment = req.body.comment;
    const reportId = req.params.reportId;
  
    Recall.findByIdAndUpdate(
      reportId,
      { $push: { comments: comment } },
      (err, recall) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to add comment to recall report' });
        }
        if (!recall) {
          return res.status(404).json({ error: 'Recall report not found' });
        }
        return res.status(200).json({ message: 'Comment added successfully' });
      }
    );
  }
  
  
  function getReports(req, res) {
 
    Recall.find({}, (err, reports) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to retrieve recall reports' });
      }
      return res.status(200).json(reports);
    });
  }
  
  
  module.exports = { saveRecall, addComment, getReports };
  


