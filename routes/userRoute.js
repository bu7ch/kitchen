const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

userRouter.get("/", userController.index);
userRouter.get("/new", userController.new);
userRouter.post("/create", userController.validate, userController.create);
userRouter.get("/login", userController.login);
userRouter.post("/login", userController.authenticate);
userRouter.post("/logout", userController.logout);
userRouter.get("/:id", userController.show);

module.exports = userRouter;
