const express = require('express');
const router = express.Router();
const controller = require('../controllers/chatsController');

router.get('/', controller.listSessions);

router.post('/', controller.createSession);

router.get('/:id', controller.getSessionHistory);

router.post('/:id/messages', controller.postMessage);

module.exports = router;
