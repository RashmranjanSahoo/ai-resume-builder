const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

//controller for user registration
// post:/api/users/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checks if required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "missing required fields",
      });
    }

    // check whether user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    // create new user
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // return success message
    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//controller for user registration
// post:/api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check whether user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "invaild mail or password"
      });
    }

    // check password is correct
    if(!user.comparePassword(password)){
        return res.status(400).json({
        message: "invaild mail or password"
      }); 
    }

    // return success message
    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// controller for getting user by _id
// get /api/users/data
const getUserById = async (req, res) => {
  try {
    const userId= req.userId;

    // check if user exists
    const user = await User.findById(userId);
    if(!user){
       return res.status(404).json({
      message: "user not found",
    }); 
    }
    // return user
    user.password = undefined;

    return res.status(200).json({user});
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};




module.exports = {
  registerUser,
  loginUser,
  getUserById
};