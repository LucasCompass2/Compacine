const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/buy-ticket', sessionController.buyTicket);

module.exports = router;
