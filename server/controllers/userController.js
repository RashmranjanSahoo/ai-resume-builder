const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Resume = require("../models/resume");

const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable not set");
  }

  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
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

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // check whether user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // check password is correct
    if (!user.comparePassword(password)) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // return success message
    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// controller for getting user by _id
// get /api/users/data
const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    // return user
    user.password = undefined;

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// controller for getting user ResumeSchema
// get: api/users/ResumeSchema

const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    // return user Resumes

    const resumes = await Resume.find({ userId });
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  getUserResumes,
};
