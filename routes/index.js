const express = require('express');
const Jira = require('../jiraApi')();
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jira Rest Home' });
})

router.get('/getBoard', async (req, res, next) => {
  if(!req.query.id) {
    res.send('Please provide an board number');
  }
  try {
    board = await getBoard(req.query.id);
    res.render('board', { title: board.name, boards: JSON.stringify(board) })
  } catch (e) {
    next(e)
  }
})

router.get('/getAllBoards', async (req, res, next) => {
  try {
    const { values } = await getAllBoards()
    console.log(values)
    res.render('boards', { title: 'Board List', boards: JSON.stringify(values) })
  } catch (error) {
    next(error)
  }
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

const getBoard = async id => {
  console.info('getBoard', 'Starting retrieve')
  try {
    const board = await Jira.getBoard(id);
    console.info('getBoard', 'success', board)
    return board;
  } catch (e) {
    return e;
  }
}
const getAllBoards = async () => {
  console.info('getAllBoards', 'Starting retrieve')
  try {
    const boards = await Jira.getAllBoards();
    console.info('getAllBoards', 'success')
    return boards;
  } catch (e) {
    return e;
  }
}

const findIssue = async issueNumber => {
  console.info('findIssue', 'Starting retrieve');
  try {
    const issue = await Jira.findIssue(issueNumber);
    console.info('findIssue', 'success')
    return issue;
  } catch (e) {
    return e;
  }
}

module.exports = router;