const express = require('express');
const notebookController = require('../controllers/notebookController');
const router = express.Router();

router.get('/notebook', notebookController.getNotebook);
router.post('/notebook', notebookController.saveNote);

module.exports = router;