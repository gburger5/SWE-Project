const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problem');
const IDEController = require('../controllers/IDE');

router.get('/problem', problemController.getPage);
router.get('/problems.json', problemController.getProblems)
router.get('/', IDEController.getEditor);

module.exports = router;