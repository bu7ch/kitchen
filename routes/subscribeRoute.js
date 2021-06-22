const express = require('express');
const subscribeRouter = express.Router();
const subscribeController = require('../controller/subscribeController');

subscribeRouter.get('/', subscribeController.getAllSubcribers)
subscribeRouter.get('/new', subscribeController.newSubscriber)
subscribeRouter.post('/new', subscribeController.postSubscriber)


module.exports = subscribeRouter