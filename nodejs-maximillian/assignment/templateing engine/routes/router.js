const express = require("express");
const { userHome, getUser, addUser } = require("../controller/user.controller");
const userRoute = express.Router();

userRoute.get("/", userHome);
userRoute.get("/user", getUser);
userRoute.post("/add-user", addUser);

module.exports =userRoute;