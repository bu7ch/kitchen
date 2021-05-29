const express = require('express');
const subscribeRouter = express.Router();
const subscribeController = require('../controller/subscribeController');

subscribeRouter.get('/', subscribeController.getAllSubcribers)

module.exports = subscribeRouter