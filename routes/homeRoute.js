const express = require('express');
const homeRouter = express.Router();
const homeController = require('../controller/homeController');

homeRouter.get('/name/:myName', homeController.respondWithMyName);

module.exports = homeRouter;