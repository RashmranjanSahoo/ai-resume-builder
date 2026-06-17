const express=require("express");
const { registerUser, loginUser, getUserById, getUserResumes } = require("../controllers/userController");
const protect = require("../middlewares/auth");

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/data', protect, getUserById);
userRouter.get('/resume',protect,getUserResumes)

module.exports=userRouter;