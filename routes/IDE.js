const express = require('express')
const router = express.Router()
const IDEController = require('../controllers/IDE')

router.get('/', IDEController.getEditor)

module.exports = router