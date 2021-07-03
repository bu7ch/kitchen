const express = require("express");
const homeRouter = express.Router();
const homeController = require("../controller/homeController");

homeRouter.get("/", homeController.welcome);
homeRouter.get("/courses", homeController.showCourses);
homeRouter.get("/contact", homeController.showSignUp);
homeRouter.get("/thanks", homeController.postedSignUpForm);

module.exports = homeRouter;
