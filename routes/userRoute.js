const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

userRouter.get("/", userController.index);
userRouter.get("/new", userController.new);
userRouter.post("/create", userController.create);

module.exports = userRouter;
