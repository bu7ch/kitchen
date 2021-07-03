const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

userRouter.get("/", userController.index);
userRouter.get("/new", userController.new);
userRouter.post("/create", userController.create);
userRouter.get("/login", userController.login);
userRouter.post("/authenticate", userController.authenticate);
userRouter.get("/:id", userController.show);

module.exports = userRouter;
