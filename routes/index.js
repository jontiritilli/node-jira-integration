const express = require('express');
const Jira = require('../jiraApi')();
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jira Rest Home' });
})

router.get('/getAllBoards', (req, res, next) => {
  getAllBoards()
    .then(response => {
      res.send(JSON.stringify(response));
    })
    .catch(error => {
      next(error)
    })
})

router.get('/findIssue', (req, res, next) => {
  if(!req.query.issue) {
    res.send('Please provide an issue number');
  }
  findIssue(req.query.issue)
    .then(response => {
      res.send(JSON.stringify(response));
    })
    .catch(error => {
      next(error)
    })
})

const getAllBoards = async () => {
  console.info('getAllBoards', 'Starting retrieve')
  try {
    const boards = await Jira.getAllBoards();
    return boards;
  } catch (e) {
    return e;
  }
}

const findIssue = async issueNumber => {
  console.info('findIssue', 'Starting retrieve');
  try {
    const issue = await Jira.findIssue(issueNumber);
    return issue;
  } catch (e) {
    return e;
  }
}

module.exports = router;